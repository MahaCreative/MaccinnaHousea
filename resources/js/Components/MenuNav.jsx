import { Link } from "@inertiajs/react";
import React from "react";

export default function MenuNav({ active, menu, ...props }) {
    return (
        <Link
            {...props}
            className={`${
                route().current() === active
                    ? "text-green-500 font-medium"
                    : "text-secondary font-light"
            } text-xs md:text-sm hover:text-green-500 hover:font-semibold useTransition`}
        >
            {menu}
        </Link>
    );
}
