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
        Schema::create('permohonan_kredits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rumah_id')->constrained('rumahs')->onDelete('cascade');
            $table->foreignId('pengunjung_id')->nullable();
            $table->foreignId('petugas_id')->nullable();
            $table->string('kode_permohonan');
            $table->date('tanggal_permohonan');
            $table->string('nama_pemohon');
            $table->string('no_hp_pemohon');
            $table->string('nama_petugas_melayani')->nullable();
            $table->string('no_hp_petugas')->nullable();
            $table->string('status_permohonan')->default('baru');  // baru, follow up, cancell, closing
            $table->string('status_berkas')->nullable(); //menunggu konfirmasi, diterima, ditolak
            $table->date('tanggal_disetujui')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permohonan_kredits');
    }
};
