<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankKredit extends Model
{
    use HasFactory;
    protected $fillable = ['kode_bank', 'nama_bank', 'logo_bank'];
}
