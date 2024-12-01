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
        Schema::create('berkas_permohonans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('permohonan_kredit_id')->constrained('permohonan_kredits');
            $table->string('ktp_suami');
            $table->string('ktp_istri');
            $table->string('kartu_keluarga');
            $table->string('rekening_koran')->nullable();
            $table->string('slip_gaji')->nullable();
            $table->string('status_berkas')->default('menunggu konfirmasi'); //menunggu konfirmasi, ditolak, diterima
            $table->string('catatan_berkas')->nullable();
            $table->date('tanggal_di_cek')->nullable();
            $table->string('nama_petugas_konfirmasi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berkas_permohonans');
    }
};
