<?php

namespace App\Http\Controllers\Public;

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

        return inertia('Guest/DataRumah/DataRumah', compact('dataRumah'));
    }

    public function show(Request $request, $id)
    {
        $rumah = Rumah::with(['tipe', 'foto', 'harga_kredit' => function ($q) {
            $q->with('bank');
        }])->findOrFail($id);
        return inertia('Guest/DataRumah/Show', compact('rumah'));
    }
}
