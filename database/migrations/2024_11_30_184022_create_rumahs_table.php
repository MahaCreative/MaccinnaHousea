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
            $table->foreignId('tipe_rumah_id')->constrained('tipe_rumahs')->onDelete('cascade');
            $table->string('kd_rumah')->unique();
            $table->string('nama_rumah');
            $table->string('harga_rumah');
            $table->integer('jumlah_kamar')->default(1);
            $table->integer('jumlah_kamar_mandi')->default(1);
            $table->string('luas_lahan');
            $table->string('blok');
            $table->integer('jumlah_rumah');
            $table->string('status_parkiran')->default('false');
            $table->string('status_dapur')->default('false');
            $table->longText('keterangan')->nullable();
            $table->string('foto_rumah');
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
