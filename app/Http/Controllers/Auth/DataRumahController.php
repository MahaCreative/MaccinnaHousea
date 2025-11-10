<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\DetailRumah;
use App\Models\FotoRumah;
use App\Models\HargaKredit;
use App\Models\Rumah;
use App\Models\TipeRumah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        if ($request->tipe) {
            $query->where('tipe_rumah_id', $request->tipe);
        }
        $dataRumah = $query->paginate($load);

        return inertia('Auth/DataRumah/Index', compact('dataRumah'));
    }

    public function create(Request $request)
    {
        $dataTipe = TipeRumah::get();
        return inertia('Auth/DataRumah/Create/Form', compact('dataTipe'));
    }

    public function store(Request $request)
    {

        $dataTipe = TipeRumah::all()->pluck(('id'));
        $countRumah = Rumah::count();
        $kode = $countRumah < 10 ? "0" : "00";
        $kd_rumah = $kode . $countRumah + 1;
        $request->validate([
            "tipe_rumah_id" => 'required',
            "nama_rumah" => 'string|min:3|max:50',
            "harga_rumah" => 'required|numeric',
            "jumlah_kamar" => 'required|numeric|min:1',
            "jumlah_kamar_mandi" => 'required|numeric',
            "luas_lahan" => 'required|numeric',
            "status_parkiran" => 'required',
            "status_dapur" => 'required',
            "keterangan" => 'nullable|string',
            "thumbnail" => 'required|image|mimes:jpg,png,jpeg',
            "blok" => 'required|string|max:1|unique:rumahs,blok',
            "foto_rumah.*" => 'required|image|mimes:jpg,png,jpeg|max:2048',
            "bank_kredit_id.*" => 'required|numeric',
            "harga_bangunan.*" => 'required|numeric',
            "uang_muka.*" => 'required|numeric',
            "harga_cicilan.*" => 'required|numeric',
            "jumlah_cicilan.*" => 'required|numeric',
        ]);

        DB::beginTransaction();
        try {
            $fotoThumbnail = $request->file('thumbnail')->store('foto_rumah');
            $rumah = Rumah::create([
                "tipe_rumah_id" => $request->tipe_rumah_id,
                "kd_rumah" => $kd_rumah,
                "nama_rumah" => $request->nama_rumah,
                "harga_rumah" => $request->harga_rumah,
                "jumlah_rumah" => $request->jumlah_rumah,
                "jumlah_kamar" => $request->jumlah_kamar,
                "jumlah_kamar_mandi" => $request->jumlah_kamar_mandi,
                "luas_lahan" => $request->luas_lahan,
                "blok" => $request->blok,
                "status_parkiran" => $request->status_parkiran,
                "status_dapur" => $request->status_dapur,
                "keterangan" => $request->keterangan,
                "foto_rumah" => $fotoThumbnail,
            ]);
            foreach ($request->foto_rumah as $foto) {
                $fotoRumah = $foto->store('foto_rumah');
                FotoRumah::create([
                    'rumah_id' => $rumah->id,
                    'foto_rumah' => $fotoRumah,
                ]);
            }
            for ($i = 0; $i < count($request->bank_kredit_id); $i++) {
                $hargaKredit = HargaKredit::create([
                    "rumah_id" => $rumah->id,
                    "bank_kredit_id" => $request->bank_kredit_id[$i],
                    "harga_bangunan" => $request->harga_bangunan[$i],
                    "uang_muka" => $request->uang_muka[$i],
                    "harga_cicilan" => $request->harga_cicilan[$i],
                    "jumlah_cicilan" => $request->jumlah_cicilan[$i],
                ]);
            }
            for ($i = 0; $i < $rumah->jumlah_rumah; $i++) {
                DetailRumah::create([
                    'rumah_id' => $rumah->id,
                    'blok_rumah' => $rumah->blok . '/' . $i + 1,
                ]);
            }
            DB::commit();
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function edit(Request $request, $id)
    {
        $rumah = Rumah::with(['tipe', 'foto', 'harga_kredit' => function ($q) {
            $q->with('bank');
        }])->findOrFail($id);

        return inertia('Auth/DataRumah/Edit/Form', compact('rumah'));
    }

    public function update(Request $request)
    {
        // dd($request->all());
        $rumah = Rumah::findOrFail($request->id);
        $thumbnail = $rumah->foto_rumah;
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail')->store($request->nama_rumah);
        }
        // ganti Foto Rumah ini masih salah logikanya
        // for ($i = 0; $i < count($request->foto_rumah); $i++) {
        //     if ($request->foto_rumah[$i]->file()) {
        //         dd('abg');
        //     }
        // }
        // update harga kredit;
        $cekHargaKredit = HargaKredit::where('rumah_id', $rumah->id)->get();
        foreach ($cekHargaKredit as $item) {
            $item->delete();
        }

        foreach ($request->bank_kredit_id   as $key => $item) {

            $hargaKredit = HargaKredit::create([
                'rumah_id' => $rumah->id,
                'bank_kredit_id' => $item,
                'harga_bangunan' => $request->harga_bangunan[$key],
                'uang_muka' => $request->uang_muka[$key],
                'harga_cicilan' => $request->harga_cicilan[$key],
                'jumlah_cicilan' => $request->jumlah_cicilan[$key],
            ]);
        }
        $rumah->update([
            "tipe_rumah_id" => $request->tipe_rumah_id,
            "nama_rumah" => $request->nama_rumah,
            "harga_rumah" => $request->harga_rumah,
            "jumlah_rumah" => $request->jumlah_rumah,
            "jumlah_kamar" => $request->jumlah_kamar,
            "jumlah_kamar_mandi" => $request->jumlah_kamar_mandi,
            "luas_lahan" => $request->luas_lahan,
            "status_parkiran" => $request->status_parkiran,
            "status_dapur" => $request->status_dapur,
            "keterangan" => $request->keterangan,
            "foto_rumah" => $thumbnail,
        ]);
        return redirect()->back();
    }

    public function delete(Request $request, $id)
    {
        $dataRumah = Rumah::findOrFail($request->id);
        $dataRumah->delete();
        return redirect()->back()->with('success', 'Data Rumah Berhasil Dihapus');
    }
    public function delete_harga_kredit(Request $request)
    {
        HargaKredit::findOrFail($request->id)->delete();
    }
}
