<?php

namespace App\Http\Middleware;

use App\Models\BerkasPermohonan;
use App\Models\BookingKunjungan;
use App\Models\PermohonanKredit;
use App\Models\Pesan;
use App\Models\Rumah;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        // dd($pesan);
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],

            'notif_permohonan' => PermohonanKredit::where('status_permohonan', '=', 'menunggu konfirmasi')->count(),
            'notif_berkas' => BerkasPermohonan::where('status_berkas', '=', 'menunggu konfirmasi')->count(),
            'notif_booking' => BookingKunjungan::where('status_booking', 'menunggu konfirmasi')->count(),
            'rumah' => Rumah::with('tipe')->latest()->get(),
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
