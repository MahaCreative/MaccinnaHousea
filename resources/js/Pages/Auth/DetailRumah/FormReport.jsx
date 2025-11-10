import SelectOption from "@/Components/Form/SelectOption";
import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

export default function FormReport(props) {
    const rumah = props.rumah;
    const tipe = props.tipe;
    const [params, setParams] = useState({
        cari: "",
        tipe: "",
        penjualan: "",
        pembangunan: "",
    });
    const cetakHandler = (e) => {
        router.get(route("auth.laporan-detail-data-rumah"), { ...params });
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
                            value={params.cari}
                            onChange={(e) =>
                                setParams({ ...params, cari: e.target.value })
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
                            Tipe Rumah :
                        </p>
                        <SelectOption
                            value={params.tipe}
                            onChange={(e) =>
                                setParams({ ...params, tipe: e.target.value })
                            }
                        >
                            <option value="">Pilih Tipe</option>
                            {tipe.map((item, key) => (
                                <option key={key} value={item.nama_tipe}>
                                    {item.nama_tipe}
                                </option>
                            ))}
                        </SelectOption>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <p className="text-right w-[200px] text-primary">
                            Status Penjualan :
                        </p>
                        <SelectOption
                            value={params.penjualan}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    penjualan: e.target.value,
                                })
                            }
                        >
                            <option value="">Pilih status penjualan</option>
                            <option value="terjual">Terjual</option>
                            <option value="belum_terjual">Belum Terjual</option>
                        </SelectOption>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <p className="text-right w-[200px] text-primary">
                            Status Pembangunan :
                        </p>
                        <SelectOption
                            value={params.pembangunan}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    pembangunan: e.target.value,
                                })
                            }
                        >
                            <option value="">Pilih status pembangunan</option>
                            <option value="selesai">selesai</option>
                            <option value="proses">proses</option>
                        </SelectOption>
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
                                cari: "",
                                tipe: "",
                                penjualan: "",
                                pembangunan: "",
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
