<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\Auth\DataRumahController as AuthDataRumahController;
use App\Http\Controllers\DataBankKreditController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\DataRumahController;
use App\Http\Controllers\Public\DataTipeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('', [HomeController::class, 'index'])->name('home');
Route::get('about', [AboutController::class, 'index'])->name('about');

Route::get('api/get-data-tipe', [DataTipeController::class, 'api_data'])->name('api-data-tipe');
Route::post('api/create-data-tipe', [DataTipeController::class, 'api_create'])->name('api-create-data-tipe');
Route::post('api/delete-data-tipe', [DataTipeController::class, 'api_delete'])->name('api-delete-data-tipe');
Route::get('api/get-data-bank-kredit', [DataBankKreditController::class, 'api_data'])->name('api-data-bank-kredit');
Route::post('api/create-data-bank-kredit', [DataBankKreditController::class, 'api_create'])->name('api-create-bank-kredit');
Route::post('api/delete-data-bank-kredit', [DataBankKreditController::class, 'api_delete'])->name('api-delete-bank-kredit');


Route::get('data-rumah', [DataRumahController::class, 'index'])->name('data-rumah');
Route::get('show-data-rumah/{id}', [DataRumahController::class, 'show'])->name('show-data-rumah');
Route::get('data-tipe', [DataTipeController::class, 'index'])->name('data-tipe');



// Auth
Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('auth/data-rumah', [AuthDataRumahController::class, 'index'])->name('auth.data-rumah');
Route::get('auth/create-data-rumah', [AuthDataRumahController::class, 'create'])->name('auth.create-data-rumah');
Route::post('auth/store-data-rumah', [AuthDataRumahController::class, 'store'])->name('auth.store-data-rumah');
Route::get('auth/edit-data-rumah/{id}', [AuthDataRumahController::class, 'edit'])->name('auth.edit-data-rumah');
Route::post('auth/update-data-rumah', [AuthDataRumahController::class, 'update'])->name('auth.update-data-rumah');
Route::delete('auth/delete-data-rumah/{id}', [AuthDataRumahController::class, 'delete'])->name('auth.delete-data-rumah');
Route::post('auth/delete-harga-kredit-rumah', [AuthDataRumahController::class, 'delete_harga_kredit'])->name('auth.delete-harga-kredit-rumah');
// Route::prefix('auth', function () {});
