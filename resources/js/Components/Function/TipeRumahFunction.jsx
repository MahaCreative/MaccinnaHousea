import axios from "axios";
import { useState } from "react";

const useTipeActions = () => {
    const [errorsTipe, setErrors] = useState(null);

    // Fungsi untuk submit tipe
    const submitTipe = async (value) => {
        try {
            const response = await axios.post(
                route("api-create-data-tipe"),
                value
            );
            // Tambahkan logika submit
            console.log("Submitting value:", value);
            // Reset errors jika berhasil
            setErrors(null);
        } catch (err) {
            console.error("Error in submitTipe:", err);
            setErrors(err.response.data.message || "An error occurred");
        }
    };

    // Fungsi untuk delete tipe
    const deleteTipe = async (value) => {
        try {
            const response = await axios.post(route("api-delete-data-tipe"), {
                id: value,
            }); // Tambahkan logika delete
            console.log(response.data);
            // Reset errors jika berhasil
            setErrors(null);
        } catch (err) {
            console.error("Error in deleteTipe:", err);
            setErrors(err?.message || "An error occurred");
        }
    };

    return {
        submitTipe,
        deleteTipe,
        errorsTipe, // Expose errors jika ingin digunakan di komponen
    };
};

export default useTipeActions;
