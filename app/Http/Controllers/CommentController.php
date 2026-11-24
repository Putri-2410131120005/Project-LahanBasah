<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Support\CommentOwnerIdentity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Throwable;

class CommentController extends Controller
{
    private const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

    private const MAX_VIDEO_BYTES = 25 * 1024 * 1024;

    public function store(Request $request): RedirectResponse
    {
        $postLimit = $this->iniBytes((string) ini_get('post_max_size'));
        $contentLength = (int) $request->server('CONTENT_LENGTH', 0);

        if ($postLimit > 0 && $contentLength > $postLimit && ! $request->hasFile('media')) {
            return back()->withInput()->withErrors([
                'media' => 'Ukuran kiriman melebihi batas post_max_size server. Kurangi ukuran media atau minta pengelola hosting menaikkan batas unggahan.',
            ]);
        }

        $upload = $request->file('media');
        if ($upload instanceof UploadedFile && ! $upload->isValid()) {
            $message = match ($upload->getError()) {
                UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'File melampaui batas upload_max_filesize atau batas ukuran formulir server. Video memerlukan kapasitas unggah minimal 25 MB.',
                UPLOAD_ERR_PARTIAL => 'Unggahan terputus sebelum selesai. Coba unggah kembali.',
                default => 'Server gagal menerima media. Periksa batas unggahan PHP dan konfigurasi hosting.',
            };

            return back()->withInput()->withErrors(['media' => $message]);
        }

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:100'],
            'body' => ['required', 'string', 'max:5000'],
            'parent_id' => ['nullable', 'integer', Rule::exists('comments', 'id')->whereNull('deleted_at')],
            'media' => ['nullable', 'file', 'mimetypes:image/jpeg,image/png,image/webp,video/mp4,video/webm'],
            'website' => ['nullable', 'string'],
        ], [
            'media.mimetypes' => 'Unggah foto JPEG, PNG, WebP atau video MP4, WebM yang valid.',
        ]);

        $validator->after(function ($validator) use ($request): void {
            if ($request->filled('website')) {
                $validator->errors()->add('website', 'Permintaan ditolak.');
            }

            $file = $request->file('media');
            if (! $file || ! $file->isValid()) {
                return;
            }

            $mime = $file->getMimeType();
            $limit = str_starts_with((string) $mime, 'image/')
                ? self::MAX_IMAGE_BYTES
                : (str_starts_with((string) $mime, 'video/') ? self::MAX_VIDEO_BYTES : null);

            if ($limit !== null && $file->getSize() > $limit) {
                $maxMb = $limit === self::MAX_IMAGE_BYTES ? 5 : 25;
                $validator->errors()->add('media', "Ukuran maksimum {$maxMb} MB untuk jenis media ini.");
            }
        });

        $validated = $validator->validate();

        if (isset($validated['parent_id'])) {
            $this->ensureReplyDepth((int) $validated['parent_id']);
        }

        $mediaPath = null;
        $mediaMime = null;

        if (isset($validated['media'])) {
            $mediaMime = $validated['media']->getMimeType();
            $mediaPath = $validated['media']->storePublicly('visitor-comments', 'public');

            if (! is_string($mediaPath)) {
                return back()->withInput()->withErrors([
                    'media' => 'Media tidak dapat disimpan. Periksa ruang penyimpanan dan konfigurasi disk public.',
                ]);
            }
        }

        try {
            DB::transaction(function () use ($validated, $request, $mediaPath, $mediaMime): void {
                Comment::create([
                    'parent_id' => $validated['parent_id'] ?? null,
                    'author_name' => trim($validated['name']),
                    'body' => trim($validated['body']),
                    'owner_token_hash' => CommentOwnerIdentity::hash($request),
                    'media_path' => $mediaPath,
                    'media_mime' => $mediaMime,
                ]);
            });
        } catch (Throwable $exception) {
            if ($mediaPath !== null) {
                Storage::disk('public')->delete($mediaPath);
            }

            throw $exception;
        }

        return back()->with('comment_status', 'Komentar berhasil dikirim.');
    }

    public function destroy(Request $request, Comment $comment): RedirectResponse
    {
        $isModerator = $request->session()->get('comments_moderator') === true;
        $ownerHash = CommentOwnerIdentity::hash($request);
        $isOwner = is_string($comment->owner_token_hash)
            && hash_equals($comment->owner_token_hash, $ownerHash);

        abort_unless($isModerator || $isOwner, 403);

        if ($comment->media_path !== null && ! Storage::disk('public')->delete($comment->media_path)) {
            return back()->withErrors([
                'comment' => 'Komentar belum dihapus karena file medianya gagal dihapus dari penyimpanan.',
            ]);
        }

        $comment->author_name = 'Komentar dihapus';
        $comment->body = 'Komentar ini telah dihapus.';
        $comment->owner_token_hash = null;
        $comment->media_path = null;
        $comment->media_mime = null;
        $comment->save();
        $comment->delete();

        return back()->with('comment_status', 'Komentar berhasil dihapus.');
    }

    public function moderate(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'password' => ['required', 'string', 'max:255'],
        ]);
        $passwordHash = config('comments.moderator_password_hash');

        if (! is_string($passwordHash) || $passwordHash === '') {
            throw ValidationException::withMessages([
                'password' => 'Akses moderator belum dikonfigurasi oleh pengelola situs.',
            ]);
        }

        if (! Hash::check($validated['password'], $passwordHash)) {
            throw ValidationException::withMessages([
                'password' => 'Kata sandi moderator tidak sesuai.',
            ]);
        }

        $request->session()->regenerate();
        $request->session()->put('comments_moderator', true);

        return back()->with('comment_status', 'Mode moderator aktif pada sesi ini.');
    }

    public function endModeration(Request $request): RedirectResponse
    {
        $request->session()->forget('comments_moderator');
        $request->session()->regenerateToken();

        return back()->with('comment_status', 'Sesi moderator telah diakhiri.');
    }

    private function ensureReplyDepth(int $parentId): void
    {
        $depth = 1;
        $parent = Comment::withTrashed()->findOrFail($parentId);

        while ($parent->parent_id !== null) {
            $depth++;
            abort_if($depth > 5, 422, 'Balasan dibatasi hingga lima tingkat.');
            $parent = Comment::withTrashed()->findOrFail($parent->parent_id);
        }

        abort_if($depth > 5, 422, 'Balasan dibatasi hingga lima tingkat.');
    }

    private function iniBytes(string $value): int
    {
        $value = trim($value);
        if ($value === '') {
            return 0;
        }

        $unit = strtolower(substr($value, -1));
        $size = (int) $value;

        return match ($unit) {
            'g' => $size * 1024 * 1024 * 1024,
            'm' => $size * 1024 * 1024,
            'k' => $size * 1024,
            default => $size,
        };
    }
}
