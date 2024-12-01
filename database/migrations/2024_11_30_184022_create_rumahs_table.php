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
        Schema::create('rumahs', function (Blueprint $table) {
            $table->id();
            $table->foreeignId('tipe_rumah_id')->constrained('tipe_rumahs');
            $table->string('kd_rumah')->unique();
            $table->string('blok_rumah');
            $table->string('status_bangunan'); //selesai, proses pembangunan, belum selesai
            $table->string('status_milik'); //terjual, di pesan, belum terjual
            $table->string('nama_pemilik');
            $table->string('geojson');
            $table->integer('jumlah_kamar');
            $table->integer('jumlah_kamar_mandi');
            $table->string('luas_lahan');
            $table->string('status_parkiran')->default('false');
            $table->string('status_dapur')->default('false');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rumahs');
    }
};
