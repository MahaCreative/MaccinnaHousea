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
}
