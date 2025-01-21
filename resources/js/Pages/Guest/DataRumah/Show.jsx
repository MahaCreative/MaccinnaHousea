import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Add,
    Check,
    Close,
    Delete,
    DeleteForever,
    Edit,
    PlusOneSharp,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillCompnent from "@/Components/Form/QuilComponent";
import InputText from "@/Components/Form/InputText";
import CurrencyInputs from "@/Components/Form/CurrencyInput";
import SelectOption from "@/Components/Form/SelectOption";
import CostumSelect from "@/Components/Form/CostumSelect";

import ResponseAlert from "@/Hooks/ResponseAlert";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Show(props) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const rumah = props.rumah;
    console.log("====================================");
    console.log(rumah);
    console.log("====================================");
    const getDataTipe = async () => {
        try {
            const respons = await axios.get(route("api-data-tipe"));
            setDataTipe(respons.data);
        } catch (err) {}
    };

    useEffect(() => {
        getDataTipe();
    }, []);

    return (
        <div className="py-6 px-4 md:px-8 lg:px-16 useTransition">
            <div className="flex flex-col md:flex-row useTranstion gap-3">
                <div className="w-full md:w-1/2 useTransition">
                    <div className="relative w-full h-[352px] rounded-md border border-dashed border-teal-400 p-1 cursor-pointer">
                        <img
                            src={"/storage/" + rumah.foto_rumah}
                            alt=""
                            className="w-full h-[352px] object-cover"
                        />
                    </div>
                    {/* sliderImage */}
                    <div className="flex gap-4 items-center my-4">
                        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-x-1 ">
                            {rumah.foto.length > 0 ? (
                                rumah.foto.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative w-full h-[90px]  flex justify-center items-center "
                                    >
                                        <img
                                            src={"/storage/" + item.foto_rumah}
                                            alt="Picture"
                                            className="w-full h-[90px]  object-cover rounded-md"
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="relative w-full h-[90px]  flex justify-center items-center ">
                                    <img
                                        src={
                                            "/storage/Image/default_image.avif"
                                        }
                                        alt="Picture"
                                        className="w-full h-[90px]  object-cover rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 useTransition">
                    <h3 className="font-bold text-lg text-secondary font-inter">
                        Informasi Perumahan
                    </h3>
                    <div className="flex gap-3 w-full">
                        <InputText
                            disabled
                            value={rumah.nama_rumah}
                            name="nama_rumah"
                            title={"Nama Rumah"}
                        />
                    </div>
                    <div className="flex gap-3 w-full">
                        <CurrencyInputs
                            className="form"
                            disabled
                            title={"Harga Rumah"}
                            value={rumah.harga_rumah}
                            prefix="Rp. "
                        />
                        <InputText
                            value={rumah.blok_rumah}
                            disabled
                            title={"Blok Rumah"}
                        />
                    </div>
                    <div className="flex gap-3">
                        <SelectOption
                            title={"Status Bangunan"}
                            value={rumah.status_bangunan}
                            disabled
                        >
                            <option value="">Pilih Status Bangunan</option>
                            <option value="belum selesai">Belum Selesai</option>
                            <option value="proses pembangunan">
                                Proses Pembangunan
                            </option>
                            <option value="selesai">Selesai</option>
                        </SelectOption>
                        <SelectOption
                            title={"Status Milik"}
                            value={rumah.status_milik}
                            disabled
                        >
                            <option value="">Pilih Status Milik</option>
                            <option value="belum terjual">Belum Terjual</option>
                            <option value="di pesan">Di Pesan</option>
                            <option value="terjual">Terjual</option>
                        </SelectOption>
                    </div>
                    {rumah.status_milik !== "belum terjual" && (
                        <div className="flex gap-3">
                            <InputText
                                value={rumah.nama_pemilik}
                                disabled
                                title={"Nama Pemilik"}
                                type="text"
                            />
                        </div>
                    )}
                    <div className="flex gap-3">
                        <InputText
                            value={rumah.jumlah_kamar}
                            disabled
                            title={"Jumlah Kamar Tidur"}
                            type="number"
                        />
                        <InputText
                            value={rumah.jumlah_kamar_mandi}
                            name="jumlah_kamar_mandi"
                            disabled
                            title={"Jumlah Kamar Mandi"}
                            type="number"
                        />
                        <InputText
                            value={rumah.luas_lahan}
                            disabled
                            title={"Luas Lahan"}
                            type="number"
                        />
                    </div>
                    <div className="flex gap-3">
                        <SelectOption
                            title={"Status Parkiran"}
                            value={rumah.status_parkiran}
                            disabled
                        >
                            <option value="">Pilih Status Parkiran</option>
                            <option value="false">Tidak Ada</option>
                            <option value="true">Ada</option>
                        </SelectOption>
                        <SelectOption
                            title={"Status Dapur"}
                            value={rumah.status_dapur}
                            disabled
                        >
                            <option value="">Pilih Status Dapur</option>
                            <option value="false">Tidak Ada</option>
                            <option value="true">Ada</option>
                        </SelectOption>
                        <CostumSelect
                            placeholder={"Pilih Tipe Rumah"}
                            title="Tipe Rumah"
                            value={rumah.tipe_rumah}
                        >
                            {/* {dataTipe.length > 0 &&
                                dataTipe.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4 items-center tracking-tighter leading-3 my-2"
                                    >
                                        <p>{item.nama_tipe}</p>
                                        <div className="flex gap-2 items-center">
                                            {rumah.tipe_rumah_id == item.id ? (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setData({
                                                            ...data,
                                                            tipe_rumah: "",
                                                            tipe_rumah_id: "",
                                                        })
                                                    }
                                                    className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-red-500 text-center justify-center items-center"
                                                >
                                                    <Tooltip
                                                        title={`Batal Pilih Tipe ${item.nama_tipe}`}
                                                    >
                                                        <Close
                                                            color="inherit"
                                                            fontSize="inherit"
                                                        />
                                                    </Tooltip>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setData({
                                                            ...data,
                                                            tipe_rumah:
                                                                item.nama_tipe,
                                                            tipe_rumah_id:
                                                                item.id,
                                                        })
                                                    }
                                                    className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-teal-500 text-center justify-center items-center"
                                                >
                                                    <Tooltip
                                                        title={`Pilih Tipe ${item.nama_tipe}`}
                                                    >
                                                        <Check
                                                            color="inherit"
                                                            fontSize="inherit"
                                                        />
                                                    </Tooltip>
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteTipeRumah(item.id)
                                                }
                                                className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-red-500 text-center justify-center items-center"
                                            >
                                                <Tooltip
                                                    title={`Hapus Tipe ${item.nama_tipe}`}
                                                >
                                                    <DeleteForever
                                                        color="inherit"
                                                        fontSize="inherit"
                                                    />
                                                </Tooltip>
                                            </button>
                                        </div>
                                    </div>
                                ))} */}
                            <div className="flex gap-2 items-center">
                                <InputText placeholder="Masukkan Tipe Rumah" />
                                <button className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-teal-500 text-center justify-center items-center">
                                    <Tooltip title={`Tambahkan Tipe Rumah`}>
                                        <Check
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </Tooltip>
                                </button>
                            </div>
                        </CostumSelect>
                    </div>
                </div>
            </div>

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Bank Kredit
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Harga Rumah
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Uang Muka
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Harga Cicilan
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Jumlah Cicilan
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rumah.harga_kredit.length > 0 &&
                        rumah.harga_kredit.map((item, key) => (
                            <tr
                                key={key}
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <CostumSelect
                                        disabled
                                        value={item.bank.nama_bank}
                                        placeholder="Pilih data bank"
                                    ></CostumSelect>
                                </th>
                                <td class="px-6 py-4">
                                    <CurrencyInputs
                                        prefix="Rp. "
                                        disabled
                                        value={item.harga_bangunan}
                                    />
                                </td>
                                <td class="px-6 py-4">
                                    <CurrencyInputs
                                        disabled
                                        prefix="Rp. "
                                        value={item.uang_muka}
                                    />
                                </td>
                                <td class="px-6 py-4">
                                    <CurrencyInputs
                                        disabled
                                        prefix="Rp. "
                                        value={item.harga_cicilan}
                                    />
                                </td>
                                <td class="px-6 py-4">
                                    <InputText
                                        disabled
                                        value={item.jumlah_cicilan}
                                        type="number"
                                    />
                                </td>
                                <td class="px-6 py-4">
                                    <CurrencyInputs
                                        disabled
                                        prefix="Rp. "
                                        value={
                                            item.jumlah_cicilan *
                                            item.harga_cicilan
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div>
                <QuillCompnent
                    className="form-control"
                    value={rumah.keterangan}
                    onChange={(e) => setData({ ...data, keterangan: e })}
                />
            </div>
            <div className="fixed bottom-0 w-full justify-center flex  left-0 ">
                <button className="form bg-teal-500 text-white">
                    Upload Data Perumahan
                </button>
            </div>
        </div>
    );
}

Show.layout = (page) => (
    <GuestLayout
        children={page}
        title={"Buat Katalog Rumah"}
        prevRoute={
            <Link
                href=""
                className="text-teal-500  text-lg useTransition hover:text-teal-700"
            >
                Data Rumah
            </Link>
        }
    />
);
