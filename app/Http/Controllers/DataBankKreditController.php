<?php

namespace App\Http\Controllers;

use App\Models\BankKredit;
use Illuminate\Http\Request;

class DataBankKreditController extends Controller
{
    public function api_data()
    {
        $data = BankKredit::all();
        return response()->json($data);
    }
}
