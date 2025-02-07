import Sidebar from "@/Components/Auth/Sidebar";
import { Head, Link } from "@inertiajs/react";
import { Widgets } from "@mui/icons-material";
import React, { useState } from "react";

export default function AuthLayout({ children, title, prevRoute, ...props }) {
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <div className="relative">
            {/* navbar */}
            <Head title={title} />
            <div className="flex justify-between items-center bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-950">
                <div className="flex gap-x-4 items-center px-3 py-2">
                    <button
                        onClick={() => setOpenSidebar(true)}
                        className="text-white hover:text-slate-400 useTransition text-xl leading-4"
                    >
                        <Widgets color="inherit" fontSize="inherit" />
                    </button>
                    <p className="font-inter text-white font-bold leading-4">
                        Macinna House
                    </p>
                </div>
                {/* profile */}
                <div></div>
            </div>
            {/* sidebar */}
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="py-5">
                <div className="flex gap-3 items-center px-4 md:px-8 lg:px-16">
                    <Link
                        href={route("dashboard")}
                        className="text-lg text-teal-500"
                    >
                        Dashboard
                    </Link>
                    <p>/</p>
                    {prevRoute && (
                        <>
                            {prevRoute}
                            <p>/</p>
                        </>
                    )}
                    <Link
                        href=""
                        className="text-teal-600  text-lg cursor-default"
                    >
                        {title}
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
