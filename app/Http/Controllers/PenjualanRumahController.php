<?php

namespace App\Http\Controllers;

use App\Models\DetailRumah;
use App\Models\Penjualan;
use Illuminate\Http\Request;

class PenjualanRumahController extends Controller
{
    public function index(Request $request)
    {
        $query = Penjualan::query()->with(['tipe', 'petugas', 'detail' => function ($q) {
            $q->with('rumah');
        }]);
        if ($request->user()->role == 'admin') {
            $query->where('petugas_id', $request->user()->id);
        }
        $penjualan = $query->latest()->get();

        return inertia('Auth/PenjualanRumah/Index', compact('penjualan'));
    }

    public function store(Request $request)
    {

        $request->validate([
            'tipe_rumah_id' => 'required',
            'rumah_id' => 'required',
            'detail_rumah_id' => 'required',
            'harga_kredit_id' => 'required',
            'uang_muka' => 'required',
            'tenor_bulan' => 'required',
            'cicilan_per_bulan' => 'required',
            "nik" => 'required|numeric|digits:16',
            "nama" => 'required|string|min:4',
            "no_hp" => 'required|numeric|digits:12',
        ]);
        $detail = DetailRumah::find($request->detail_rumah_id);
        $detail->update([
            'nama_pemilik' => $request->nama,
            'tanggal_laku' => now(),
            'status_penjualan' => 'terjual'
        ]);
        $penjualan = Penjualan::create([
            'detail_rumah_id' => $request->detail_rumah_id,
            'tipe_rumah_id' => $request->tipe_rumah_id,
            'nik' => $request->nik,
            'nama_pemilik' => $request->nama,
            'no_hp' => $request->no_hp,
            'uang_muka' => $request->uang_muka,
            'tenor_bulan' => (int) preg_replace('/\D/', '', $request->tenor_bulan),
            'cicilan_per_bulan' => $request->cicilan_per_bulan,
            'tanggal_transaksi' => now(),
            'petugas_id' => $request->user()->id,
        ]);
    }
}
