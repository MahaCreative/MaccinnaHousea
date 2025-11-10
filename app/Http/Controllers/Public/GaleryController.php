<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Galery;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    public function index(Request $request)
    {
        $galery = Galery::get();
        return inertia('Guest/Galery/Index', compact('galery'));
    }
    public function show(Request $request, $id)
    {
        $galery = Galery::find($id);
        return inertia('Guest/Galery/Show', compact('galery'));
    }
}
