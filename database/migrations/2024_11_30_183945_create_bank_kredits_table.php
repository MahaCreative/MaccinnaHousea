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
        Schema::create('bank_kredits', function (Blueprint $table) {
            $table->id();
            $table->string('kode_bank')->unique();
            $table->string('nama_bank');
            $table->string('logo_bank');
            $table->text('deskripsi');
            $table->text('persyaratan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_kredits');
    }
};
