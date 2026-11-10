<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class SitePagesTest extends TestCase
{
    #[DataProvider('pages')]
    public function test_every_public_page_renders(string $route, string $heading): void
    {
        $this->get(route($route))
            ->assertOk()
            ->assertSee($heading)
            ->assertSee('Lok Baintan Explorer')
            ->assertSee('Rencanakan Kunjungan');
    }

    public static function pages(): array
    {
        return [
            ['home', 'Jelajahi Pesona'],
            ['about', 'Mengenal Lok Baintan Lebih Dekat'],
            ['explore', 'Jelajahi Pengalaman Wisata Lok Baintan'],
            ['wetlands', 'Pesona Lahan Basah: Kehidupan yang Mengalir Bersama Sungai'],
            ['gallery', 'Galeri Pesona Lok Baintan'],
            ['guide', 'Panduan Berkunjung ke Lok Baintan'],
        ];
    }

    public function test_legacy_hash_url_is_replaced_by_named_laravel_routes(): void
    {
        $this->assertSame('/jelajah-wisata', route('explore', absolute: false));
        $this->assertSame('/panduan-berkunjung', route('guide', absolute: false));
    }
}
