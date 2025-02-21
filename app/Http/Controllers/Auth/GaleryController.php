<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    //
    public function index(Request $request)
    {
        return inertia('Auth/Galery/Index');
    }
}
