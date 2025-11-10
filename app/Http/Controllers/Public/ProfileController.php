<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Guest/Profile/Index');
    }
    public function auth_index(Request $request)
    {
        return inertia('Auth/Profile/Index');
    }
    public function update(Request $request)
    {

        $user = $request->user();
        $request->validate([
            'nama_lengkap' => 'required|string|min:3|max:75',
            'no_hp' => 'required|numeric|max_digits:14|min_digits:3|unique:users,no_hp,' . $user->id,
            'email' => 'required|email|unique:users,email,' . $user->id,

        ]);
        $data = [
            'nama_lengkap' => $request->nama_lengkap,
            'no_hp' => $request->no_hp,
            'email' => $request->email,

        ];
        $data['avatar'] = $user->avatar;
        if ($request->hasFile('avatar')) {
            $request->validate(['avatar' => 'image|mimes:jpg,jpeg,png']);
            $data['avatar'] = $request->file('avatar')->store('avatar');
        }
        if ($request->password) {
            $request->validate([
                'password' => 'alpha_dash|min:6'
            ]);
            $data['password'] = bcrypt('password');
        }
        $user->update($data);
    }
}
