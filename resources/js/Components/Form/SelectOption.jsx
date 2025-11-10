import React from "react";

export default function SelectOption({ children, title, errors, ...props }) {
    return (
        <div className="w-full">
            <p className="font-bold text-primary capitalize">{title}</p>
            <select className="form capitalize" {...props}>
                {children}
            </select>
            {errors && <p className="text-red-500 text-xs">{errors}</p>}
        </div>
    );
}
