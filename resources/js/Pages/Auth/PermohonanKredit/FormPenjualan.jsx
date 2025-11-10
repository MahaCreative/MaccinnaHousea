import CurrencyInputs from "@/Components/Form/CurrencyInput";
import InputText from "@/Components/Form/InputText";
import SelectOption from "@/Components/Form/SelectOption";
import ResponseAlert from "@/Hooks/ResponseAlert";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function FormPenjualan({ handleClose, model }) {
    const { showResponse } = ResponseAlert();
    const [rumah, setRumah] = useState([]);
    const [tipe, setTipe] = useState([]);
    const [detailRumah, setDetailRumah] = useState([]);
    const [hargaKredit, sethargaKredit] = useState([]);
    const { data, setData, post, reset, errors } = useForm({
        tipe_rumah_id: "",
        rumah_id: "",
        detail_rumah_id: "",
        harga_kredit_id: "",
        uang_muka: "0",
        tenor_bulan: "0 Bulan",
        cicilan_per_bulan: "0",
        nik: "",
        nama: "",
        no_hp: "",
    });
    const getTipe = async () => {
        try {
            const response = await axios.get(route("api-get-data-tipe"));
            setTipe(response.data);
        } catch (err) {
            alert(err);
            setTipe([]);
        }
    };
    const getDataRumah = async () => {
        try {
            const response = await axios.get(route("api-data-rumah"));
            setRumah(response.data);
        } catch (err) {
            alert(err);
            setRumah([]);
        }
    };
    const getDetailRumah = async () => {
        try {
            const response = await axios.get(route("api-get-detail-rumah"));
            setDetailRumah(response.data);
        } catch (err) {
            alert(err);
            setDetailRumah([]);
        }
    };
    const getHargaKredit = async () => {
        try {
            const response = await axios.get(route("api-get-harga-kredit"));
            sethargaKredit(response.data);
        } catch (err) {
            alert("gagal mendapatkan harga kredit" + err);
            sethargaKredit([]);
        }
    };
    useEffect(() => {
        setData({
            ...data,
            tipe_rumah_id: model ? model.rumah.tipe_rumah_id : "",
            rumah_id: model ? model.rumah_id : "",
            nik: model ? model.pengunjung.nik : "",
            nama: model ? model.nama_pemohon : "",
            no_hp: model ? model.no_hp_pemohon : "",
        });
    }, [model]);
    useEffect(() => {
        getTipe();
        getDataRumah();
        getDetailRumah();
        getHargaKredit();
    }, []);
    const changeKredit = (value) => {
        const valueId = value;
        const getDataKredit = hargaKredit.filter((item) => item.id == value);
        console.log(getDataKredit.length);

        setData({
            ...data,
            harga_kredit_id: valueId,
            uang_muka:
                getDataKredit.length > 0 ? getDataKredit[0].uang_muka : 0,
            cicilan_per_bulan:
                getDataKredit.length > 0 ? getDataKredit[0].harga_cicilan : 0,
            tenor_bulan:
                getDataKredit.length > 0
                    ? getDataKredit[0].jumlah_cicilan + " Bulan"
                    : 0 + " Bulan",
        });
    };
    const submitHandler = () => {
        post(route("auth.store-penjualan-rumah"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "berhasil menambahkan data penjualan baru"
                );
                handleClose();
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal menambahkan data penjualan baru"
                );
            },
        });
    };
    return (
        <div className="w-[800px]">
            <div className="w-full gap-3 flex items-center">
                <SelectOption
                    title={"Pilih Tipe Rumah"}
                    value={data.tipe_rumah_id}
                    errors={errors.tipe_rumah_id}
                    onChange={(e) =>
                        setData({ ...data, tipe_rumah_id: e.target.value })
                    }
                >
                    <option value="">Pilih Tipe Rumah</option>
                    {tipe.map((item, key) => (
                        <option key={key} value={item.id}>
                            {item.nama_tipe}
                        </option>
                    ))}
                </SelectOption>
                <SelectOption
                    title={"Pilih Rumah"}
                    value={data.rumah_id}
                    errors={errors.rumah_id}
                    onChange={(e) =>
                        setData({ ...data, rumah_id: e.target.value })
                    }
                >
                    <option value="">Pilih Rumah</option>
                    {rumah.map(
                        (item, key) =>
                            (item.tipe_rumah_id == data.tipe_rumah_id ||
                                data.tipe_rumah_id == "") && (
                                <option key={key} value={item.id}>
                                    {item.nama_rumah}
                                </option>
                            )
                    )}
                </SelectOption>
                <SelectOption
                    title={"Pilih Blok Rumah"}
                    value={data.detail_rumah_id}
                    errors={errors.detail_rumah_id}
                    onChange={(e) =>
                        setData({ ...data, detail_rumah_id: e.target.value })
                    }
                >
                    <option value="">Pilih Blok Rumah</option>
                    {detailRumah.map(
                        (item, key) =>
                            (item.rumah_id == data.rumah_id ||
                                data.detail_rumah_id == "") && (
                                <option key={key} value={item.id}>
                                    {item.blok_rumah}
                                </option>
                            )
                    )}
                </SelectOption>
            </div>
            <div className="flex gap-x-3 items-center">
                {data.rumah_id && (
                    <SelectOption
                        title={"Pilih Cicilan"}
                        value={data.harga_kredit_id}
                        errors={errors.harga_kredit_id}
                        onChange={(e) => changeKredit(e.target.value)}
                    >
                        <option value="">Pilih Cicilan Yang Tersedia</option>
                        {hargaKredit.map(
                            (item, key) =>
                                (item.rumah_id == data.rumah_id ||
                                    data.harga_kredit_id == "") && (
                                    <option key={key} value={item.id}>
                                        {item.bank.nama_bank}
                                    </option>
                                )
                        )}
                    </SelectOption>
                )}
            </div>
            <div className="w-full">
                <div className="flex flex-col md:flex-row gap-2 w-full">
                    <InputText
                        title={"NIK Pembeli"}
                        value={data.nik}
                        errors={errors.nik}
                        onChange={(e) =>
                            setData({ ...data, nik: e.target.value })
                        }
                    />
                    <InputText
                        title={"Nama Pembeli"}
                        value={data.nama}
                        errors={errors.nama}
                        onChange={(e) =>
                            setData({ ...data, nama: e.target.value })
                        }
                    />
                    <InputText
                        title={"Telp / HP"}
                        value={data.no_hp}
                        errors={errors.no_hp}
                        onChange={(e) =>
                            setData({ ...data, no_hp: e.target.value })
                        }
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-2 w-full items-center">
                    <CurrencyInputs
                        title={"Uang Muka"}
                        value={data.uang_muka}
                        disabled
                    />
                    <CurrencyInputs
                        title={"Cicilan / Bulan"}
                        value={data.cicilan_per_bulan}
                        disabled
                    />
                    <InputText
                        className={"w-full"}
                        title={"Tenor (BULAN)"}
                        value={data.tenor_bulan}
                        disabled
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <button
                    onClick={() => submitHandler()}
                    className="py-2 px-3 text-white rounded-md bg-blue-500 hover:bg-blue-800"
                >
                    Simpan Penjualan
                </button>
                <button
                    onClick={() => {
                        handleClose();
                        reset();
                    }}
                    className="py-2 px-3 text-white rounded-md bg-red-500 hover:bg-red-800"
                >
                    Cancell
                </button>
            </div>
        </div>
    );
}
