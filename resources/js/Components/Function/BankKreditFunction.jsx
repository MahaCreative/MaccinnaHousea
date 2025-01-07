import React, { useState } from "react";

const useBankKreditAction = () => {
    const [dataBank, setData] = useState([]);

    const getDataBankKredit = async () => {
        try {
            const response = await axios.get(route("api-data-bank-kredit"));
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return {
        getDataBankKredit,
        dataBank,
    };
};

export default useBankKreditAction;
