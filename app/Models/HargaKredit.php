<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HargaKredit extends Model
{
    use HasFactory;
    protected $fillable = [
        'rumah_id',
        'bank_kredit_id',
        'harga_bangunan',
        'uang_muka',
        'harga_cicilan',
        'jumlah_cicilan',
    ];

    public function bank()
    {
        return $this->belongsTo(BankKredit::class, 'bank_kredit_id');
    }
}
