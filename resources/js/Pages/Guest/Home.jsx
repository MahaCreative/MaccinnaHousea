import GuestLayout from "@/Layouts/GuestLayout";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Link } from "@inertiajs/react";
import CurrencyInput from "react-currency-input-field";
import { debounce } from "@mui/material";

export default function Home(props) {
    const tipe = props.tipe;
    const rumah = props.rumah;
    console.log(tipe);

    const [params, setParams] = useState({ tipe: "" });
    const [stats, setStats] = useState({
        totalDevelopment: 0,
        developed: 0,
        clusters: 0,
        families: 0,
    });

    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    const finalStats = {
        totalDevelopment: 2500,
        developed: 1500,
        clusters: 1,
        families: 253,
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.5 } // Aktif jika 50% elemen terlihat di layar
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (visible) {
            let interval = setInterval(() => {
                setStats({
                    totalDevelopment: Math.floor(Math.random() * 3000),
                    developed: Math.floor(Math.random() * 2000),
                    clusters: Math.floor(Math.random() * 10),
                    families: Math.floor(Math.random() * 500),
                });
            }, 200);

            setTimeout(() => {
                clearInterval(interval);
                setStats(finalStats);
            }, 2000); // Efek acak selama 2 detik sebelum angka asli muncul

            return () => clearInterval(interval);
        }
    }, [visible]);
    const reload = () => useCallback(debounce((query) => {}, []));
    return (
        <div>
            <div className="bg-secondary py-28 px-4 md:px-8 lg:px-24 useTransition">
                <div className="flex useTransition  md:flex-row flex-col-reverse ">
                    <div className="w-full md:w-1/2 ">
                        <div
                            ref={sectionRef}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 gapy-8"
                        >
                            <div>
                                <p className="font-extrabold text-green-500 text-5xl">
                                    {stats.totalDevelopment}{" "}
                                    <sup className="font-light text-white">
                                        ha
                                    </sup>
                                </p>
                                <p className="tracking-tighter font-light text-white">
                                    Total Pengembangan
                                </p>
                            </div>
                            <div>
                                <p className="font-extrabold text-green-500 text-5xl">
                                    {stats.developed}{" "}
                                    <sup className="font-light text-white">
                                        ha
                                    </sup>
                                </p>
                                <p className="tracking-tighter font-light text-white">
                                    Telah Dikembangkan
                                </p>
                            </div>
                            <div>
                                <p className="font-extrabold text-green-500 text-5xl">
                                    {stats.clusters}
                                </p>
                                <p className="tracking-tighter font-light text-white">
                                    Cluster
                                </p>
                            </div>
                            <div>
                                <p className="font-extrabold text-green-500 text-5xl">
                                    {stats.families}{" "}
                                    <sup className="font-light text-white">
                                        kk
                                    </sup>
                                </p>
                                <p className="tracking-tighter font-light text-white">
                                    Kepala Keluarga
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h1 className="w-full text-white font-extrabold text-4xl leading-tight tracking-wider">
                            Temukan{" "}
                            <span className="text-green-600">Rumah Impian</span>{" "}
                            untuk hidup bersama keluarga anda
                        </h1>
                        <p className="tracking-tighter text-white font-light my-4">
                            Rumah bukan sekadar tempat tinggal, tetapi tempat di
                            mana kebahagiaan dan kenyamanan keluarga bermula.
                            Temukan rumah impian yang sempurna untuk membangun
                            masa depan yang lebih baik bersama orang-orang
                            tercinta.
                        </p>
                    </div>
                </div>
            </div>
            {/* About */}
            <div className="flex py-6 px-4 md:px-8 lg:px-16 useTransition md:flex-row flex-col-reverse">
                <div className="w-full">
                    <h1 className="text-4xl font-semibold text-green-500 mb-4">
                        About Us
                    </h1>
                    <p className="font-light text-secondary tracking-tighter my-1.5">
                        Selamat datang di BTN Maccinna House, platform inovatif
                        untuk menemukan rumah impian Anda! Kami hadir untuk
                        mempermudah Anda dalam mencari dan memiliki hunian yang
                        nyaman, berkualitas, dan sesuai dengan kebutuhan
                        keluarga modern.
                    </p>
                    <p className="font-light text-secondary tracking-tighter my-1.5">
                        Di BTN Maccinna House, kami tidak hanya menawarkan
                        rumah—kami menghadirkan gaya hidup. Dengan desain yang
                        elegan, lingkungan yang asri, serta fasilitas yang
                        menunjang kenyamanan, kami berkomitmen untuk menjadi
                        solusi terbaik dalam kepemilikan rumah bagi Anda dan
                        keluarga.
                    </p>
                    <div className="py-6">
                        <Link
                            href={route("about")}
                            as="div"
                            className="rounded-lg inline hover:cursor-pointer  text-white text-xl tracking-tighter py-3 px-4 bg-green-500 hover:bg-green-700 useTransition animate-pulse"
                        >
                            Lihat Tentang Kami
                        </Link>
                    </div>
                </div>
                <div className=" flex justify-end">
                    <img
                        src="./storage/Image/about.jpg"
                        alt=""
                        className="w-[500px] my-6 object-cover"
                    />
                </div>
            </div>

            {/* Data Rumah */}
            <div className="py-10 px-4 md:px-8 lg:px-16 useTransition">
                <p className="text-secondary tracking-tighter font-bold text-2xl md:text-4xl lg:text-6xl text-center">
                    Temukan{" "}
                    <span className="text-green-500">Rumah Impian Anda</span>
                </p>
                <div className="flex justify-center items-center gap-x-8 py-6">
                    <button
                        onClick={() => setParams({ ...params, tipe: "" })}
                        className={`${
                            params.tipe == ""
                                ? "bg-green-500 scale-110"
                                : "bg-secondary"
                        } text-sm md:text-base lg:text-lg text-white  py-2 px-4 rounded-md tracking-tighter useTransition`}
                    >
                        Semua Tipe
                    </button>
                    {tipe.map((item, key) => (
                        <button
                            onClick={() =>
                                setParams({ ...params, tipe: item.id })
                            }
                            key={key}
                            className={`${
                                params.tipe == item.id
                                    ? "bg-green-500 scale-110"
                                    : "bg-secondary"
                            } text-xl text-white  py-2 px-4 rounded-md tracking-tighter useTransition`}
                        >
                            Tipe {item.nama_tipe}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 useTransition gap-6">
                    {rumah.map((item, key) => (
                        <Link
                            href={route("show-data-rumah", item.id)}
                            key={key}
                            className="rounded-md shadow-md shadow-gray-300 overflow-hidden hover:cursor-pointer useTransition hover:scale-110"
                        >
                            <img
                                src={"/storage/" + item.foto_rumah}
                                alt=""
                                className="w-full h-[170px] object-cover object-center"
                            />
                            <div className="bg-secondary px-4 py-1.5">
                                <p className="font-semibold text-lg text-white tracking-tighter">
                                    {item.nama_rumah}
                                </p>
                                <p>
                                    <CurrencyInput
                                        disabled
                                        prefix="Rp. "
                                        value={item.harga_rumah}
                                        className="p-0 bg-inherit outline-none border-none text-green-500 tracking-tighter font-semibold text-base"
                                    />
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => <GuestLayout children={page} judul={"Home"} />;
