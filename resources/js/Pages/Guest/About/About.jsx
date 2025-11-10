import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

export default function About() {
    return (
        <div className=" py-6 px-4 md:px-8 lg:px-16">
            <h3 className="tracking-tighter text-5xl font-semibold text-secondary text-center">
                Maccinna <span className="text-green-500">House</span>
            </h3>
            <p className="tracking-tighter text-center text-secondary text-sm italic">
                Temukan Rumah Impian Anda Di Maccina House
            </p>
            <div className="py-6">
                <p className="text-secondary font-light  tracking-tighter">
                    BTN Maccinna House hadir sebagai solusi hunian nyaman dan
                    berkualitas di Mamuju. Dengan komitmen untuk menyediakan
                    perumahan yang modern dan terjangkau, kami terus berkembang
                    untuk memenuhi kebutuhan masyarakat akan tempat tinggal yang
                    ideal. Sebagai salah satu pengembang terpercaya di Mamuju,
                    BTN Maccinna House menawarkan hunian dengan konsep yang
                    nyaman, aman, dan strategis. Kami berupaya menghadirkan
                    lingkungan perumahan yang mendukung gaya hidup modern,
                    dilengkapi dengan fasilitas yang menunjang kenyamanan
                    penghuninya.
                </p>
                <div className="flex gap-4 items-center">
                    <img
                        src="/storage/Image/about.jpg"
                        alt=""
                        className="w-full md:w-[500px] my-6 object-cover"
                    />
                    <div className="py-3">
                        <p className="text-secondary tracking-tighter font-bold text-2xl">
                            Visi Maccinna{" "}
                            <span className="text-green-500">House</span>
                        </p>
                        <p className="text-secondary font-light  tracking-tighter mt-6">
                            Menjadi pengembang perumahan terdepan di Mamuju yang
                            menghadirkan hunian berkualitas, nyaman, dan
                            terjangkau bagi masyarakat. Kami berkomitmen untuk
                            menciptakan lingkungan perumahan yang asri, aman,
                            dan harmonis, serta mendukung gaya hidup sehat dan
                            modern. Dengan desain yang fungsional, strategis,
                            dan bernilai investasi tinggi, BTN Maccinna House
                            menjadi pilihan utama bagi keluarga dalam mewujudkan
                            hunian impian. Kami terus berinovasi dalam
                            pengembangan properti dengan standar terbaik,
                            mengutamakan keberlanjutan lingkungan, serta
                            menyediakan fasilitas yang menunjang kesejahteraan
                            penghuni. Melalui layanan yang profesional, mudah,
                            transparan, dan terpercaya, kami bertekad memberikan
                            pengalaman terbaik bagi setiap keluarga dalam
                            memiliki rumah idaman.
                        </p>
                    </div>
                </div>
            </div>
            <p className="text-secondary tracking-tighter font-bold text-2xl">
                Misi Maccinna <span className="text-green-500">House</span>
            </p>
            <div class="relative border-l-4 border-green-500 pl-6 space-y-8 py-3">
                <div class="group relative">
                    <div class="absolute -left-8 top-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                    <h3 class="text-xl font-semibold text-secondary group-hover:text-green-600 transition">
                        Menyediakan Hunian Berkualitas dan Terjangkau
                    </h3>
                    <p class="text-gray-700">
                        Kami menghadirkan rumah modern dengan material terbaik
                        dan harga yang tetap terjangkau bagi masyarakat Mamuju.
                    </p>
                </div>

                <div class="group relative">
                    <div class="absolute -left-8 top-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                    <h3 class="text-xl font-semibold text-secondary group-hover:text-green-600 transition">
                        Membangun Lingkungan Asri
                    </h3>
                    <p class="text-gray-700">
                        Kami menciptakan perumahan dengan ruang terbuka hijau
                        dan tata kota yang rapi untuk kehidupan yang sehat.
                    </p>
                </div>

                <div class="group relative">
                    <div class="absolute -left-8 top-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                    <h3 class="text-xl font-semibold text-secondary group-hover:text-green-600 transition">
                        Keamanan & Ketahanan Hunian
                    </h3>
                    <p class="text-gray-700">
                        Sistem keamanan modern dengan akses terbatas dan
                        pengawasan CCTV demi kenyamanan penghuni.
                    </p>
                </div>

                <div class="group relative">
                    <div class="absolute -left-8 top-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                    <h3 class="text-xl font-semibold text-secondary group-hover:text-green-600 transition">
                        Fasilitas Modern
                    </h3>
                    <p class="text-gray-700">
                        Menyediakan sarana olahraga, taman bermain, dan akses
                        mudah ke fasilitas umum.
                    </p>
                </div>

                <div class="group relative">
                    <div class="absolute -left-8 top-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                    <h3 class="text-xl font-semibold text-secondary group-hover:text-green-600 transition">
                        Inovasi Berkelanjutan
                    </h3>
                    <p class="text-gray-700">
                        Kami terus berinovasi dalam desain, teknologi, dan
                        pengelolaan lingkungan untuk perumahan yang lebih baik.
                    </p>
                </div>
            </div>
        </div>
    );
}

About.layout = (page) => <GuestLayout children={page} judul={"About"} />;
