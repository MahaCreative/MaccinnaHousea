<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingKunjungan extends Model
{
    use HasFactory;
    // protected $guarded = [];
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
}
