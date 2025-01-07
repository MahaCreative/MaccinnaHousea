<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\TipeRumah;
use Illuminate\Http\Request;

class DataTipeController extends Controller
{
    public function index(Request $request)
    {
        $dataTipe = TipeRumah::all();
        return response()->json($dataTipe);
    }
    public function api_data(Request $request)
    {
        $dataTipe = TipeRumah::all();
        return response()->json($dataTipe);
    }

    public function api_create(Request $request)
    {
        $request->validate([
            'nama_tipe' => 'required|numeric|unique:tipe_rumahs,nama_tipe',
        ]);
        $dataTipe = TipeRumah::create(['nama_tipe' => $request->nama_tipe]);
        return response()->json($dataTipe);
    }

    public function api_delete(Request $request)
    {

        $dataTipe = TipeRumah::find($request->id);

        $dataTipe->delete();
    }
}
