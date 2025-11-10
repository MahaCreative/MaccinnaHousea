<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Galery;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    //
    public function index(Request $request)
    {
        $galery = Galery::get();
        $count = [
            'image' => Galery::count(),
            'views' => Galery::sum('views')
        ];
        return inertia('Auth/Galery/Index', compact('galery', 'count'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'kontent' => 'required|string',
            'title' => 'required|string|min:6|max:255',
        ]);
        $gambar = $request->file('gambar')->store('Galery');
        $galery = Galery::create([
            'gambar' => $gambar,
            'kontent' => $request->kontent,
            'title' => $request->title,
            'views' => 0,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $galery = Galery::find($id);
        $request->validate([

            'kontent' => 'required|string',
            'title' => 'required|string|min:6|max:255'
        ]);
        $gambar = $galery->gambar;
        if ($request->hasFile('gambar')) {
            $request->validate(['gambar' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $gambar = $request->file('gambar')->store('Galery');
        }
        $galery->update([
            'kontent' => $request->kontent,
            'gambar' => $gambar,
            'title' => $request->title,
        ]);
        return redirect()->back();
    }

    public function delete(Request $request, $id)
    {
        $galery = Galery::find($id);
        $galery->delete();
        return redirect()->back();
    }
}
