<?php

namespace Tests\Feature;

use App\Models\Comment;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class VisitorCommentsTest extends TestCase
{
    public function test_comments_and_nested_replies_are_saved_and_rendered_safely(): void
    {
        $this->get(route('home'))->assertOk();

        $this->post(route('comments.store'), [
            'name' => 'Pengunjung Pertama',
            'body' => '<script>alert(1)</script>',
        ])->assertRedirect();

        $parent = Comment::query()->firstOrFail();

        $this->post(route('comments.store'), [
            'name' => 'Pengunjung Kedua',
            'body' => 'Terima kasih atas ceritanya.',
            'parent_id' => $parent->id,
        ])->assertRedirect();

        $this->assertSame($parent->id, Comment::query()->latest('id')->value('parent_id'));

        $this->get(route('home'))
            ->assertOk()
            ->assertSeeInOrder([
                'Pengunjung Pertama',
                '&lt;script&gt;alert(1)&lt;/script&gt;',
                'Pengunjung Kedua',
                'Terima kasih atas ceritanya.',
            ], false)
            ->assertDontSee('<script>alert(1)</script>', false);
    }

    public function test_photo_and_video_uploads_use_public_storage_and_enforce_type_limits(): void
    {
        Storage::fake('public');

        $this->post(route('comments.store'), [
            'name' => 'Fotografer',
            'body' => 'Foto pagi.',
            'media' => UploadedFile::fake()->image('pagi.jpg'),
        ])->assertRedirect();

        $photo = Comment::query()->firstOrFail();
        $this->assertSame('image/jpeg', $photo->media_mime);
        Storage::disk('public')->assertExists($photo->media_path);

        $videoPath = tempnam(sys_get_temp_dir(), 'lb-video-');
        file_put_contents($videoPath, pack('N', 24).'ftypisom'.pack('N', 0x200).'isomiso2mp41');
        $video = new UploadedFile($videoPath, 'pasar.mp4', 'video/mp4', UPLOAD_ERR_OK, true);

        $this->post(route('comments.store'), [
            'name' => 'Perekam',
            'body' => 'Video suasana.',
            'media' => $video,
        ])->assertRedirect();
        unlink($videoPath);

        $savedVideo = Comment::query()->latest('id')->firstOrFail();
        $this->assertSame('video/mp4', $savedVideo->media_mime);
        Storage::disk('public')->assertExists($savedVideo->media_path);

        $oversizedPhoto = UploadedFile::fake()->image('besar.jpg')->size(5 * 1024 + 1);
        $this->from(route('home'))->post(route('comments.store'), [
            'name' => 'Pengunjung',
            'body' => 'Foto terlalu besar.',
            'media' => $oversizedPhoto,
        ])->assertRedirect(route('home'))->assertSessionHasErrors('media');
    }

    public function test_only_comment_owner_or_authenticated_moderator_can_delete(): void
    {
        Storage::fake('public');
        $ownerKey = str_repeat('a', 64);
        $this->withSession(['comment_owner_key' => $ownerKey])
            ->post(route('comments.store'), [
                'name' => 'Nama tampilan',
                'body' => 'Komentar yang hanya bisa dihapus pemilik.',
                'media' => UploadedFile::fake()->image('komentar.jpg'),
            ])->assertRedirect();
        $comment = Comment::query()->firstOrFail();
        $mediaPath = $comment->media_path;
        Storage::disk('public')->assertExists($comment->media_path);

        $this->withSession(['comment_owner_key' => str_repeat('b', 64)])
            ->delete(route('comments.destroy', $comment))
            ->assertForbidden();

        $this->withSession(['comment_owner_key' => $ownerKey])
            ->delete(route('comments.destroy', $comment))
            ->assertRedirect();
        $this->assertSoftDeleted($comment);
        Storage::disk('public')->assertMissing($mediaPath);

        $another = Comment::query()->create([
            'author_name' => 'Pengunjung lain',
            'body' => 'Komentar moderator.',
            'owner_token_hash' => hash('sha256', str_repeat('c', 64)),
        ]);
        Config::set('comments.moderator_password_hash', Hash::make('moderator-secret'));

        $this->post(route('comments.moderate'), ['password' => 'moderator-secret'])
            ->assertRedirect();
        $this->delete(route('comments.destroy', $another))
            ->assertRedirect();
        $this->assertSoftDeleted($another);
    }

    public function test_comment_submission_is_rate_limited(): void
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->post(route('comments.store'), [
                'name' => 'Pengunjung',
                'body' => 'Komentar ke-'.$attempt,
            ])->assertRedirect();
        }

        $this->post(route('comments.store'), [
            'name' => 'Pengunjung',
            'body' => 'Komentar keenam.',
        ])->assertTooManyRequests();
    }

    public function test_honeypot_and_invalid_media_are_rejected(): void
    {
        $this->from(route('home'))->post(route('comments.store'), [
            'name' => 'Bot',
            'body' => 'Spam.',
            'website' => 'filled by bot',
        ])->assertRedirect(route('home'))->assertSessionHasErrors('website');

        $spoofedPath = tempnam(sys_get_temp_dir(), 'lb-spoof-');
        file_put_contents($spoofedPath, 'not an image');
        $spoofedPhoto = new UploadedFile($spoofedPath, 'palsu.jpg', 'image/jpeg', UPLOAD_ERR_OK, true);
        $this->from(route('home'))->post(route('comments.store'), [
            'name' => 'Pengunjung',
            'body' => 'File dengan ekstensi palsu.',
            'media' => $spoofedPhoto,
        ])->assertRedirect(route('home'))->assertSessionHasErrors('media');
        unlink($spoofedPath);

        $this->assertDatabaseCount('comments', 0);
    }
}
