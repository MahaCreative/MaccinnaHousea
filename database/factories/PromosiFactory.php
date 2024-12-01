<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Promosi>
 */
class PromosiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'title' => $title = fake(),
            'slug' => \Str::slug($title),
            'kontent' => fake()->paragraph(2),
            'gambar' => fake()->randomElement(['images.jpg', 'images2.jpeg', 'property-1.jpg', 'property-2.jpg', 'property-3.jpg', 'property-4.jpg', 'property-5.jpg', 'property-6.jpg']),
        ];
    }
}
