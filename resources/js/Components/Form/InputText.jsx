import { TextField } from "@mui/material";
import React from "react";

export default function InputText({
    title,
    errors,
    className,
    classNameInput,
    ...props
}) {
    return (
        <div className={`${className}`}>
            <p className=" text-primary font-bold capitalize">{title}</p>
            <TextField
                variant="filled"
                {...props}
                className={` form disabled:bg-gray-200 ${classNameInput}`}
            />
            {errors && <p className="text-red-500 text-xs">{errors}</p>}
        </div>
    );
}
