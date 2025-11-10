<?php

namespace App\Models;

use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penjualan extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function detail()
    {
        return $this->belongsTo(DetailRumah::class, 'detail_rumah_id');
    }
    public function tipe()
    {
        return $this->belongsTo(TipeRumah::class, 'tipe_rumah_id');
    }

    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }
}
