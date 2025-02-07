import { TextField } from "@mui/material";
import React from "react";

export default function InputText({ title, errors, className, ...props }) {
    return (
        <div className={`${className}`}>
            <p className="font-light text-green-500 capitalize">{title}</p>
            <TextField
                variant="filled"
                {...props}
                className={` form disabled:bg-gray-200`}
            />
            {errors && <p className="text-red-500 text-xs">{errors}</p>}
        </div>
    );
}
