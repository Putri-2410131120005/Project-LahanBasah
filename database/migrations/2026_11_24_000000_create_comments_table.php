<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('comments')->nullOnDelete();
            $table->string('author_name', 100);
            $table->text('body');
            $table->char('owner_token_hash', 64)->nullable()->index();
            $table->string('media_path')->nullable();
            $table->string('media_mime', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['parent_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
