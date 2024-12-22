<?php

namespace Database\Seeders;

use App\Models\TipeRumah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipeRumahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipe_rumahs')->insert([
            [
                'nama_tipe' => '36'
            ],
            [
                'nama_tipe' => '48'
            ],
            [
                'nama_tipe' => '52'
            ]
        ]);
    }
}
