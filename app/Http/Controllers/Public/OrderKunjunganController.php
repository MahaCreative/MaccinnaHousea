<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BookingKunjungan;
use Illuminate\Http\Request;

class OrderKunjunganController extends Controller
{
    public function index(Request $request)
    {
        $booking = BookingKunjungan::with('petugas', 'rumah')->where('pengunjung_id', $request->user()->id)->get();
        return inertia('Guest/BookingKunjungan/Index', compact('booking'));
    }
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'nama_pengunjung' => 'required|min:3|max:75',
            'nomor_pengunjung' => 'required|min:3|max:14',
            'tanggal_kunjungan' => 'required|date|after:now',
        ]);
        // dd($request->user()->id, $request->all());
        $booking = BookingKunjungan::create([
            'rumah_id' => $request->rumah_id,
            'pengunjung_id' => $request->user()->id,
            'tanggal_kunjungan' => $request->tanggal_kunjungan,
            'nama_pengunjung' => $request->nama_pengunjung,
            'nomor_pengunjung' => $request->nomor_pengunjung,
        ]);
    }
}
