import { ArrowForwardIos } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

export default function CostumColapse({ title, message }) {
    const colapseRef = useRef();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        let handler = (e) => {
            if (colapseRef.current && !colapseRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    return (
        <div className="px-4">
            <div
                ref={colapseRef}
                onClick={() => setOpen(true)}
                className="flex gap-4 items-center hover:cursor-pointer hover:text-green-300 text-white useTransition my-3"
            >
                <p
                    className={`${
                        open ? "rotate-90" : ""
                    } useTransition text-base md:text-xl lg:text-2xl leading-3 font-light`}
                >
                    <ArrowForwardIos color="inherit" fontSize="inherit" />
                </p>
                <p className="text-base md:text-xl lg:text-2xl leading-3 font-light">
                    {title}
                </p>
            </div>
            <div
                className={`${
                    open
                        ? "  py-4 my-2 border-t border-white"
                        : "h-0 overflow-hidden py-0 my-0 "
                } text-sm md:text-base lg:text-lg font-thin tracking-tighter italic text-white useTransition   `}
            >
                <p>{message}</p>
            </div>
        </div>
    );
}
