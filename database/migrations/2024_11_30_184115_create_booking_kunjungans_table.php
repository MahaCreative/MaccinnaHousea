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
            $table->foreignId('petugas_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('pengunjung_id')->constrained('users')->onDelete('cascade');
            $table->date('tanggal_kunjungan');
            $table->string('status_booking')->default('menunggu konfirmasi'); //menunggu konfirmasi. diterima, ditolak
            $table->string('no_petugas');
            $table->string('no_pengunjung');
            $table->integer('rating')->default(0);
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
