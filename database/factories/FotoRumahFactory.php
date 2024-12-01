<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FotoRumah>
 */
class FotoRumahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [

            'foto_rumah' =>
            fake()->randomElement(['images.jpg', 'images2.jpeg', 'property-1.jpg', 'property-2.jpg', 'property-3.jpg', 'property-4.jpg', 'property-5.jpg', 'property-6.jpg']),
        ];
    }
}
