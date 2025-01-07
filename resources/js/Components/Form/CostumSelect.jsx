import React, { useEffect, useRef, useState } from "react";

export default function CostumSelect({
    children,
    placeholder,
    title,
    errors,
    value,
    ...props
}) {
    const dropdownRef = useRef();
    const [open, setOpen] = useState(false);
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setOpen(false);
        }
    };

    useEffect(() => {
        // Tambahkan event listener saat komponen dipasang
        document.addEventListener("mousedown", handleClickOutside);

        // Bersihkan event listener saat komponen dilepas
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div
            onClick={() => setOpen(true)}
            ref={dropdownRef}
            className="w-full relative "
        >
            <p className="font-light text-teal-500 capitalize">{title}</p>
            <div className="form relative py-2 px-2  useTransition">
                <p>{value ? value : placeholder}</p>
                <div
                    className={`${
                        open
                            ? "max-h-[400px] border opacity-100 overflow-y-auto"
                            : "max-h-0 opacity-0 overflow-hidden"
                    } useTransition absolute top-12 left-0 w-full border-teal-500 rounded-md bg-white  p-2 z-[30] `}
                >
                    {children}
                </div>
            </div>
            {errors && <p className="text-red-500 text-xs">{errors}</p>}
        </div>
    );
}
