<?php

namespace App\Http\Controllers;

use App\Models\Rumah;
use App\Models\TipeRumah;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $tipe = TipeRumah::get();
        $query = Rumah::query();
        if ($request->tipe) {
            $query->where('tipe_rumah_id', '=', $request->tipe);
        }
        $rumah = $query->get();
        return inertia('Guest/Home', compact('tipe', 'rumah'));
    }
}
