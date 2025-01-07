import React from "react";

export default function SelectOption({ children, title, errors, ...props }) {
    return (
        <div className="w-full">
            <p className="font-light text-teal-500 capitalize">{title}</p>
            <select className="form" {...props}>
                {children}
            </select>
            {errors && <p className="text-red-500 text-xs">{errors}</p>}
        </div>
    );
}
