<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Guest/Register/Index');
    }
    public function store(Request $request)
    {
        $attr = $request->validate([
            "nama_lengkap" => 'required|min:4|max:50',
            "no_hp" => 'required|numeric|max_digits:12|unique:users,no_hp',
            "avatar" => 'required|image|mimes:png,jpeg,jpg',
            "email" => 'required|email|unique:users,email',
            "password" => 'required|alpha_dash|min:6',
        ]);

        if ($request->file('avatar')) {
            $avatar = $request->file('avatar')->store('Profile');
        }
        $attr['password'] = bcrypt($request->password);
        $attr['avatar'] = $avatar;
        $user = User::create($attr);
        Auth::login($user);
        return redirect()->route('home');
    }
}
