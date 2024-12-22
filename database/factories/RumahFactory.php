<?php

namespace Database\Factories;

use App\Models\TipeRumah;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rumah>
 */
class RumahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tipe = TipeRumah::get()->pluck('id')->toArray();
        return [
            'tipe_rumah_id' => fake()->randomElement($tipe),
            'nama_rumah' => fake()->sentence(2),
            'harga_rumah' => rand(100000000, 900000000),
            'kd_rumah' => 'rm' . rand(10, 399),
            'blok_rumah' => fake()->randomElement(['A', 'B', 'C', 'D', 'E']) . '/' . rand(1, 100),
            'status_bangunan' => fake()->randomElement(['selesai', 'proses pembangunan', 'belum selesai']),
            'status_milik' => $statusMilik = fake()->randomElement(['terjual', 'di pesan', 'belum terjual']),
            'nama_pemilik' => $statusMilik == 'belum terjual' ? '' : fake()->name(),
            'geojson' => 'afsdasfasdfasfsadfasdfasdfasdfasdfsdf',
            'jumlah_kamar' => rand(2, 4),
            'jumlah_kamar_mandi' => rand(2, 3),
            'luas_lahan' => rand(100, 500),
            'status_parkiran' => fake()->randomElement(['false', 'true']),
            'status_dapur' => fake()->randomElement(['false', 'true']),
            'foto_rumah' => 'Image/property-1.jpg'
        ];
    }
}
