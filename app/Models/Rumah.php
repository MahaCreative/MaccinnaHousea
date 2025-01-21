<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rumah extends Model
{
    use HasFactory;
    protected $fillable = [
        "tipe_rumah_id",
        "kd_rumah",
        "nama_rumah",
        "harga_rumah",
        "blok_rumah",
        "status_bangunan",
        "status_milik",
        "nama_pemilik",
        "geojson",
        "jumlah_kamar",
        "jumlah_kamar_mandi",
        "luas_lahan",
        "status_parkiran",
        "status_dapur",
        "keterangan",
        "foto_rumah",
    ];

    public function tipe()
    {
        return $this->belongsTo(TipeRumah::class, 'tipe_rumah_id');
    }

    public function foto()
    {
        return $this->hasMany(FotoRumah::class);
    }

    public function harga_kredit()
    {
        return $this->hasMany(HargaKredit::class);
    }
}
