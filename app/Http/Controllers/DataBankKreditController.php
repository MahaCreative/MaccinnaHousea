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

    public function api_create(Request $request)
    {
        $request->validate([
            'nama_bank' => "required|unique:bank_kredits,nama_bank"
        ]);
        $countBank = BankKredit::count();
        $kd = $countBank > 9 ? '0' : '00';
        $kdBank = $kd . $countBank + 1;

        $bank = BankKredit::create([
            'kode_bank' => $kdBank,
            "nama_bank" => $request->nama_bank,
            'logo_bank' => $request->logo_bank,
        ]);
    }

    public function api_delete(Request $request)
    {
        $bank = BankKredit::find($request->id);
        $bank->delete();
    }
}
