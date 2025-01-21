import React from "react";

export default function InputText({ title, errors, ...props }) {
    return (
        <div className="w-full">
            <p className="font-light text-teal-500 capitalize">{title}</p>
            <input {...props} className="form disabled:bg-gray-200" />
            {errors && <p className="text-red-500 text-xs">{errors}</p>}
        </div>
    );
}
