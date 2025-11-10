<?php

namespace App\Http\Controllers;

use App\Models\DetailMessage;
use App\Models\Pesan;
use Illuminate\Http\Request;

class SendMessageController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());

        if ($request->kode_pesan == "") {
            $getCount = Pesan::where('pengunjung_id', $request->user()->id)->count();
            $date = now()->format('dmy');
            $kodePesan =  $date . '0'  + $request->user()->id;
            $pesan = Pesan::create([
                'kode_pesan' => $kodePesan . $getCount + 1,
                'pengunjung_id' => $request->user()->id,
            ]);
            $detailPesan = DetailMessage::create([
                'pesan_id' => $pesan->id,
                'sender_id' => $request->user()->id,
                'message' => $request->message,
            ]);
            return redirect()->back()->with(['kd_pesan' => $pesan->kode_pesan]);
        } else {
            $pesan = Pesan::where('kode_pesan', $request->kode_pesan)->first();
            $detailPesan = DetailMessage::create([
                'pesan_id' => $pesan->id,
                'sender_id' => $request->user()->id,
                'message' => $request->message,
            ]);
        }
    }
}
