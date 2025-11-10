import InputText from "@/Components/Form/InputText";
import SelectOption from "@/Components/Form/SelectOption";
import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

export default function FormReport(props) {
    const petugas = props.petugas;
    const rumah = props.rumah;

    const [params, setParams] = useState({
        rumah: "",
        petugas: "",
        status: "",
        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const cetakHandler = (e) => {
        router.get(route("auth.print-laporan-permohonan-kredit"), {
            ...params,
        });
    };
    return (
        <div className="py-6 px-4 md:px-8 lg:px-16 ">
            <div className="bg-white rounded-md py-3 px-4 drop-shadow-md">
                <h1 className="font-bold text-primary text-lg">
                    Atur Data Laporan
                </h1>
                <div className="py-6">
                    <div className="flex gap-x-3 items-center">
                        <p className="text-right w-[200px] text-primary">
                            Nama Rumah :
                        </p>
                        <SelectOption
                            value={params.rumah}
                            onChange={(e) =>
                                setParams({ ...params, rumah: e.target.value })
                            }
                        >
                            <option value="">Pilih Rumah</option>
                            {rumah.map((item, key) => (
                                <option key={key} value={item.nama_rumah}>
                                    {item.nama_rumah}
                                </option>
                            ))}
                        </SelectOption>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <p className="text-right w-[200px] text-primary">
                            Nama Petugas :
                        </p>
                        <SelectOption
                            value={params.petugas}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    petugas: e.target.value,
                                })
                            }
                        >
                            <option value="">Pilih Petugas</option>
                            {petugas.map((item, key) => (
                                <option key={key} value={item.nama_lengkap}>
                                    {item.nama_lengkap}
                                </option>
                            ))}
                        </SelectOption>
                    </div>

                    <div className="flex gap-x-3 items-center">
                        <p className="text-right w-[200px] text-primary">
                            Status Booking :
                        </p>
                        <SelectOption
                            value={params.status}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    status: e.target.value,
                                })
                            }
                        >
                            <option value="">Pilih status permohonan</option>
                            <option value="baru">baru</option>
                            <option value="follow up">follow up</option>
                            <option value="closing">closing</option>
                            <option value="cancell">cancell</option>
                        </SelectOption>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <p className="text-right w-[200px] text-primary">
                            Dari Tanggal :
                        </p>
                        <input
                            className="w-full"
                            type="date"
                            value={params.dari_tanggal}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    dari_tanggal: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <p className="text-right w-[200px] text-primary">
                            Sampai Tanggal :
                        </p>
                        <input
                            className="w-full"
                            type="date"
                            value={params.sampai_tanggal}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    sampai_tanggal: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-x-3 items-center">
                    <button
                        onClick={cetakHandler}
                        className="py-2 px-3 text-white rounded-md bg-primary"
                    >
                        Cetak Laporan
                    </button>
                    <button
                        onClick={() =>
                            setParams({
                                ...params,
                                rumah: "",
                                petugas: "",
                                status: "",
                                dari_tanggal: "",
                                sampai_tanggal: "",
                            })
                        }
                        className="py-2 px-3 text-white rounded-md bg-red-500"
                    >
                        Cancell
                    </button>
                </div>
            </div>
        </div>
    );
}

FormReport.layout = (page) => (
    <AuthLayout children={page} title={"Form laporan"} />
);
