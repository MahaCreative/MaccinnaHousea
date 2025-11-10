<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\BookingKunjungan;
use App\Models\Rumah;
use App\Models\User;
use Illuminate\Http\Request;

class BookingKunjunganController extends Controller
{
    public function index(Request $request)
    {


        $count = [
            'menunggu_konfirmasi' => BookingKunjungan::where('status_booking', 'menunggu konfirmasi')->count(),
            'diterima' => BookingKunjungan::where('status_booking', 'diterima')->count(),
            'selesai' => BookingKunjungan::where('status_booking', 'selesai')->count(),
        ];
        $query = BookingKunjungan::query()->with('pengunjung', 'petugas', 'rumah');
        if ($request->user()->role == 'admin') {
            $query->where('petugas_id', '=', $request->user()->id);
            $query->orWhere('petugas_id', '=', null);
        }

        if ($request->cari) {
            $query->where('nama_pengunjung', 'like', '%' . $request->cari . '%');
        }
        if ($request->status_booking) {
            $query->where('status_booking', '=', $request->status_booking);
        }
        if ($request->dari_tanggal) {
            $query->where('created_at', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->where('created_at', '<=', $request->sampai_tanggal);
        }
        $booking = $query->get();

        return inertia('Auth/BookingKunjungan/Index', compact('count', 'booking'));
    }

    public function update(Request $request)
    {
        $booking = BookingKunjungan::findOrFail($request->id);

        $booking->update([
            'petugas_id' => $request->user()->id,
            'status_booking' => $request->status_booking,
        ]);
    }

    public function form_laporan(Request $request)
    {
        $petugas = User::where('role', '=', 'admin')->latest()->get();
        $rumah = Rumah::latest()->get();
        return inertia('Auth/BookingKunjungan/FormReport', compact('petugas', 'rumah'));
    }

    public function print(Request $request)
    {

        $query = BookingKunjungan::query()->with('pengunjung', 'petugas', 'rumah');


        if ($request->petugas) {
            $query->whereHas('petugas', function ($q) use ($request) {
                $q->where('nama_lengkap', 'like', '%' . $request->petugas . '%');
            });
        }
        if ($request->rumah) {
            $query->whereHas('rumah', function ($q) use ($request) {
                $q->where('nama_rumah', 'like', '%' . $request->rumah . '%');
            });
        }
        if ($request->status) {
            $query->where('status_booking', '=', $request->status);
        }
        if ($request->dari_tanggal) {
            $query->where('tanggal_kunjungan', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->where('tanggal_kunjungan', '<=', $request->sampai_tanggal);
        }
        $booking = $query->get();

        return inertia('Auth/BookingKunjungan/Print', compact('booking'));
    }
}
