<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\DetailRumah;
use App\Models\Rumah;
use App\Models\TipeRumah;
use Illuminate\Http\Request;

class DetailRumahController extends Controller
{
    public function index(Request $request)
    {

        $count = [
            'terjual' => DetailRumah::where('status_penjualan', 'terjual')->count(),
            'belum_terjual' => DetailRumah::where('status_penjualan', 'belum_terjual')->count(),
            'selesai' => DetailRumah::where('status_pembangunan', 'selesai')->count(),
            'proses' => DetailRumah::where('status_pembangunan', 'proses')->count(),
        ];
        $query = DetailRumah::query()->join('rumahs', 'rumahs.id', 'detail_rumahs.rumah_id')
            ->join('tipe_rumahs', 'tipe_rumahs.id', '=', 'rumahs.tipe_rumah_id')
            ->select('detail_rumahs.*', 'rumahs.nama_rumah', 'rumahs.harga_rumah', 'tipe_rumahs.nama_tipe as tipe');

        if ($request->tipe) {
            $query->where('tipe_rumahs.nama_tipe', '=', $request->tipe);
        }
        if ($request->penjualan) {
            $query->where('status_penjualan', '=', $request->penjualan);
        }
        if ($request->pembangunan) {
            $query->where('status_pembangunan', '=', $request->pembangunan);
        }
        if ($request->pembangunan) {
            $query->where('status_pembangunan', '=', $request->pembangunan);
        }
        if ($request->cari) {
            $query->where('blok_rumah', 'like', '%' . $request->cari . '%')
                ->orWhere('rumahs.nama_rumah', 'like', '%' . $request->cari . '%');
        }

        $detail = $query->latest()->get();
        $tipe = TipeRumah::latest()->get();
        return inertia('Auth/DetailRumah/Index', compact('count', 'detail', 'tipe'));
    }
    public function laporan(Request $request)
    {


        $query = DetailRumah::query()->join('rumahs', 'rumahs.id', 'detail_rumahs.rumah_id')
            ->join('tipe_rumahs', 'tipe_rumahs.id', '=', 'rumahs.tipe_rumah_id')
            ->select('detail_rumahs.*', 'rumahs.nama_rumah', 'rumahs.harga_rumah', 'tipe_rumahs.nama_tipe as tipe');

        if ($request->tipe) {
            $query->where('tipe_rumahs.nama_tipe', '=', $request->tipe);
        }
        if ($request->penjualan) {
            $query->where('status_penjualan', '=', $request->penjualan);
        }
        if ($request->pembangunan) {
            $query->where('status_pembangunan', '=', $request->pembangunan);
        }
        if ($request->pembangunan) {
            $query->where('status_pembangunan', '=', $request->pembangunan);
        }
        if ($request->cari) {
            $query->where('blok_rumah', 'like', '%' . $request->cari . '%')
                ->orWhere('rumahs.nama_rumah', 'like', '%' . $request->cari . '%');
        }

        $detail = $query->latest()->get();

        return inertia('Auth/DetailRumah/Print', compact('detail'));
    }

    public function form_report(Request $request)
    {
        $tipe = TipeRumah::latest()->get();
        $rumah = Rumah::latest()->get();
        return inertia('Auth/DetailRumah/FormReport', compact('rumah', 'tipe'));
    }

    public function update(Request $request)
    {
        $detailRumah = DetailRumah::find($request->id);
        $detailRumah->update(['status_pembangunan' => $request->status_pembangunan]);
    }
}
