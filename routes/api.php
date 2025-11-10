<?php

use App\Models\DetailRumah;
use App\Models\HargaKredit;
use App\Models\Rumah;
use App\Models\TipeRumah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('get-data-rumah', function (Request $request) {
    $query = Rumah::query();
    if ($request->tipe) {
        $query->where('tipe_rumah_id', $request->tipe);
    }
    $rumah = $query->latest()->get();
    return response()->json($rumah);
})->name('api-data-rumah');

Route::get('get-tipe-rumah', function (Request $request) {
    $tipe = TipeRumah::latest()->get();
    return response()->json($tipe);
})->name('api-get-data-tipe');

Route::get('get-detail-rumah', function (Request $request) {
    $query = DetailRumah::where('status_penjualan', '=', 'belum_terjual');

    $detail = $query->latest()->get();
    return response()->json($detail);
})->name('api-get-detail-rumah');

Route::get('get-harga-kredit', function (Request $request) {
    $query = HargaKredit::query()->with('bank');
    $kredit = $query->latest()->get();
    return response()->json($kredit);
})->name('api-get-harga-kredit');
