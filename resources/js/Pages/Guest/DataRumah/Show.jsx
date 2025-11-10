import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { Link, router, useForm, usePage } from "@inertiajs/react";
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
import { Dialog, Tooltip } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillCompnent from "@/Components/Form/QuilComponent";
import InputText from "@/Components/Form/InputText";
import CurrencyInputs from "@/Components/Form/CurrencyInput";
import SelectOption from "@/Components/Form/SelectOption";
import CostumSelect from "@/Components/Form/CostumSelect";

import ResponseAlert from "@/Hooks/ResponseAlert";
import GuestLayout from "@/Layouts/GuestLayout";
import Dialogs from "@/Components/Dialog";
import Form from "./FormKunjungan/Form";
import FormKredit from "./FormPermohonanKredit/FormKredit";

export default function Show(props) {
    const { showResponse, ResponseMethode } = ResponseAlert();

    const { auth } = usePage().props;
    const rumah = props.rumah;
    const [showImage, setShowImage] = useState(false);
    const [image, setImage] = useState(null);
    const [modalKunjungan, setModalKunjungan] = useState(false);
    const [modalOrder, setModalOrder] = useState(false);
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
            <Dialog open={modalOrder} onClose={() => setModalOrder(false)}>
                <FormKredit setModal={setModalOrder} rumah={rumah} />
            </Dialog>
            <Dialog
                open={showImage}
                onClose={() => {
                    setShowImage(false);
                    setImage(null);
                }}
            >
                <img src={"/storage/" + image} alt="" />
            </Dialog>
            <Dialogs
                title={"Atur Jadwal Kunjungan"}
                open={modalKunjungan}
                handleClose={() => setModalKunjungan(false)}
            >
                <p>
                    Untuk mengatur jadwal kunjungan, silahkan masukkan Informasi
                    Tanggal Kunjungan dan Nomor HP Anda. Kami akan segera
                    menghubungi anda jika permintaan kunjungan anda telah
                    disetujui oleh admin
                </p>
                <Form setModal={setModalKunjungan} rumah_id={rumah.id} />
            </Dialogs>
            <div className="flex flex-col md:flex-row useTranstion gap-3">
                <div className="w-full md:w-1/2 useTransition">
                    <div
                        onClick={() => {
                            setShowImage(true);
                            setImage(rumah.foto_rumah);
                        }}
                        className="relative w-full h-[352px] rounded-md border border-dashed border-teal-400 p-1 cursor-pointer"
                    >
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
                                        onClick={() => {
                                            setShowImage(true);
                                            setImage(item.foto_rumah);
                                        }}
                                        key={index}
                                        className="relative w-full h-[90px]  flex justify-center items-center hover:cursor-pointer"
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
                            className={"w-full"}
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
                    </div>

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
                        <InputText
                            disabled
                            title={"Status Parkiran"}
                            value={
                                rumah.status_parkiran == "true"
                                    ? "Ada"
                                    : "Tidak Ada"
                            }
                        />
                        <InputText
                            disabled
                            title={"Status Dapur"}
                            value={
                                rumah.status_dapur == "true"
                                    ? "Ada"
                                    : "Tidak Ada"
                            }
                        />
                        <InputText
                            disabled
                            title={"Tipe Rumah"}
                            value={rumah.tipe.nama_tipe}
                        />
                    </div>
                    {auth.user?.role == "pengunjung" && (
                        <div className="flex justify-between items-center gap-3">
                            <button
                                onClick={() => setModalKunjungan(true)}
                                className="w-full py-2 px-3 mt-3 rounded-md bg-blue-500 hover:bg-blue-600 useTransition text-white"
                            >
                                Atur Jadwal Kunjungan
                            </button>
                            <button
                                onClick={() => setModalOrder(true)}
                                className="w-full py-2 px-3 mt-3 rounded-md bg-green-500 hover:bg-green-600 useTransition text-white"
                            >
                                Order Now
                            </button>
                        </div>
                    )}
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
                                    {item.bank.nama_bank}
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
            <div className="py-3 px-4 rounded-md shadow-sm shadow-gray-500/50">
                <p dangerouslySetInnerHTML={{ __html: rumah.keterangan }} />
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
