import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
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
import useTipeActions from "@/Components/Function/TipeRumahFunction";

import FormKredit from "./FormKredit";
import ResponseAlert from "@/Hooks/ResponseAlert";

export default function Form({ rumah }) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        id: "",
        tipe_rumah_id: "",
        tipe_rumah: "",
        kd_rumah: "",
        nama_rumah: "",
        harga_rumah: "",
        blok_rumah: "",
        status_bangunan: "",
        status_milik: "",
        nama_pemilik: "",
        jumlah_kamar: "",
        jumlah_kamar_mandi: "",
        luas_lahan: "",
        status_parkiran: "",
        status_dapur: "",
        keterangan: "",
        thumbnail: "",
        foto_rumah: "",
        harga_kredit_id: [],
        nama_bank: [],

        bank_kredit_id: [],

        harga_bangunan: [],

        uang_muka: [],
        harga_cicilan: [],

        jumlah_cicilan: [],
    });
    // hooks data tipe rumah
    const { submitTipe, deleteTipe, errorsTipe } = useTipeActions();

    const [formTipe, setFormTipe] = useState({
        nama_tipe: "",
    });

    const [dataTipe, setDataTipe] = useState([]);
    const [previewImage, setPreviewImage] = useState([]);
    const [thumbnailPreview, setThumbnailPrefiew] = useState(null);
    const imageRef = useRef([]);
    const thumbnailRef = useRef(null);

    const changeHandleImage = (e) => {
        const dataImage = data.foto_rumah;
        const file = Array.from(e.target.files);
        dataImage.push(...file);
        setData({ ...data, foto_rumah: dataImage });
        let arrPreview = [...previewImage];
        const newPreview = file.map((item) => URL.createObjectURL(item));
        arrPreview.push(...newPreview);
        setPreviewImage(arrPreview);
    };
    const removeImage = (index) => {
        const dataImage = data.foto_rumah;
        dataImage.splice(index, 1);
        setData({ ...data, foto_rumah: dataImage });
        let arrPreview = [...previewImage];
        arrPreview.splice(index, 1);
        setPreviewImage(arrPreview);
    };
    const gantiThumbnail = () => {
        thumbnailRef.current.click();
    };
    const gantiThumbnailHandler = (e) => {
        const file = e.target.files[0];
        const thumbPreview = URL.createObjectURL(file);
        setThumbnailPrefiew(thumbPreview);
        setData({ ...data, thumbnail: file });
    };

    const getDataTipe = async () => {
        try {
            const respons = await axios.get(route("api-data-tipe"));
            setDataTipe(respons.data);
        } catch (err) {}
    };

    useEffect(() => {
        getDataTipe();
        setPreviewImage(
            rumah.foto.map((item, key) => "/storage/" + item.foto_rumah)
        );
        setData({
            ...data,
            id: rumah.id,
            tipe_rumah_id: rumah.tipe.id,
            tipe_rumah: rumah.tipe.nama_tipe,
            kd_rumah: "",
            nama_rumah: rumah.nama_rumah,
            harga_rumah: rumah.harga_rumah,
            blok_rumah: rumah.blok_rumah,
            status_bangunan: rumah.status_bangunan,
            status_milik: rumah.status_milik,
            nama_pemilik: rumah.nama_pemilik,
            jumlah_kamar: rumah.jumlah_kamar,
            jumlah_kamar_mandi: rumah.jumlah_kamar_mandi,
            luas_lahan: rumah.luas_lahan,
            status_parkiran: rumah.status_parkiran,
            status_dapur: rumah.status_dapur,
            keterangan: rumah.keterangan,
            thumbnail: rumah.foto_rumah, //Foto Rumah Utama
            foto_rumah: rumah.foto, //Untuk Banyak Foto Rumah
            harga_kredit_id: rumah.harga_kredit.map((item, key) => item.id),
            nama_bank: rumah.harga_kredit.map(
                (item, key) => item.bank.nama_bank
            ),

            bank_kredit_id: rumah.harga_kredit.map(
                (item, key) => item.bank_kredit_id
            ),

            harga_bangunan: rumah.harga_kredit.map(
                (item, key) => item.harga_bangunan
            ),

            uang_muka: rumah.harga_kredit.map((item, key) => item.uang_muka),
            harga_cicilan: rumah.harga_kredit.map(
                (item, key) => item.harga_cicilan
            ),

            jumlah_cicilan: rumah.harga_kredit.map(
                (item, key) => item.jumlah_cicilan
            ),
        });
    }, []);

    const submitTipeRumah = async () => {
        await submitTipe(formTipe);
        getDataTipe();
    };
    const deleteTipeRumah = async (id) => {
        await deleteTipe(id);
        getDataTipe();
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        ResponseMethode(
            "warning",
            "Submit",
            "Apakah data yang anda masukkan sudah benar dan lengkap?",
            () => {
                if (
                    data.bank_kredit_id[0] == undefined ||
                    data.harga_bangunan[0] == undefined ||
                    data.uang_muka[0] == undefined ||
                    data.harga_cicilan[0] == undefined ||
                    data.jumlah_cicilan[0] == undefined
                ) {
                    showResponse(
                        "error",
                        "Errors",
                        "Gagal menambahkan data perumahan, silahkan lengkapi data kredit dengan benar"
                    );
                } else {
                    post(route("auth.update-data-rumah"), {
                        preserveScroll: true,

                        onSuccess: () => {
                            reset(
                                "tipe_rumah_id",
                                "tipe_rumah",
                                "kd_rumah",
                                "nama_rumah",
                                "harga_rumah",
                                "blok_rumah",
                                "status_bangunan",
                                "status_milik",
                                "nama_pemilik",
                                "jumlah_kamar",
                                "jumlah_kamar_mandi",
                                "luas_lahan",
                                "status_parkiran",
                                "status_dapur",
                                "keterangan",
                                "thumbnail",
                                "foto_rumah",
                                "nama_bank",
                                "bank_kredit_id",
                                "harga_bangunan",
                                "uang_muka",
                                "harga_cicilan",
                                "jumlah_cicilan"
                            );
                            setPreviewImage([]);
                            setThumbnailPrefiew(null);
                        },
                        onError: (err) => {
                            showResponse(
                                "error",
                                "Errors!!!",
                                "Gagal menambahkan data, silahkan periksa kembali isian yang anda masukkan!"
                            );
                        },
                    });
                }
            },
            () => {}
        );
    };

    return (
        <form
            onSubmit={submitHandler}
            className="py-6 px-4 md:px-8 lg:px-16 useTransition"
        >
            <div className="flex flex-col md:flex-row useTranstion gap-3">
                <div className="w-full md:w-1/2 useTransition">
                    <div className="relative w-full h-[352px] rounded-md border border-dashed border-teal-400 p-1 cursor-pointer">
                        <input
                            type="file"
                            ref={thumbnailRef}
                            className="hidden"
                            onChange={gantiThumbnailHandler}
                        />
                        <img
                            src={
                                thumbnailPreview
                                    ? thumbnailPreview
                                    : "/storage/" + data.thumbnail
                            }
                            alt=""
                            className="w-full h-[352px] object-cover"
                        />
                        <button
                            type="button"
                            onClick={gantiThumbnail}
                            className="absolute top-2 left-2 px-3 p-1.5 inline bg-teal-500 rounded-md text-white"
                        >
                            Ganti Thumbnail
                        </button>
                        {errors.thumbnail && (
                            <p className="mb-4 absolute bottom-0 left-0 w-[70%] text-xs bg-red-500 text-white mx-4 rounded-md p-2">
                                {errors.thumbnail}
                            </p>
                        )}
                    </div>
                    {/* sliderImage */}
                    <div className="flex gap-4 items-center my-4">
                        <input
                            type="file"
                            multiple
                            ref={imageRef}
                            className="hidden"
                            onChange={(e) => changeHandleImage(e)}
                        />
                        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-x-1 ">
                            {previewImage.length > 0 ? (
                                previewImage.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative w-full h-[90px]  flex justify-center items-center "
                                    >
                                        <div className="flex gap-3 absolute top-2 right-2 w-full h-full">
                                            <Tooltip title="Delete">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="bg-red-500 p-1 inline h-6 rounded-md text-white font-light hover:bg-red-600 useTransition tracking-tighter leading-3"
                                                >
                                                    <Delete
                                                        color="inherit"
                                                        fontSize="inherit"
                                                    />
                                                </button>
                                            </Tooltip>
                                        </div>
                                        <img
                                            src={item}
                                            alt="Picture"
                                            className="w-full h-[90px]  object-cover rounded-md"
                                        />
                                        {errors && (
                                            <p className="text-red-500 text-xs">
                                                {errors["foto_rumah." + index]}
                                            </p>
                                        )}
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
                            <div className="w-full h-full flex items-center">
                                <button
                                    type="button"
                                    onClick={() => imageRef.current.click()}
                                    className="w-full h-[90px] text-4xl font-bold tracking-tighter leading-3 text-white hover:bg-teal-700 bg-teal-500 useTransition rounded-md"
                                >
                                    <Add color="inherit" fontSize="inherit" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 useTransition">
                    <h3 className="font-bold text-lg text-secondary font-inter">
                        Informasi Perumahan
                    </h3>
                    <div className="flex gap-3 w-full">
                        <InputText
                            value={data.nama_rumah}
                            name="nama_rumah"
                            errors={errors.nama_rumah}
                            onChange={(e) =>
                                setData({ ...data, nama_rumah: e.target.value })
                            }
                            title={"Nama Rumah"}
                        />
                    </div>
                    <div className="flex gap-3 w-full">
                        <CurrencyInputs
                            className="form"
                            title={"Harga Rumah"}
                            value={data.harga_rumah}
                            name="harga_rumah"
                            errors={errors.harga_rumah}
                            prefix="Rp. "
                            onValueChange={(value, name, values) =>
                                setData({ ...data, harga_rumah: value })
                            }
                        />
                        <InputText
                            value={data.blok_rumah}
                            name="blok_rumah"
                            errors={errors.blok_rumah}
                            onChange={(e) =>
                                setData({ ...data, blok_rumah: e.target.value })
                            }
                            title={"Blok Rumah"}
                        />
                    </div>
                    <div className="flex gap-3">
                        <SelectOption
                            title={"Status Bangunan"}
                            value={data.status_bangunan}
                            name="status_bangunan"
                            errors={errors.status_bangunan}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    status_bangunan: e.target.value,
                                })
                            }
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
                            value={data.status_milik}
                            name="status_milik"
                            errors={errors.status_milik}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    status_milik: e.target.value,
                                })
                            }
                        >
                            <option value="">Pilih Status Milik</option>
                            <option value="belum terjual">Belum Terjual</option>
                            <option value="di pesan">Di Pesan</option>
                            <option value="terjual">Terjual</option>
                        </SelectOption>
                    </div>
                    {data.status_milik !== "belum terjual" && (
                        <div className="flex gap-3">
                            <InputText
                                value={data.nama_pemilik}
                                name="nama_pemilik"
                                errors={errors.nama_pemilik}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        nama_pemilik: e.target.value,
                                    })
                                }
                                title={"Nama Pemilik"}
                                type="text"
                            />
                        </div>
                    )}
                    <div className="flex gap-3">
                        <InputText
                            value={data.jumlah_kamar}
                            name="jumlah_kamar"
                            errors={errors.jumlah_kamar}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    jumlah_kamar: e.target.value,
                                })
                            }
                            title={"Jumlah Kamar Tidur"}
                            type="number"
                        />
                        <InputText
                            value={data.jumlah_kamar_mandi}
                            name="jumlah_kamar_mandi"
                            errors={errors.jumlah_kamar_mandi}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    jumlah_kamar_mandi: e.target.value,
                                })
                            }
                            title={"Jumlah Kamar Mandi"}
                            type="number"
                        />
                        <InputText
                            value={data.luas_lahan}
                            name="luas_lahan"
                            errors={errors.luas_lahan}
                            onChange={(e) =>
                                setData({ ...data, luas_lahan: e.target.value })
                            }
                            title={"Luas Lahan"}
                            type="number"
                        />
                    </div>
                    <div className="flex gap-3">
                        <SelectOption
                            title={"Status Parkiran"}
                            value={data.status_parkiran}
                            name="status_parkiran"
                            errors={errors.status_parkiran}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    status_parkiran: e.target.value,
                                })
                            }
                        >
                            <option value="">Pilih Status Parkiran</option>
                            <option value="false">Tidak Ada</option>
                            <option value="true">Ada</option>
                        </SelectOption>
                        <SelectOption
                            title={"Status Dapur"}
                            value={data.status_dapur}
                            name="status_dapur"
                            errors={errors.status_dapur}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    status_dapur: e.target.value,
                                })
                            }
                        >
                            <option value="">Pilih Status Dapur</option>
                            <option value="false">Tidak Ada</option>
                            <option value="true">Ada</option>
                        </SelectOption>
                        <CostumSelect
                            errors={errors.tipe_rumah_id}
                            placeholder={"Pilih Tipe Rumah"}
                            title="Tipe Rumah"
                            value={data.tipe_rumah}
                        >
                            {dataTipe.length > 0 &&
                                dataTipe.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4 items-center tracking-tighter leading-3 my-2"
                                    >
                                        <p>{item.nama_tipe}</p>
                                        <div className="flex gap-2 items-center">
                                            {data.tipe_rumah_id == item.id ? (
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
                                ))}
                            <div className="flex gap-2 items-center">
                                <InputText
                                    errors={errorsTipe}
                                    onChange={(e) =>
                                        setFormTipe({
                                            ...formTipe,
                                            nama_tipe: e.target.value,
                                        })
                                    }
                                    placeholder="Masukkan Tipe Rumah"
                                />
                                <button
                                    onClick={submitTipeRumah}
                                    className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-teal-500 text-center justify-center items-center"
                                >
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
                <FormKredit setForm={setData} form={data} errors={errors} />
            </table>
            <div>
                <QuillCompnent
                    className="form-control"
                    value={data.keterangan}
                    onChange={(e) => setData({ ...data, keterangan: e })}
                />
            </div>
            <div className="fixed bottom-0 w-full justify-center flex  left-0 ">
                <button className="form bg-teal-500 text-white">
                    Update Data Perumahan
                </button>
            </div>
        </form>
    );
}

Form.layout = (page) => (
    <AuthLayout
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
