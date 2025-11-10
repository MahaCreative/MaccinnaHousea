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
        Schema::create('detail_rumahs', function (Blueprint $table) {
            $table->id();
            $table->string('rumah_id')->foreignId('rumah_id');
            $table->string('blok_rumah');
            $table->string('nama_pemilik')->nullable();
            $table->string('tanggal_laku')->nullable();
            $table->string('status_pembangunan')->default('proses'); //selesai, proses
            $table->string('status_penjualan')->default('belum_terjual');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_rumahs');
    }
};
