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
        Schema::create('detail_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pesan_id')->constrained('pesans')->onDelete('cascade');
            $table->foreignId('sender_id');
            $table->foreignId('receiver_id')->nullable();
            $table->text('message');
            $table->string('status_lihat')->default('belum dilihat'); //mengirim, dilihat
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_messages');
    }
};
