import InputText from "@/Components/Form/InputText";
import ResponseAlert from "@/Hooks/ResponseAlert";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Form({ setModal, rumah_id }) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const { auth } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        rumah_id: rumah_id,
        nama_pengunjung: "",
        nomor_pengunjung: "",
        tanggal_kunjungan: "",
    });
    useEffect(() => {
        setData({
            ...data,
            nama_pengunjung: auth.user.nama_lengkap,
            nomor_pengunjung: auth.user.no_hp,
        });
    }, [auth]);

    const submitHandler = (e) => {
        e.preventDefault();
        setModal(false);
        ResponseMethode(
            "warning",
            "Warning!!!",
            "Apakah data kunjungan yang telah diisi sudah benar?",
            () => {
                post(route("pengunjung.order-kunjungan"), {
                    onSuccess: () => {
                        showResponse(
                            "success",
                            "Sukses",
                            "Permintaan kunjungan berhasil dikirim, Kami akan segera menghubungi anda jika permintaan jadwal kunjungan anda diterima"
                        );
                        reset(
                            "nama_pengunjung",
                            "nomor_pengunjung",
                            "rumah_id",
                            "tanggal_kunjungan"
                        );
                    },
                    onError: () => {
                        showResponse(
                            "error",
                            "Gagal",
                            "Permintaan anda gagal dikirim, silahkan mengecek form isian anda"
                        );
                        setTimeout(() => {
                            setModal(true);
                        }, 1000);
                    },
                });
            },
            () => {}
        );
    };
    const cancellHandler = () => {
        reset("nama_pengunjung", "nomor_pengunjung", "tanggal_kunjungan");
        setModal(false);
    };
    console.log(data);

    return (
        <form onSubmit={submitHandler}>
            <InputText
                name="nama_pengunjung"
                value={data.nama_pengunjung}
                errors={errors.nama_pengunjung}
                title={"Nama Lengkap"}
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
            />
            <InputText
                name="nomor_pengunjung"
                value={data.nomor_pengunjung}
                errors={errors.nomor_pengunjung}
                title={"Nomor Handphone"}
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
            />
            <InputText
                type="date"
                title={"Tanggal Kunjungan"}
                name="tanggal_kunjungan"
                value={data.tanggal_kunjungan}
                errors={errors.tanggal_kunjungan}
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
            />
            <div className="flex gap-3 items-center py-3">
                <button className="text-white font-thin py-1 px-3 rounded-md bg-green-500 hover:bg-green-600 useTransition">
                    Kirim Jadwal Kunjungan
                </button>
                <button
                    onClick={cancellHandler}
                    type="button"
                    className="text-white font-thin py-1 px-3 rounded-md bg-red-500 hover:bg-red-600 useTransition"
                >
                    Cancell
                </button>
            </div>
        </form>
    );
}
