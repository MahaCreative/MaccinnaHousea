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
        DB::table('bank_kredits')->insert([
            'kode_bank' => '001',
            'nama_bank' => 'BRI',
            'logo_bank' => '',
        ]);
    }
}
