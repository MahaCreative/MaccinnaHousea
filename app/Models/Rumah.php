<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rumah extends Model
{
    use HasFactory;

    public function tipe()
    {
        return $this->belongsTo(TipeRumah::class);
    }
}
