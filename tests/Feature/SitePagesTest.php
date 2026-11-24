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

    public function test_wetland_exploration_sections_render_carefully_framed_content(): void
    {
        $this->get(route('wetlands'))
            ->assertOk()
            ->assertSee('Flora dan fauna ekosistem lahan basah')
            ->assertSee('Wisata Bertanggung Jawab')
            ->assertSee('Langkah kecil yang berarti bagi sungai');
    }

    public function test_premium_planner_and_audio_controls_render(): void
    {
        $this->get(route('guide'))
            ->assertOk()
            ->assertSee('Simpan Rencana')
            ->assertSee('Bagikan WhatsApp')
            ->assertSee('Timeline kunjungan')
            ->assertSee('Lihat Detail Destinasi')
            ->assertSee('lb-music-button', false);
    }

    public function test_culture_and_responsible_visit_sections_render(): void
    {
        $this->get(route('about'))
            ->assertOk()
            ->assertSee('Tradisi yang bertahan melalui perubahan');

        $this->get(route('guide'))
            ->assertOk()
            ->assertSee('Keselamatan dan etika kunjungan');
    }

    public function test_developer_team_has_exactly_three_editable_placeholder_profiles(): void
    {
        $response = $this->get(route('developers'))
            ->assertOk()
            ->assertSee('Tim Pengembang Lok Baintan Explorer')
            ->assertSee('Nama anggota 1 (placeholder)')
            ->assertSee('Nama anggota 2 (placeholder)')
            ->assertSee('Nama anggota 3 (placeholder)');

        $this->assertSame(3, substr_count($response->getContent(), 'class="developer-card"'));
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
            ['developers', 'Tim Pengembang Lok Baintan Explorer'],
        ];
    }

    public function test_legacy_hash_url_is_replaced_by_named_laravel_routes(): void
    {
        $this->assertSame('/jelajah-wisata', route('explore', absolute: false));
        $this->assertSame('/panduan-berkunjung', route('guide', absolute: false));
    }
}
