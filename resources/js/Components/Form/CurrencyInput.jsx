import React from "react";
import CurrencyInput from "react-currency-input-field";

export default function CurrencyInputs({ title, errors, ...props }) {
    return (
        <div className="w-full">
            <p className="font-bold text-primary capitalize">{title}</p>
            <CurrencyInput {...props} className="form" />
            {errors && <p className="text-red-500 text-xs">{errors}</p>}
        </div>
    );
}
