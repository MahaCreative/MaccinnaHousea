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
            'jumlah_rumah' => rand(1, 50),

            'jumlah_kamar' => rand(2, 4),
            'jumlah_kamar_mandi' => rand(2, 3),
            'luas_lahan' => rand(100, 500),
            'status_parkiran' => fake()->randomElement(['false', 'true']),
            'status_dapur' => fake()->randomElement(['false', 'true']),
            'foto_rumah' => 'Image/property-1.jpg'
        ];
    }
}
