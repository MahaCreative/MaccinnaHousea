<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Rumah;
use App\Models\TipeRumah;
use Illuminate\Http\Request;

class DataRumahController extends Controller
{
    public function index(Request $request)
    {
        $load = 10;
        if ($request->load) {
            if ($request->load == "all") {
                $load = Rumah::count();
            } else {
                $load = $request->load;
            }
        }
        $query = Rumah::query()->with('tipe');
        if ($request->cari) {
            $query->where('nama_rumah', 'like', '%' . $request->cari . '%');
        }
        $dataRumah = $query->paginate($load);

        return inertia('Auth/DataRumah/Index', compact('dataRumah'));
    }

    public function create(Request $request)
    {
        $dataTipe = TipeRumah::get();
        return inertia('Auth/DataRumah/Form', compact('dataTipe'));
    }

    public function store(Request $request)
    {

        $dataTipe = TipeRumah::all()->pluck(('id'));

        $request->validate([
            "tipe_rumah_id" => 'required|in:' . $dataTipe,
            "nama_rumah" => 'string|min:3|max:50',
            "harga_rumah" => 'required|numeric',
            "blok_rumah" => 'required|min:2|max:4',
            "status_bangunan" => 'required',
            "status_milik" => 'required',
            "nama_pemilik" => $request->status_milik !== 'belum terjual' ? 'required' : 'nullable',
            "jumlah_kamar" => 'required|numeric',
            "jumlah_kamar_mandi" => 'required|numeric',
            "luas_lahan" => 'required|numeric',
            "status_parkiran" => 'required',
            "status_dapur" => 'required',
            "keterangan" => 'nullable|string',
            "thumbnail" => 'required|image|mimes:jpg,png,jpeg',
            "foto_rumah.*" => 'required|image|mimes:jpg,png,jpeg|max:2048',

        ]);

        // $request->validate([
        //     "tipe_rumah_id" => $request->tipe_rumah_id,
        //     "tipe_rumah" => $request->tipe_rumah,
        //     "kd_rumah" => $request->kd_rumah,
        //     "nama_rumah" => $request->nama_rumah,
        //     "harga_rumah" => $request->harga_rumah,
        //     "blok_rumah" => $request->blok_rumah,
        //     "status_bangunan" => $request->status_bangunan,
        //     "status_milik" => $request->status_milik,
        //     "nama_pemilik" => $request->nama_pemilik,
        //     "jumlah_kamar" => $request->jumlah_kamar,
        //     "jumlah_kamar_mandi" => $request->jumlah_kamar_mandi,
        //     "luas_lahan" => $request->luas_lahan,
        //     "status_parkiran" => $request->status_parkiran,
        //     "status_dapur" => $request->status_dapur,
        //     "keterangan" => $request->keterangan,
        //     "thumbnail" => $request->thumbnail,
        //     "foto_rumah.*" => $request->foto_rumah,

        // ]);
    }
}
