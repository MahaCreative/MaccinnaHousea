<?php

namespace Database\Factories;

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

        return [
            'tipe_rumah_id' => '',
            'kd_rumah' => 'rm' . fake()->random_int(10, 399),
            'blok_rumah' => fake()->randomElement(['A', 'B', 'C', 'D', 'E']) . rand(1, 100),
            'status_bangunan' => fake()->randomElement(['selesai', 'proses pembangunan', 'belum selesai']),
            'status_milik' => $statusMilik = fake()->randomElement(['terjual', 'di pesan', 'belum terjual']),
            'nama_pemilik' => $statusMilik == 'belum terjual' ? '' : fake()->name(),
            'geojson' => 'afsdasfasdfasfsadfasdfasdfasdfasdfsdf',
            'jumlah_kamar' => rand(2, 4),
            'jumlah_kamar_mandi' => rand(2, 3),
            'luas_lahan' => rand(100, 500),
            'status_parkiran' => fake()->randomElement(['false', 'true']),
            'status_dapur' => fake()->randomElement(['false', 'true']),
        ];
    }
}
