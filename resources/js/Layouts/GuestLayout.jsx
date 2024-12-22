import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Head, Link } from "@inertiajs/react";
import MenuNav from "@/Components/MenuNav";
import {
    CalendarMonth,
    Call,
    Email,
    LocalPhone,
    LocationOn,
    Menu,
} from "@mui/icons-material";

export default function GuestLayout({ children, judul }) {
    var settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        autplaySpeed: 200,
        lazyLoad: true,
        infinite: true,
        speed: 1000,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    let sliderRef = useRef(null);
    const backSlide = () => {
        sliderRef.slickPrev();
    };
    const nextSlide = () => {
        sliderRef.slickNext();
    };
    const navbarResRef = useRef(null);
    const [navbarFixed, setNavbarFixed] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const scrollEvent = () => {
        if (window.scrollY > 50) {
            setNavbarFixed(true);
        } else {
            setNavbarFixed(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", scrollEvent);
        return () => {
            window.removeEventListener("scroll", scrollEvent);
        };
    }, []);
    useEffect(() => {
        document.addEventListener("mousedown", navbarListener);
        return () => {
            document.removeEventListener("mousedown", navbarListener);
        };
    }, []);
    let navbarListener = (e) => {
        if (navbarResRef.current && !navbarResRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };
    return (
        <>
            <Head title={judul} />
            <div className="w-full h-full relative overflow-hidden">
                <div
                    ref={navbarResRef}
                    className={`${
                        navbarFixed ? "fixed" : "absolute px-4 py-6"
                    } top-0 left-0 w-full z-[88]  useTransition`}
                >
                    <div
                        className={`w-full py-4 px-4  ${
                            navbarFixed
                                ? "rounded-b-md  backdrop-blur-sm"
                                : "rounded-md"
                        } useTransition bg-white`}
                    >
                        <div className="flex justify-between items-center ">
                            <h1 className="text-green-500 text-xl font-bold">
                                Macinna House
                            </h1>
                            <div className="hidden md:flex gap-x-8 items-center">
                                <MenuNav
                                    menu={"Home"}
                                    active={"home"}
                                    href={route("home")}
                                />
                                <MenuNav
                                    menu={"About"}
                                    active={"about"}
                                    href={route("about")}
                                />
                                <MenuNav
                                    menu={"Katalog Perumahan"}
                                    active={"katalog-rumah"}
                                    // href={route("")}
                                />
                                <MenuNav
                                    menu={"Galery"}
                                    active={"galery"}
                                    // href={route("")}
                                />
                                <MenuNav
                                    menu={"Promosi"}
                                    active={"galery"}
                                    // href={route("")}
                                />

                                <MenuNav
                                    menu={"Login"}
                                    active={"login"}
                                    // href={route("")}
                                />
                            </div>
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="md:hidden block bg-green-500 hover:bg-secondary text-sm text-white py-2 px-2 useTransition"
                            >
                                <Menu color="inherit" fontSize="inherit" />
                            </button>
                        </div>
                        <div
                            className={`${
                                showMenu ? "h-32" : "h-0"
                            } overflow-hidden  useTransition flex md:hidden flex-col gap-y-3`}
                        >
                            <MenuNav
                                menu={"Home"}
                                active={"home"}
                                href={route("home")}
                            />
                            <MenuNav
                                menu={"About"}
                                active={"about"}
                                // href={route("")}
                            />
                            <MenuNav
                                menu={"Katalog Perumahan"}
                                active={"katalog-rumah"}
                                // href={route("")}
                            />
                            <MenuNav
                                menu={"Galery"}
                                active={"galery"}
                                // href={route("")}
                            />
                            <MenuNav
                                menu={"Promosi"}
                                active={"galery"}
                                // href={route("")}
                            />

                            <MenuNav
                                menu={"Login"}
                                active={"login"}
                                // href={route("")}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col-reverse md:flex-row  w-full">
                    <div className="w-full md:w-1/2 px-8 useTransition">
                        <div className="py-6 h-full flex flex-col gap-y-6 justify-center items-start  useTransition">
                            <h1 className="w-full text-secondary font-extrabold text-4xl leading-tight tracking-wider">
                                Temukan{" "}
                                <span className="text-green-600">
                                    Rumah Impian
                                </span>{" "}
                                untuk hidup bersama keluarga anda
                            </h1>
                            <p className="text-secondary font-light">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Voluptatem magni quibusdam
                                quas repudiandae! Sunt dolor consequuntur,
                                facere est praesentium voluptatem tempora ut
                                sit, aperiam eligendi veritatis! Harum
                                aspernatur labore error!
                            </p>
                            <button className="py-3 font-medium rounded-md hover:bg-secondary  px-2 text-white bg-green-500">
                                View More
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 relative useTransition">
                        <div className="absolute bottom-[-10px] md:top-[10%] md:left-[-25px] left-[40%] z-50 flex gap-6 md:flex-col items-center justify-center">
                            <button
                                onClick={backSlide}
                                className="text-xs md:text-xl lg:text-3xl hover:bg-emerald-950 useTransition rotate-180 font-bold text-white p-3 leading-3 rounded-full bg-green-500 flex justify-center items-center"
                            >
                                <ArrowForwardIosIcon
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="text-xs md:text-xl lg:text-3xl hover:bg-emerald-950 useTransition font-bold text-white p-3 leading-3 rounded-full bg-green-500 flex justify-center items-center"
                            >
                                <ArrowForwardIosIcon
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </button>
                        </div>
                        <Slider
                            {...settings}
                            ref={(slider) => {
                                sliderRef = slider;
                            }}
                        >
                            <div key={1} className="bg-red-500 w-full">
                                <img
                                    src="./storage/Image/carousel-1.jpg"
                                    alt=""
                                    className="w-full object-cover"
                                />
                            </div>
                            <div key={2} className="bg-red-500 w-full">
                                <img
                                    src="./storage/Image/carousel-2.jpg"
                                    alt=""
                                    className="w-full object-cover"
                                />
                            </div>
                        </Slider>
                    </div>
                </div>
                {/* end slider */}
            </div>
            {children}
            {/* Contact Agent */}

            <div className=" my-3 mx-4 md:mx-8 lg:mx-16 py-6 p-4 flex flex-col md:flex-row justify-between items-start gap-x-4 border border-teal-500 border-dashed rounded-md">
                <div className="w-full md:w-1/2">
                    <img
                        src="./storage/Image/call.jpg"
                        alt=""
                        className="w-full"
                    />
                </div>
                <div className="w-full md:w-1/2 py-6 px-8">
                    <h1 className="font-extrabold text-base md:text-xl lg:text-4xl font-inter text-secondary w-[70%]  leading-3">
                        Hubungi Sekarang
                    </h1>
                    <p className="my-3 font-light text-lg text-gray-500">
                        Kami akan senang jika anda ingin mengatur jadwal
                        kunjungan untuk melihat perumahan kami. silahkan
                        menghubungi kami melalui nomor yang tersedia, atau
                        silahkan menekan tombol Booking Jadwal Kunjungan untuk
                        mengatur jadwal kunjungan anda
                    </p>
                    <div className="my-3 flex gap-3">
                        <button className="bg-teal-500 tracking-tighter text-xs md:text-base leading-3 text-white font-light p-5 rounded-md hover:bg-teal-700 useTransition flex gap-3 items-center">
                            <Call color="inherit" fontSize="inherit" />
                            <span>Hubungi Kami Sekarang</span>
                        </button>
                        <button className="bg-teal-950 tracking-tighter leading-3 text-xs md:text-base text-white font-light  p-5 rounded-md hover:bg-teal-700 useTransition flex gap-3 items-center">
                            <CalendarMonth color="inherit" fontSize="inherit" />
                            <span>Booking Kunjungan Sekarang</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="py-6 px-4 md:px-8 lg:px-16 bg-secondary flex md:flex-row flex-col gap-9">
                <div>
                    <h1 className="mb-6 font-bold text-white text-xs md:text-base lg:text-lg useTransition">
                        Tentang Kami
                    </h1>
                    <div className="flex gap-3 items-center">
                        <p className="text-base md:text-lg lg:text-xl text-gray-500">
                            <LocationOn color="inherit" fontSize="inherit" />
                        </p>
                        <p className="text-xs md:text-sm lg:text-sm text-gray-500">
                            Jl. isikan nama alamat disini okay
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <p className="text-base md:text-lg lg:text-xl text-gray-500">
                            <LocalPhone color="inherit" fontSize="inherit" />
                        </p>
                        <p className="text-xs md:text-sm lg:text-sm text-gray-500">
                            0853-3470-32xx
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <p className="text-base md:text-lg lg:text-xl text-gray-500">
                            <Email color="inherit" fontSize="inherit" />
                        </p>
                        <p className="text-xs md:text-sm lg:text-sm text-gray-500">
                            Macinnahouse.23@gmail.com
                        </p>
                    </div>
                </div>
                <div>
                    <h1 className="mb-6 font-bold text-white text-xs md:text-base lg:text-lg useTransition">
                        Link Alternatif
                    </h1>
                    <div className="flex flex-col gap-3">
                        <Link
                            href={route("home")}
                            className={`${
                                route().current() === "home"
                                    ? "text-green-500 font-medium"
                                    : "text-gray-500 font-light"
                            } text-xs md:text-sm hover:text-green-500 hover:font-semibold useTransition`}
                        >
                            Home
                        </Link>
                        <Link
                            href={route("about")}
                            className={`${
                                route().current() === "about"
                                    ? "text-green-500 font-medium"
                                    : "text-gray-500 font-light"
                            } text-xs md:text-sm hover:text-green-500 hover:font-semibold useTransition`}
                        >
                            About
                        </Link>
                        <Link
                            // href={route("galery")}
                            className={`${
                                route().current() === "galery"
                                    ? "text-green-500 font-medium"
                                    : "text-gray-500 font-light"
                            } text-xs md:text-sm hover:text-green-500 hover:font-semibold useTransition`}
                        >
                            Galery
                        </Link>
                        <Link
                            // href={route("promosi")}
                            className={`${
                                route().current() === "promosi"
                                    ? "text-green-500 font-medium"
                                    : "text-gray-500 font-light"
                            } text-xs md:text-sm hover:text-green-500 hover:font-semibold useTransition`}
                        >
                            Promosi
                        </Link>
                        <Link
                            // href={route("katalog-perumahan")}
                            className={`${
                                route().current() === "katalog-perumahan"
                                    ? "text-green-500 font-medium"
                                    : "text-gray-500 font-light"
                            } text-xs md:text-sm hover:text-green-500 hover:font-semibold useTransition`}
                        >
                            Katalog Perumahan
                        </Link>
                    </div>
                </div>
                <div>
                    <h1 className="mb-6 font-bold text-white text-xs md:text-base lg:text-lg useTransition">
                        Photo Galery
                    </h1>
                </div>
            </div>
        </>
    );
}
