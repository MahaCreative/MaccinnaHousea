<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Guest/Login/Index');
    }
    public function store(Request $request)
    {
        dd($request->all());
    }
}
