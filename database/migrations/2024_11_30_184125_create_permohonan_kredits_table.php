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
            $table->foreignId('harga_kredit_id')->constrained('harga_kredits')->onDelete('cascade');
            $table->foreignId('pengunjung_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('petugas_id')->constrained('users')->onDelete('cascade');
            $table->string('kode_permohonan');
            $table->date('tanggal_permohonan');
            $table->string('no_hp_pemohon');
            $table->string('nama_petugas_melayani');
            $table->string('no_hp_petugas');
            $table->string('status_permohonan'); //menunggu konfirmasi, diterima, ditolak
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
