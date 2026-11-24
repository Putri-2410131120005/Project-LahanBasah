@if ($comment->trashed())
    @foreach ($comment->replies as $reply)
        @include('components.comments.thread', ['comment' => $reply, 'depth' => $depth])
    @endforeach
@else
    <article class="visitor-comment" id="komentar-{{ $comment->id }}" data-comment-depth="{{ $depth }}">
        <header class="visitor-comment-heading">
            <strong>{{ $comment->author_name }}</strong>
            <time
                datetime="{{ $comment->created_at->toAtomString() }}">{{ $comment->created_at->format('d M Y, H:i') }}</time>
        </header>
        <p class="visitor-comment-body">{{ $comment->body }}</p>
        @if ($comment->media_path && $comment->media_mime)
            @if (str_starts_with($comment->media_mime, 'image/'))
                <img class="visitor-comment-image"
                    src="{{ \Illuminate\Support\Facades\Storage::disk('public')->url($comment->media_path) }}"
                    alt="Foto yang diunggah bersama komentar" loading="lazy">
            @elseif (str_starts_with($comment->media_mime, 'video/'))
                <video class="visitor-comment-video" controls preload="metadata">
                    <source src="{{ \Illuminate\Support\Facades\Storage::disk('public')->url($comment->media_path) }}"
                        type="{{ $comment->media_mime }}">
                    Peramban tidak mendukung video ini.
                </video>
            @endif
        @endif
        <div class="visitor-comment-actions">
            @if ($depth < 5)
                <button class="comment-text-button" type="button" data-comment-reply
                    aria-controls="comment-reply-{{ $comment->id }}">Balas</button>
            @endif
            @if ($comment->can_delete)
                <form action="{{ route('comments.destroy', $comment) }}" method="POST" data-comment-delete>
                    @csrf
                    @method('DELETE')
                    <button class="comment-text-button danger" type="submit">Hapus</button>
                </form>
            @endif
        </div>
        @if ($depth < 5)
            <form class="comment-form comment-reply-form" id="comment-reply-{{ $comment->id }}"
                action="{{ route('comments.store') }}" method="POST" enctype="multipart/form-data" hidden>
                @csrf
                <input type="hidden" name="parent_id" value="{{ $comment->id }}">
                <label class="comment-honeypot" aria-hidden="true">Jangan isi kolom ini
                    <input type="text" name="website" tabindex="-1" autocomplete="off">
                </label>
                <label>Nama pengguna
                    <input type="text" name="name" maxlength="100" placeholder="Masukkan nama pengguna"
                        autocomplete="nickname" required
                        value="{{ (string) old('parent_id') === (string) $comment->id ? old('name') : '' }}">
                </label>
                <label>Balasan
                    <textarea name="body" rows="3" maxlength="5000" placeholder="Tulis balasanmu di sini..." required>{{ (string) old('parent_id') === (string) $comment->id ? old('body') : '' }}</textarea>
                </label>
                <div class="comment-form-actions">
                    <div class="comment-upload-control">
                        <button class="button planner-outline" type="button" data-comment-media>Unggah Media</button>
                        <input class="comment-file-input" type="file" name="media"
                            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" data-comment-file>
                        <span data-comment-file-name>Opsional · foto 5 MB, video 25 MB</span>
                    </div>
                    <div class="comment-submit-actions">
                        <button class="button planner-outline" type="button" data-comment-cancel>Batal</button>
                        <button class="button primary" type="submit">Kirim Balasan</button>
                    </div>
                </div>
            </form>
        @endif
        @if ($comment->replies->isNotEmpty())
            <div class="visitor-comment-replies">
                @foreach ($comment->replies as $reply)
                    @include('components.comments.thread', ['comment' => $reply, 'depth' => $depth + 1])
                @endforeach
            </div>
        @endif
    </article>
@endif
