<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Auth\BookingKunjunganController;
use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\Auth\DataRumahController as AuthDataRumahController;
use App\Http\Controllers\Auth\DetailRumahController;
use App\Http\Controllers\Auth\PermohonanKreditController as AuthPermohonanKredit;
use App\Http\Controllers\Auth\GaleryController;
use App\Http\Controllers\Auth\PromosiController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\DataBankKreditController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PenjualanRumahController;
use App\Http\Controllers\Public\ProfileController;
use App\Http\Controllers\Public\DataRumahController;
use App\Http\Controllers\Public\DataTipeController;
use App\Http\Controllers\Public\GaleryController as PublicGaleryController;
use App\Http\Controllers\Public\LoginController;
use App\Http\Controllers\Public\OrderKunjunganController;
use App\Http\Controllers\Public\PermohonanKreditController;
use App\Http\Controllers\Public\PromosiController as PublicPromosiController;
use App\Http\Controllers\Public\RegisterController;
use App\Http\Controllers\SendMessageController;
use App\Models\BookingKunjungan;
use App\Models\PermohonanKredit;
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
// api

Route::get('api/get-data-tipe', [DataTipeController::class, 'api_data'])->name('api-data-tipe');
Route::post('api/create-data-tipe', [DataTipeController::class, 'api_create'])->name('api-create-data-tipe');
Route::post('api/delete-data-tipe', [DataTipeController::class, 'api_delete'])->name('api-delete-data-tipe');
Route::get('api/get-data-bank-kredit', [DataBankKreditController::class, 'api_data'])->name('api-data-bank-kredit');
Route::post('api/create-data-bank-kredit', [DataBankKreditController::class, 'api_create'])->name('api-create-bank-kredit');
Route::post('api/delete-data-bank-kredit', [DataBankKreditController::class, 'api_delete'])->name('api-delete-bank-kredit');
// end api




Route::middleware(['guest'])->group(function () {
    Route::get('login', [LoginController::class, 'index'])->name('login');
    Route::post('login', [LoginController::class, 'store'])->name('store.login');
    Route::get('register', [RegisterController::class, 'index'])->name('register');
    Route::post('register', [RegisterController::class, 'store'])->name('store.register');
});
// Pengunjung
Route::get('', [HomeController::class, 'index'])->name('home');
Route::get('about', [AboutController::class, 'index'])->name('about');



Route::get('data-rumah', [DataRumahController::class, 'index'])->name('data-rumah');
Route::get('show-data-rumah/{id}', [DataRumahController::class, 'show'])->name('show-data-rumah');
Route::get('data-tipe', [DataTipeController::class, 'index'])->name('data-tipe');

Route::get('galery-kami', [PublicGaleryController::class, 'index'])->name('galery');
Route::get('detail-galery-kami/{id}', [PublicGaleryController::class, 'show'])->name('detail-galery');

Route::get('info-promosi', [PublicPromosiController::class, 'index'])->name('promosi');
Route::get('detail-info-promosi/{id}', [PublicPromosiController::class, 'show'])->name('detail-promosi');




// Auth
ROute::middleware(['auth'])->group(function () {


    // pengunjung auth
    Route::get('history-booking-kunjungan', [OrderKunjunganController::class, 'index'])->name('pengunjung.history-kunjungan');
    Route::post('booking-kunjungan', [OrderKunjunganController::class, 'store'])->name('pengunjung.order-kunjungan');

    Route::get('history-permohonan-kredit', [PermohonanKreditController::class, 'index'])->name('pengunjung.history-permohonan-kredit');
    Route::post('ajukan-permohonan-kredit', [PermohonanKreditController::class, 'store'])->name('pengunjung.store-permohonan-kredit');
    Route::post('create-form-berkas', [PermohonanKreditController::class, 'create_berkas'])->name('pengunjung.create-berkas');
    Route::get('profile-saya', [ProfileController::class, 'index'])->name('profile-saya');
    Route::post('update-profile', [ProfileController::class, 'update'])->name('update-profile');

    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('auth.dashboard');
    Route::get('auth/katalog-data-rumah', [AuthDataRumahController::class, 'index'])->name('auth.data-rumah');
    Route::get('auth/create-data-rumah', [AuthDataRumahController::class, 'create'])->name('auth.create-data-rumah');
    Route::post('auth/store-data-rumah', [AuthDataRumahController::class, 'store'])->name('auth.store-data-rumah');
    Route::get('auth/edit-data-rumah/{id}', [AuthDataRumahController::class, 'edit'])->name('auth.edit-data-rumah');
    Route::post('auth/update-data-rumah', [AuthDataRumahController::class, 'update'])->name('auth.update-data-rumah');
    Route::delete('auth/delete-data-rumah/{id}', [AuthDataRumahController::class, 'delete'])->name('auth.delete-data-rumah');
    Route::post('auth/delete-harga-kredit-rumah', [AuthDataRumahController::class, 'delete_harga_kredit'])->name('auth.delete-harga-kredit-rumah');
    Route::get('detail-data-rumah', [DetailRumahController::class, 'index'])->name('auth.detail-data-rumah');
    Route::get('cetak-data-rumah', [DetailRumahController::class, 'form_report'])->name('auth.cetak-detail-data-rumah');
    Route::get('print-laporan-data-rumah', [DetailRumahController::class, 'laporan'])->name('auth.laporan-detail-data-rumah');
    Route::post('update-data-rumah', [DetailRumahController::class, 'update'])->name('auth.update-detail-data-rumah');
    // Route::prefix('auth', function () {});
    Route::get('auth/data-user', [UserController::class, 'index'])->name('auth.user');
    Route::post('auth/create-data-user', [UserController::class, 'create'])->name('auth.create-data-user');
    Route::post('/auth/update-data-user', [UserController::class, 'update'])->name('auth.update-data-user');
    Route::delete('auth/delete-data-user/{id}', [UserController::class, 'delete'])->name('auth.delete-data-user');

    Route::get('auth/data-galery', [GaleryController::class, 'index'])->name('auth.data-galery');
    Route::post('auth/store-data-galery', [GaleryController::class, 'store'])->name('auth.store-data-galery');
    Route::post('auth/update-data-galery/{id}', [GaleryController::class, 'update'])->name('auth.update-data-galery');
    Route::delete('auth/delete-data-galery/{id}', [GaleryController::class, 'delete'])->name('auth.delete-data-galery');

    Route::get('auth/data-promosi', [PromosiController::class, 'index'])->name('auth.data-promosi');
    Route::post('auth/store-promosi', [PromosiController::class, 'store'])->name('auth.store-promosi');
    Route::post('auth/update-promosi/{id}', [PromosiController::class, 'update'])->name('auth.update-promosi');
    Route::delete('auth/delete-promosi/{id}', [PromosiController::class, 'delete'])->name('auth.delete-promosi');

    Route::get('auth/booking-kunjungan', [BookingKunjunganController::class, 'index'])->name('auth.booking-kunjungan');
    Route::get('auth/form-laporan-booking-kunjungan', [BookingKunjunganController::class, 'form_laporan'])->name('auth.form-booking-kunjungan');
    Route::get('auth/print-laporan-booking-kunjungan', [BookingKunjunganController::class, 'print'])->name('auth.print-booking-kunjungan');
    Route::post('auth/update-booking-kunjungan', [BookingKunjunganController::class, 'update'])->name('auth.update-booking-kunjungan');

    Route::get('auth/permohonan-kredit', [AuthPermohonanKredit::class, 'index'])->name('auth.permohonan-kredit');
    Route::get('auth/form-laporan-permohonan-kredit', [AuthPermohonanKredit::class, 'form_laporan'])->name('auth.form-laporan-permohonan-kredit');
    Route::get('auth/print-laporan-permohonan-kredit', [AuthPermohonanKredit::class, 'print'])->name('auth.print-laporan-permohonan-kredit');
    Route::post('auth/create-permohonan-kredit', [AuthPermohonanKredit::class, 'store'])->name('auth.create-permohonan-kredit');
    Route::post('auth/update-data-berkas', [AuthPermohonanKredit::class, 'update'])->name('auth.update-berkas');
    Route::post('auth/update-status-permohonan', [AuthPermohonanKredit::class, 'update_permohonan'])->name('auth.update-status-permohonan');

    Route::get('auth/profile-saya', [ProfileController::class, 'auth_index'])->name('auth.profile-saya');

    Route::get('auth/penjualan-rumah', [PenjualanRumahController::class, 'index'])->name('auth.penjualan-rumah');
    Route::post('auth/store-penjualan-rumah', [PenjualanRumahController::class, 'store'])->name('auth.store-penjualan-rumah');
});
