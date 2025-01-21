<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BankKreditSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('bank_kredits')->insert(
            [
                [
                    'kode_bank' => '001',
                    'nama_bank' => 'BRI',
                    'logo_bank' => 'LogoBank/bri.png',
                ],
                [
                    'kode_bank' => '002',
                    'nama_bank' => 'BNI',
                    'logo_bank' => 'LogoBank/bni.png',
                ],
                [
                    'kode_bank' => '003',
                    'nama_bank' => 'BTN',
                    'logo_bank' => 'LogoBank/btn.png',
                ],
            ]
        );
    }
}
