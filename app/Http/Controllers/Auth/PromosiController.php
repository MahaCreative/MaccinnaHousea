<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Promosi;
use Illuminate\Http\Request;

class PromosiController extends Controller
{
    public function index(Request $request)
    {
        $promosi = Promosi::get();
        $count = [
            'image' => Promosi::count(),
            // 'views' => Promosi::sum('views')
        ];
        return inertia('Auth/Promosi/Index', compact('promosi', 'count'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'kontent' => 'required|string',
            'title' => 'required|string|min:6|max:255',
        ]);
        $gambar = $request->file('gambar')->store('Promosi');
        $Promosi = Promosi::create([
            'gambar' => $gambar,
            'kontent' => $request->kontent,
            'title' => $request->title,
            // 'views' => 0,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $Promosi = Promosi::find($id);
        $request->validate([

            'kontent' => 'required|string',
            'title' => 'required|string|min:6|max:255'
        ]);
        $gambar = $Promosi->gambar;
        if ($request->hasFile('gambar')) {
            $request->validate(['gambar' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $gambar = $request->file('gambar')->store('Promosi');
        }
        $Promosi->update([
            'kontent' => $request->kontent,
            'gambar' => $gambar,
            'title' => $request->title,
        ]);
        return redirect()->back();
    }

    public function delete(Request $request, $id)
    {
        $Promosi = Promosi::find($id);
        $Promosi->delete();
        return redirect()->back();
    }
}
