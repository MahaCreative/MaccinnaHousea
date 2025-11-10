<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermohonanKredit extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function rumah()
    {
        return $this->belongsTo(Rumah::class);
    }

    public function pengunjung()
    {
        return $this->belongsTo(User::class);
    }
    public function petugas()
    {
        return $this->belongsTo(User::class);
    }
    public function berkas()
    {
        return $this->hasMany(BerkasPermohonan::class);
    }
}
