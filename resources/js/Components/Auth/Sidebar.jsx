import { Link, usePage } from "@inertiajs/react";
import {
    AttachMoney,
    Close,
    Dashboard,
    Drafts,
    Face,
    Group,
    Home,
    Image,
    ListAltSharp,
    ListAltTwoTone,
    MessageOutlined,
    Money,
    PaymentRounded,
    Print,
    Work,
} from "@mui/icons-material";
import React, { useEffect, useRef } from "react";

export default function Sidebar({ open, setOpen }) {
    const { auth } = usePage().props;
    const sidebarRef = useRef(null);
    useEffect(() => {
        let handler = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <div
            ref={sidebarRef}
            className={`${
                open
                    ? " w-[80%] md:w-[40%] lg:w-[20%] opacity-100"
                    : "w-0 h-screen opacity-45"
            } top-0 left-0 bg-primary min-h-screen fixed overflow-x-hidden useTransition z-[50]`}
        >
            <div className="py-10 px-4">
                <Links name={"Home"}>
                    <Home color="inherit" fontSize="inherit" />
                </Links>
                <Links
                    name={"Dashboard"}
                    href={route("auth.dashboard")}
                    active={route().current() == "auth.dashboard"}
                >
                    <Dashboard color="inherit" fontSize="inherit" />
                </Links>
                <h1 className="font-light text-white">Mater Data</h1>

                {auth.user.role == "super admin" && (
                    <Links
                        href={route("auth.user")}
                        active={route().current() == "auth.user"}
                        name={"User"}
                    >
                        <Group color="inherit" fontSize="inherit" />
                    </Links>
                )}
                <Links
                    href={route("auth.data-rumah")}
                    active={route().current() == "auth.data-rumah"}
                    name={"Katalog Rumah"}
                >
                    <Work color="inherit" fontSize="inherit" />
                </Links>
                <Links
                    href={route("auth.detail-data-rumah")}
                    active={route().current() == "auth.data-rumah"}
                    name={"Daftar Rumah"}
                >
                    <Work color="inherit" fontSize="inherit" />
                </Links>

                {auth.user.role == "admin" && (
                    <>
                        <Links
                            href={route("auth.data-galery")}
                            name="Galery"
                            active={route().current() == "auth.data-galery"}
                            className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1 capitalize"
                        >
                            <Image color="inherit" fontSize="inherit" />
                        </Links>
                        <Links
                            href={route("auth.data-promosi")}
                            active={route().current() == "auth.data-promosi"}
                            name="Promosi"
                            className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1 capitalize"
                        >
                            <ListAltSharp color="inherit" fontSize="inherit" />
                        </Links>
                        <h1 className="font-light text-white">Transaksi</h1>
                        <Links
                            href={route("auth.booking-kunjungan")}
                            active={
                                route().current() == "auth.booking-kunjungan"
                            }
                            name="Booking Kunjungan"
                            className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1 capitalize"
                        >
                            <ListAltTwoTone
                                color="inherit"
                                fontSize="inherit"
                            />
                        </Links>
                        <Links
                            href={route("auth.permohonan-kredit")}
                            active={
                                route().current() == "auth.permohonan-kredit"
                            }
                            name="Permohonan Kredit"
                            className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1 capitalize"
                        >
                            <PaymentRounded
                                color="inherit"
                                fontSize="inherit"
                            />
                        </Links>
                        <Links
                            href={route("auth.penjualan-rumah")}
                            active={route().current() == "auth.penjualan-rumah"}
                            name="Penjualan Rumah"
                            className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1 capitalize"
                        >
                            <MessageOutlined
                                color="inherit"
                                fontSize="inherit"
                            />
                        </Links>
                    </>
                )}

                {auth.user.role == "super admin" && (
                    <>
                        {" "}
                        <h1 className="font-light text-white">Laporan</h1>
                        <Links
                            href={route("auth.cetak-detail-data-rumah")}
                            active={
                                route().current() ==
                                "auth.cetak-detail-data-rumah"
                            }
                            name="Laporan Data Rumah"
                            className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1 capitalize"
                        >
                            <Print color="inherit" fontSize="inherit" />
                        </Links>
                        <Links
                            href={route("auth.form-booking-kunjungan")}
                            active={
                                route().current() ==
                                "auth.form-booking-kunjungan"
                            }
                            name="Laporan Booking Kunjungan"
                            className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1 capitalize"
                        >
                            <Print color="inherit" fontSize="inherit" />
                        </Links>
                        <Links
                            href={route("auth.form-laporan-permohonan-kredit")}
                            active={
                                route().current() ==
                                "auth.form-laporan-permohonan-kredit"
                            }
                            name="Laporan Permohonan Kredit"
                            className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1 capitalize"
                        >
                            <Print color="inherit" fontSize="inherit" />
                        </Links>
                    </>
                )}
            </div>
        </div>
    );
}

function Links({ children, name, active, ...props }) {
    return (
        <Link
            {...props}
            className={`${
                active ? "bg-blue-900" : ""
            } text-white font-light leading-3 flex gap-3 items-center py-3  px-2 rounded-md my-1 hover:bg-blue-800`}
        >
            {children}
            <p>{name}</p>
        </Link>
    );
}
