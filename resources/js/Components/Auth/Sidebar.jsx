import { Link } from "@inertiajs/react";
import {
    AttachMoney,
    Close,
    Dashboard,
    Drafts,
    Face,
    Group,
    Home,
    Image,
    Money,
    Work,
} from "@mui/icons-material";
import React from "react";

export default function Sidebar({ open, setOpen }) {
    return (
        <div
            className={`${
                open
                    ? " w-[80%] md:w-[40%] lg:w-[20%] opacity-100"
                    : "w-0 h-screen opacity-45"
            } top-0 left-0 bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-950 min-h-screen fixed overflow-x-hidden useTransition z-[50]`}
        >
            <button
                onClick={() => setOpen(false)}
                className="text-white hover:text-slate-400 useTransition text-xl leading-4"
            >
                <Close color="inherit" fontSize="inherit" />
            </button>
            <div className="py-10 px-4">
                <Links name={"home"}>
                    <Home color="inherit" fontSize="inherit" />
                </Links>
                <Links
                    name={"Dashboard"}
                    active={route().current() == "dashboard"}
                >
                    <Dashboard color="inherit" fontSize="inherit" />
                </Links>
                <h1 className="font-light text-white">Mater Data</h1>
                <Links name={"User"}>
                    <Group color="inherit" fontSize="inherit" />
                </Links>
                <Links
                    href={route("auth.data-rumah")}
                    active={route().current() == "auth.data-rumah"}
                    name={"Katalog Rumah"}
                >
                    <Work color="inherit" fontSize="inherit" />
                </Links>

                <Links
                    name="Galery"
                    className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1"
                >
                    <Image color="inherit" fontSize="inherit" />
                </Links>
                <Links
                    name="Promosi"
                    className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1"
                >
                    <Drafts color="inherit" fontSize="inherit" />
                </Links>
                <h1 className="font-light text-white">Transaksi</h1>
                <Links
                    name="Booking Kunjungan"
                    className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1"
                >
                    <Image color="inherit" fontSize="inherit" />
                </Links>
                <Links
                    name="Permohonan Kredit"
                    className="text-white font-light leading-3 flex gap-3 items-center py-3 px-2 rounded-md my-1"
                >
                    <Image color="inherit" fontSize="inherit" />
                </Links>
            </div>
        </div>
    );
}

function Links({ children, name, active, ...props }) {
    return (
        <Link
            {...props}
            className={`${
                active ? "bg-slate-900" : ""
            } text-white font-light leading-3 flex gap-3 items-center py-3  px-2 rounded-md my-1 hover:bg-slate-900`}
        >
            {children}
            <p>{name}</p>
        </Link>
    );
}
