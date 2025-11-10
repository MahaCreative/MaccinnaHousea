<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Promosi;
use Illuminate\Http\Request;

class PromosiController extends Controller
{
    public function index(Request $request)
    {
        $promosi = Promosi::get();
        return inertia('Guest/Promosi/Index', compact('promosi'));
    }
    public function show(Request $request, $id)
    {
        $promosi = Promosi::find($id);
        return inertia('Guest/Promosi/Show', compact('promosi'));
    }
}
