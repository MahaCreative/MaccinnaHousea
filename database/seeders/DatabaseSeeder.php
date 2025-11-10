<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Rumah;
use App\Models\TipeRumah;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        User::create([
            'nama_lengkap' => 'Manager',
            'no_hp' => '+6285334703299',
            'avatar' => 'default_profile.jpg',
            'email' => 'manager@example.com',
            'password' => bcrypt('password'),
            'role' => 'super admin',
        ]);

        $this->call([
            TipeRumahSeeder::class,
            BankKreditSeeder::class,
        ]);
    }
}
