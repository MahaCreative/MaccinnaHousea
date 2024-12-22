<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Rumah;
use Illuminate\Http\Request;

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
        $dataRumah = $query->paginate($load);

        return inertia('Auth/DataRumah/Index', compact('dataRumah'));
    }
}
