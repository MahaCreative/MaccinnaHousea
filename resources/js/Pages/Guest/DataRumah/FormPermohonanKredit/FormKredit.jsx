import InputText from "@/Components/Form/InputText";
import ResponseAlert from "@/Hooks/ResponseAlert";
import { useForm, usePage } from "@inertiajs/react";
import { Select } from "@mui/material";
import React, { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

export default function FormKredit({ rumah, setModal }) {
    const { auth } = usePage().props;
    const { showResponse, ResponseMethode } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        rumah_id: rumah.id,
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

        post(route("pengunjung.store-permohonan-kredit"), {
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
            onError: (err) => {
                setModal(false);
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal melakukan permohonan kredit, silahkan periksa kembali isian anda"
                );
                setTimeout(() => {
                    setModal(true);
                }, 3000);
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,
            nama_pemohon: auth.user.nama_lengkap,
            no_hp_pemohon: auth.user.no_hp,
        });
    }, [auth]);
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
                    src={"/storage/" + rumah.foto_rumah}
                    alt=""
                    className="md:w-[240px] w-full md:h-[240px] h-[160px] object-cover rounded-md"
                />
                <div className="">
                    <p className="capitalize text-green-500 tracking-tighter">
                        {rumah.nama_rumah}
                    </p>
                    <p>Tipe Rumah {rumah.tipe.nama_tipe}</p>
                    <p>
                        Harga Rumah
                        <CurrencyInput
                            value={rumah.harga_rumah}
                            disabled
                            prefix="Rp. "
                            className="border-none outline-none h-[20px] w-[150px]"
                        />
                    </p>
                    <div className="flex flex-col  gap-2">
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
