<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BerkasPermohonan;
use App\Models\PermohonanKredit;
use Illuminate\Http\Request;

class PermohonanKreditController extends Controller
{
    public function index(Request $request)
    {
        $query = PermohonanKredit::query()->with(['rumah' => function ($q) {
            $q->with('tipe');
        }, 'pengunjung', 'petugas', 'berkas'])
            ->where('pengunjung_id', '=', $request->user()->id);

        if ($request->cari) {
            $query->whereHas('rumah', function ($q) use ($request) {
                $q->where('nama_rumah', 'like', '%' . $request->cari . '%');
            });
        }
        if ($request->dari_tanggal) {
            $query->where('created_at', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->where('created_at', '<=', $request->sampai_tanggal);
        }
        if ($request->status_permohonan) {
            $query->where('status_permohonan', '=', $request->status_permohonan);
        }
        $permohonan = $query->get();
        return inertia('Guest/PermohonanKredit/Index', compact('permohonan'));
    }
    public function store(Request $request)
    {

        $request->validate([
            'rumah_id' => 'required',
            'nama_pemohon' => 'required|string|min:3',
            'no_hp_pemohon' => 'required',
            'ktp_pemohon' => 'required|image|mimes:jpg,jpeg,png',
            'ktp_pasangan' => 'nullable',
            'kartu_keluarga' => 'required|image|mimes:jpg,jpeg,png',
            'rekening_koran' => 'required|mimes:pdf',
            'slip_gaji' => 'required|image|mimes:jpg,jpeg,png',
        ]);
        $ktp_pasangan = null;
        if ($request->hasFile('ktp_pasangan')) {
            $request->validate(['ktp_pasangan' => 'required|image|mimes:jpg,jpg,png']);
            $ktp_pasangan = $request->file('ktp_pasangan')->store('berkas_permohonan');
        }
        $no_hp_pemohon = $request->no_hp_pemohon;
        $ktp_pemohon = $request->file('ktp_pemohon')->store('berkas_permohonan');
        $kartu_keluarga = $request->file('kartu_keluarga')->store('berkas_permohonan');
        $rekening_koran = $request->file('rekening_koran')->store('berkas_permohonan');
        $slip_gaji = $request->file('slip_gaji')->store('berkas_permohonan');
        $permohonanCOunt = PermohonanKredit::count();
        $kode = now()->format('dmy') . '00' . $permohonanCOunt;
        $permohonan = PermohonanKredit::create([
            'rumah_id' => $request->rumah_id,
            'nama_pemohon' => $request->nama_pemohon,
            'pengunjung_id' => $request->user()->id,
            'kode_permohonan' => $kode,
            'tanggal_permohonan' => now(),
            'no_hp_pemohon' => $no_hp_pemohon,
        ]);
        $berkas = BerkasPermohonan::create([
            'permohonan_kredit_id' => $permohonan->id,
            'ktp_pemohon' => $ktp_pemohon,
            'ktp_pasangan' => $ktp_pasangan,
            'kartu_keluarga' => $kartu_keluarga,
            'rekening_koran' => $rekening_koran,
            'slip_gaji' => $slip_gaji,
        ]);
    }

    public function create_berkas(Request $request)
    {

        $request->validate([
            "ktp_pemohon" => 'required|image|mimes:png,jpg,jpeg,giv,webp',
            "ktp_pasangan" => 'required|image|mimes:png,jpg,jpeg,giv,webp',
            "kartu_keluarga" => 'required|image|mimes:png,jpg,jpeg,giv,webp',
            "rekening_koran" => 'required|mimes:pdf',
            "slip_gaji" => 'required|image|mimes:png,jpg,jpeg,giv,webp',
        ]);
        $ktp_pemohon = $request->file('ktp_pemohon')->store('berkas/ktp_pemohon');
        $ktp_pasangan = $request->file('ktp_pasangan')->store('berkas/ktp_pasangan');
        $kartu_keluarga = $request->file('kartu_keluarga')->store('berkas/kartu_keluarga');
        $rekening_koran = $request->file('rekening_koran')->store('berkas/rekening_koran');
        $slip_gaji = $request->file('slip_gaji')->store('berkas/slip_gaji');
        $berkas = BerkasPermohonan::create([
            'permohonan_kredit_id' => $request->id,
            'ktp_pemohon' => $ktp_pemohon,
            'ktp_pasangan' => $ktp_pasangan,
            'kartu_keluarga' => $kartu_keluarga,
            'rekening_koran' => $rekening_koran,
        ]);
    }
}
