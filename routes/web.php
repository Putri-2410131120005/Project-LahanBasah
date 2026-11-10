<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::controller(PageController::class)->group(function (): void {
    Route::get('/', 'home')->name('home');
    Route::get('/tentang-lok-baintan', 'about')->name('about');
    Route::get('/jelajah-wisata', 'explore')->name('explore');
    Route::get('/pesona-lahan-basah', 'wetlands')->name('wetlands');
    Route::get('/galeri', 'gallery')->name('gallery');
    Route::get('/panduan-berkunjung', 'guide')->name('guide');
});
