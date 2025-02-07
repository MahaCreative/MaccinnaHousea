import React from "react";

export default function Card({ bgColor, icon, title, count }) {
    return (
        <div
            className={`py-3 px-4 rounded-md shadow-sm flex gap-4 border  shadow-gray-500/20  justify-between items-center bg-gradient-to-br ${bgColor}`}
        >
            <div className="text-white tracking-tighter leading=3 font-bold text-7xl md:text-2xl lg:text-5xl useTransition ">
                {icon}
            </div>
            <div className="text-right text-white">
                <p className="font-bold text-3xl tracking-tighter">{count}</p>
                <p className="font-light  tracking-tighter text-sm md:text-xl useTransition">
                    {title}
                </p>
            </div>
        </div>
    );
}
