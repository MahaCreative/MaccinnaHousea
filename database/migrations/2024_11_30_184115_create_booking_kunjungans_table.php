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
        Schema::create('booking_kunjungans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('petugas_id')->nullable();
            $table->foreignId('pengunjung_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('rumah_id')->constrained('rumahs')->onDelete('cascade');
            $table->date('tanggal_kunjungan');
            $table->string('nama_pengunjung');
            $table->string('nomor_pengunjung');
            $table->tinyInteger('rating')->nullable();
            $table->string('status_booking')->default('menunggu konfirmasi'); //menunggu konfirmasi. diterima, selesai, ditolak
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_kunjungans');
    }
};
