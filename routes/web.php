<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::controller(PageController::class)->group(function (): void {
    Route::get('/', 'home')->name('home');
    Route::get('/tim-pengembang', 'developers')->name('developers');
    Route::get('/tentang-lok-baintan', 'about')->name('about');
    Route::get('/jelajah-wisata', 'explore')->name('explore');
    Route::get('/pesona-lahan-basah', 'wetlands')->name('wetlands');
    Route::get('/pesona-lahan-basah/{slug}', 'wetlandDetail')->name('wetlands.detail');
    Route::get('/galeri', 'gallery')->name('gallery');
    Route::get('/panduan-berkunjung', 'guide')->name('guide');
});

Route::post('/komentar', [CommentController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('comments.store');
Route::delete('/komentar/{comment}', [CommentController::class, 'destroy'])
    ->middleware('throttle:30,1')
    ->name('comments.destroy');
Route::post('/moderator/komentar', [CommentController::class, 'moderate'])
    ->middleware('throttle:5,1')
    ->name('comments.moderate');
Route::delete('/moderator/komentar/sesi', [CommentController::class, 'endModeration'])
    ->name('comments.moderate.end');
