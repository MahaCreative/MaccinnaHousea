<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailRumah extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function rumah()
    {
        return $this->belongsTo(Rumah::class);
    }
}
