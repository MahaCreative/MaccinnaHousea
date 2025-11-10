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
        Schema::create('penjualans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('detail_rumah_id')->constrained('detail_rumahs')->onDelete('cascade');
            $table->foreignId('petugas_id')->constrained('users')->onDelete('cascade');
            $table->string('tipe_rumah_id');
            $table->string('nik');
            $table->string('nama_pemilik');
            $table->string('no_hp');
            $table->decimal('uang_muka', 15, 2);
            $table->integer('tenor_bulan');
            $table->decimal('cicilan_per_bulan', 15, 2);
            $table->date('tanggal_transaksi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penjualans');
    }
};
