import InputText from "@/Components/Form/InputText";
import ResponseAlert from "@/Hooks/ResponseAlert";
import { Link, useForm } from "@inertiajs/react";
import {
    Bathtub,
    CheckCircle,
    Delete,
    Edit,
    Hotel,
    Kitchen,
    LocalParking,
    RemoveRedEye,
    SquareFoot,
} from "@mui/icons-material";
import { Select, Tooltip } from "@mui/material";
import axios, { Cancel } from "axios";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function FormKredit({ setModal }) {
    const [dataRumah, setDataRumah] = useState([]);
    const [rumah, setRumah] = useState([]);
    const { showResponse, ResponseMethode } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        rumah_id: "",
        nama_pemohon: "",
        no_hp_pemohon: "",
        ktp_pemohon: "",
        ktp_pasangan: "",
        kartu_keluarga: "",
        rekening_koran: "",
        slip_gaji: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();

        if (rumah.id == null) {
            showResponse(
                "error",
                "Error",
                "Pilih rumah terlebih dahulu sebelum pengajuan"
            );
        } else {
            post(route("auth.create-permohonan-kredit"), {
                onSuccess: () => {
                    showResponse(
                        "success",
                        "Sukses",
                        "berhasil mengajukan permohonan kredit"
                    );
                    reset(
                        "kartu_keluarga",
                        "ktp_pasangan",
                        "ktp_pemohon",
                        "nama_pemohon",
                        "no_hp_pemohon",
                        "rekening_koran",
                        "slip_gaji"
                    );
                    setModal(false);
                },
            });
        }
    };

    const getDataRumah = async () => {
        try {
            const response = await axios.get(route("api-data-rumah"));
            setDataRumah(response.data);
        } catch (err) {
            alert(err);
        }
    };
    useEffect(() => {
        getDataRumah();
    }, []);
    return (
        <form onSubmit={submitHandler} className="w-full py-3 px-4">
            <div className="py-4">
                <p className="text-green-500 font-medium tracking-tighter text-xl">
                    Form Permohonan Pengajuan Kredit Rumah
                </p>
                <p className="text-xs font-light">
                    Untuk melakukan permohonan kredit rumah, silahkan memasukkan
                    berkas permohonan pada form dibawah ini, Kami akan melakukan
                    pengecekan berkas terlebih dahulu, kemudian menghubungi anda
                    jika permohonan anda di terima ataupun ditolak
                </p>
            </div>
            <div className="py-4 flex md:flex-row flex-col gap-x-3">
                <img
                    src={
                        rumah.foto_rumah
                            ? "/storage/" + rumah.foto_rumah
                            : "/storage/Image/default_image.avif"
                    }
                    alt=""
                    className="md:w-[240px] w-full md:h-[240px] h-[160px] object-cover rounded-md"
                />
                <div className="w-full md:w-1/2 ">
                    <p className="capitalize text-green-500 tracking-tighter">
                        {rumah.nama_rumah}
                    </p>
                    <p>Tipe Rumah {rumah.tipe?.nama_tipe}</p>
                    <p>
                        Harga Rumah
                        <CurrencyInput
                            value={rumah.harga_rumah}
                            disabled
                            prefix="Rp. "
                            className="border-none outline-none h-[20px] w-[150px]"
                        />
                    </p>
                    <div className="flex flex-col  gap-4">
                        <InputText
                            value={data.nama_pemohon}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    nama_pemohon: e.target.value,
                                })
                            }
                            errors={errors.nama_pemohon}
                            title={"Nama Lengkap Pemohon"}
                        />
                        <InputText
                            value={data.no_hp_pemohon}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    no_hp_pemohon: e.target.value,
                                })
                            }
                            errors={errors.no_hp_pemohon}
                            title={"Nomor Handphone Pemohon"}
                        />
                    </div>
                </div>
                <div className="max-h-[250px] overflow-y-auto w-[48%]">
                    <p className="text-green-500 font-medium tracking-tighter text-xl">
                        Pilih rumah
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {dataRumah.length > 0 &&
                            dataRumah.map((item, key) => (
                                <div
                                    onClick={() => {
                                        setRumah(item);
                                        setData({ ...data, rumah_id: item.id });
                                    }}
                                    className={`${
                                        rumah.id === item.id
                                            ? "bg-blue-100"
                                            : ""
                                    } hover hover:scale-105 py-2 px-3 rounded-md drop-shadow-md bg-white hover:bg-blue-100`}
                                >
                                    <div className="w-full h-[100px]">
                                        <img
                                            src={"/storage/" + item.foto_rumah}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-sm font-bold">
                                        {item.nama_rumah}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className=" flex flex-row gap-x-3">
                <InputText
                    className={"w-full"}
                    type="file"
                    title={"KTP Pemohon"}
                    onChange={(e) =>
                        setData({ ...data, ktp_pemohon: e.target.files[0] })
                    }
                    errors={errors.ktp_pemohon}
                />

                <InputText
                    className={"w-full"}
                    type="file"
                    title="Kartu Keluarga"
                    onChange={(e) =>
                        setData({ ...data, kartu_keluarga: e.target.files[0] })
                    }
                    errors={errors.kartu_keluarga}
                />
            </div>
            <div>
                <InputText
                    className={"w-full"}
                    type="file"
                    title={"KTP Pasangan"}
                    onChange={(e) =>
                        setData({ ...data, ktp_pasangan: e.target.files[0] })
                    }
                    errors={errors.ktp_pasangan}
                />
                <p className="text-xs italic">
                    Jika anda telah menikah, silahkan mengisikan foto KTP
                    Pasangan anda
                </p>
            </div>
            <div className=" flex flex-row gap-x-3">
                <InputText
                    className={"w-full"}
                    type="file"
                    title={"Rekening Koran (PDF)"}
                    onChange={(e) =>
                        setData({ ...data, rekening_koran: e.target.files[0] })
                    }
                    errors={errors.rekening_koran}
                />

                <InputText
                    className={"w-full"}
                    type="file"
                    title="Slip Gaji"
                    onChange={(e) =>
                        setData({ ...data, slip_gaji: e.target.files[0] })
                    }
                    errors={errors.slip_gaji}
                />
            </div>
            <button className="py-3 text-white bg-green-500 rounded-md my-3 w-full">
                Ajukan Permohonan
            </button>
        </form>
    );
}
