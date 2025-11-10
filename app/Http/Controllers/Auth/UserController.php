<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $queryAdmin = User::query()->where('role', '=', 'admin');
        $queryPelanggan = User::query()->where('role', '=', 'pelanggan');
        if ($request->cariAdmin) {
            $queryAdmin->where('nama_lengkap', 'like', '%' . $request->cariAdmin . '%');
        }
        $admin = $queryAdmin->get();
        $pelanggan = $queryPelanggan->get();
        $count = [
            'admin' =>  User::where('role', '=', 'admin')->count(),
            'pelanggan' =>  User::where('role', '=', 'admin')->count(),
        ];
        return inertia('Auth/User/Index', compact('admin', 'pelanggan', 'count'));
    }

    public function create(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required',
            'no_hp' => "required|unique:users,no_hp",
            'avatar' => 'required',
            'email' => "required|unique:users,email",
            'password' => 'required|alpha_dash|min:6'
        ]);
        $foto = '/default_profile.png';
        if ($request->hasFile('avatar')) {
            $foto = $request->file('avatar')->store('Admin/profile');
        }
        $user = User::create([
            'nama_lengkap' => $request->nama_lengkap,
            'no_hp' => $request->no_hp,
            'avatar' => $request->avatar,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'admin',
        ]);
        return redirect()->back();
    }

    public function update(Request $request)
    {
        $user = User::findOrFail($request->id);
        $request->validate([
            'nama_lengkap' => 'required',
            'no_hp' => "required|unique:users,no_hp",
            'avatar' => 'required',
            'email' => "required|unique:users,email",
        ]);

        $foto = $user->avatar;
        $password = $user->password;
        if ($request->hasFile('avatar')) {
            $foto = $request->file('avatar')->store('Admin/profile');
        }
        if ($request->password) {
            $request->validate(['password' => 'alpha_dash|min:6|max:16']);
            $password = bcrypt($request->password);
        }
        $user->update([
            'nama_lengkap' => $request->nama_lengkap,
            'no_hp' => $request->no_hp,
            'avatar' => $foto,
            'email' => $request->email,
            'password' => $password,
        ]);
    }
    public function delete(Request $request, $id)
    {
        $user = User::findORFail($id);
        $user->delete();
    }
}
