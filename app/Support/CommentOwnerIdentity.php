<?php

namespace App\Support;

use Illuminate\Http\Request;

class CommentOwnerIdentity
{
    public static function hash(Request $request): string
    {
        $key = $request->session()->get('comment_owner_key');

        if (! is_string($key) || strlen($key) !== 64) {
            $key = bin2hex(random_bytes(32));
            $request->session()->put('comment_owner_key', $key);
        }

        return hash('sha256', $key);
    }
}
