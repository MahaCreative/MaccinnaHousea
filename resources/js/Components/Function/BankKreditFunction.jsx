import axios from "axios";
import React, { useState } from "react";

const useBankKreditAction = () => {
    const [dataBank, setData] = useState([]);
    const [errors, setErrors] = useState([]);

    const getDataBankKredit = async () => {
        try {
            const response = await axios.get(route("api-data-bank-kredit"));
            setData(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const submitBank = async (value) => {
        try {
            const response = await axios.post(
                route("api-create-bank-kredit"),
                value
            );
            setErrors([]);
        } catch (err) {
            console.log(err.message);

            setErrors(err.response.data.message);
        }
    };

    const deleteBank = async (value) => {
        try {
            const response = axios.post(route("api-delete-bank-kredit"), {
                id: value,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return {
        getDataBankKredit,
        submitBank,
        deleteBank,
        dataBank,
        errors,
    };
};

export default useBankKreditAction;
