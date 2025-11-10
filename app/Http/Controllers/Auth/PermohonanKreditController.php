<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\BerkasPermohonan;
use App\Models\PermohonanKredit;
use App\Models\Rumah;
use App\Models\User;
use Illuminate\Http\Request;

class PermohonanKreditController extends Controller
{
    public function index(Request $request)
    {
        $count = [
            'baru' => PermohonanKredit::where('status_permohonan', 'baru')->count(),
            'followup' => PermohonanKredit::where('status_permohonan', 'followup')->count(),
            'cancell' => PermohonanKredit::where('status_permohonan', 'cancell')->count(),
            'closing' => PermohonanKredit::where('status_permohonan', 'closing')->count(),
        ];
        $query = PermohonanKredit::query()->with(['rumah' => function ($q) {
            $q->with('tipe');
        }, 'pengunjung', 'petugas', 'berkas']);

        if ($request->user()->role == 'admin') {
            $query->where('petugas_id', '=', $request->user()->id)
                ->orWhere('petugas_id', '=', null);
        }


        if ($request->cari) {
            $query->where('nama_pemohon', 'like', '%' . $request->cari . '%');
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
        $permohonan = $query->latest()->get();
        return inertia('Auth/PermohonanKredit/Index', compact('count', 'permohonan'));
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
            'petugas_id' => $request->user()->id,
            'nama_petugas_melayani' => $request->user()->nama_lengkap,
            'no_hp_petugas' => $request->user()->no_hp,
            'status_permohonan' => 'baru',
            'status_berkas' => 'diterima',
        ]);
        $berkas = BerkasPermohonan::create([
            'permohonan_kredit_id' => $permohonan->id,
            'ktp_pemohon' => $ktp_pemohon,
            'ktp_pasangan' => $ktp_pasangan,
            'kartu_keluarga' => $kartu_keluarga,
            'rekening_koran' => $rekening_koran,
            'slip_gaji' => $slip_gaji,
            'status_berkas' => 'diterima'
        ]);
    }
    public function update(Request $request)
    {
        // dd($request->all());
        $berkas = BerkasPermohonan::findOrFail($request->idBerkas);
        $permohonan = PermohonanKredit::find($berkas->permohonan_kredit_id);
        $berkas->update([
            'status_berkas' => $request->status_berkas,
            'tanggal_di_cek' => now(),
            'keterangan' => $request->keterangan,
        ]);

        $updatePermohonan = [
            'petugas_id' => $request->user()->id,
            'nama_petugas_melayani' => $request->user()->nama_lengkap,
            'no_hp_petugas' => $request->user()->no_hp,
            'status_berkas' => $request->status_berkas,
            // 'keterangan' => $request->keterangan,
            'nama_petugas_melayani' => $request->user()->nama_lengkap,
            'no_hp_petugas' => $request->user()->no_hp,
        ];
        if ($request->berkas !== 'diterima') {
            $updatePermohonan['tanggal_disetujui'] = now();
        }
        $permohonan->update($updatePermohonan);
        return redirect()->back();
    }

    public function update_permohonan(Request $request)
    {

        $permohonan = PermohonanKredit::find($request->id);
        $permohonan->update([
            'status_permohonan' => $request->status_permohonan
        ]);
    }

    public function form_laporan(Request $request)
    {
        $petugas = User::where('role', '=', 'admin')->latest()->get();
        $rumah = Rumah::latest()->get();
        return inertia('Auth/PermohonanKredit/FormReport', compact('petugas', 'rumah'));
    }

    public function print(Request $request)
    {

        $query = PermohonanKredit::query()->with(['rumah' => function ($q) {
            $q->with('tipe');
        }, 'pengunjung', 'petugas', 'berkas']);


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
        if ($request->dari_tanggal) {
            $query->where('tanggal_permohonan', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->where('tanggal_permohonan', '<=', $request->sampai_tanggal);
        }
        if ($request->status) {
            $query->where('status_permohonan', '=', $request->status);
        }
        $permohonan = $query->latest()->get();
        return inertia('Auth/PermohonanKredit/Print', compact('permohonan'));
    }
}
