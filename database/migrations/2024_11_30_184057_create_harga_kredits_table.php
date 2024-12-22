<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('harga_kredits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rumah_id')->constrained('rumahs');
            $table->foreignId('bank_kredit_id')->constrained('bank_kredits');
            $table->integer('harga_bangunan');
            $table->integer('uang_muka');
            $table->integer('diskon');
            $table->integer('harga_cicilan');
            $table->integer('jumlah_cicilan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harga_kredits');
    }
};
