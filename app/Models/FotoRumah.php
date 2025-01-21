<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FotoRumah extends Model
{
    use HasFactory;
    protected $fillable = [
        'rumah_id',
        'foto_rumah',
    ];
    public function rumah()
    {
        return $this->belongsTo(Rumah::class);
    }
}
