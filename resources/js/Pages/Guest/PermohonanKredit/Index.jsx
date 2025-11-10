import Dialogs from "@/Components/Dialog";
import InputText from "@/Components/Form/InputText";
import TableLayout from "@/Components/Table/TableLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { router, useForm } from "@inertiajs/react";
import { Search } from "@mui/icons-material";
import { debounce } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function Index(props) {
    const permohonan = props.permohonan;
    const [modalForm, setModalForm] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const [params, setParams] = useState({
        cari: "",
        status_permohonan: "",
        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("pengunjung.history-permohonan-kredit"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    const { data, setData, post, reset, errors } = useForm({
        id: "",
        ktp_pemohon: "",
        ktp_pasangan: "",
        kartu_keluarga: "",
        rekening_koran: "",
        slip_gaji: "",
    });
    useEffect(() => reload(params), [params]);
    const [modalBerkas, setModalBerkas] = useState(false);
    const [berkas, setBerkas] = useState();
    const showBerkas = (item) => {
        setBerkas(item);
        setModalBerkas(true);
        setData({ ...data, id: item.id });
    };
    const updateBerkas = () => {
        post(route("pengunjung.create-berkas"));
    };
    return (
        <div className="px-4 md:px-8 lg:px-16 py-16">
            <Dialogs
                maxWidth={1000}
                open={modalForm}
                handleClose={() => setModalForm(false)}
            >
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
                            setData({
                                ...data,
                                kartu_keluarga: e.target.files[0],
                            })
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
                            setData({
                                ...data,
                                ktp_pasangan: e.target.files[0],
                            })
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
                            setData({
                                ...data,
                                rekening_koran: e.target.files[0],
                            })
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
                <button
                    onClick={updateBerkas}
                    className="py-3 px-3 bg-green-500 text-white rounded-md my-3"
                >
                    Perbaharui Berkas
                </button>
            </Dialogs>
            <Dialogs
                maxWidth={1000}
                open={modalBerkas}
                handleClose={() => (setModalBerkas(false), setBerkas(null))}
            >
                {berkas && (
                    <div>
                        <div className="py-4 flex md:flex-row flex-col gap-x-3">
                            <img
                                src={"/storage/" + berkas.rumah.foto_rumah}
                                alt=""
                                className="md:w-[240px] w-full md:h-[160px] h-[160px] object-cover rounded-md"
                            />
                            <div className="">
                                <p className="capitalize text-green-500 tracking-tighter">
                                    Kode Permohonan : {berkas.kode_permohonan}
                                </p>
                                <p className="capitalize text-sm font-light tracking-tighter">
                                    {berkas.rumah.nama_rumah}
                                </p>
                                <p className="text-sm font-light">
                                    Tipe Rumah {berkas.rumah.tipe.nama_tipe}
                                </p>
                                <p className="text-sm font-light">
                                    Harga Rumah
                                    <CurrencyInput
                                        value={berkas.rumah.harga_rumah}
                                        disabled
                                        prefix="Rp. "
                                        className="border-none outline-none h-[20px] w-[150px]"
                                    />
                                </p>
                                <p className="text-sm font-light">
                                    Tanggal Permohonan :{" "}
                                    {berkas.tanggal_permohonan}
                                </p>
                                <p className="text-sm font-light">
                                    Nama Pemohon : {berkas.nama_pemohon}
                                </p>
                                <p className="text-sm font-light">
                                    Nomor Pemohon: {berkas.no_hp_pemohon}
                                </p>
                                <div className="flex flex-col  gap-2"></div>
                            </div>
                        </div>
                        <h3 className="font-light text-green-500">
                            Informasi Berkas
                        </h3>
                        <TableLayout>
                            <button
                                className="py-2 px-4 rounded-md bg-blue-500 text-white my-2"
                                onClick={() => {
                                    setModalForm(true);
                                    setModalBerkas(false);
                                }}
                            >
                                Tambah
                            </button>
                            <TableLayout.Thead>
                                <TableLayout.Th className={"w-[10px]"}>
                                    #
                                </TableLayout.Th>
                                <TableLayout.Th className={"w-[40px]"}>
                                    KTP Pemohon
                                </TableLayout.Th>
                                <TableLayout.Th className={"w-[40px]"}>
                                    KTP Pasangan
                                </TableLayout.Th>
                                <TableLayout.Th className={"w-[40px]"}>
                                    Kartu Keluarga
                                </TableLayout.Th>
                                <TableLayout.Th className={"w-[40px]"}>
                                    Rekening Koran
                                </TableLayout.Th>
                                <TableLayout.Th className={"w-[40px]"}>
                                    Slip Gaji
                                </TableLayout.Th>
                                <TableLayout.Th className={"w-[40px]"}>
                                    Status Berkas
                                </TableLayout.Th>
                                <TableLayout.Th className={"w-[40px]"}>
                                    Tanggal Dicek
                                </TableLayout.Th>
                                <TableLayout.Th className={"w-[40px]"}>
                                    Keterangan
                                </TableLayout.Th>
                            </TableLayout.Thead>
                            <tbody>
                                {berkas.berkas.map((item, key) => (
                                    <>
                                        <tr key={key}>
                                            <TableLayout.Td>
                                                {key++}
                                            </TableLayout.Td>
                                            <TableLayout.Td className="w-[40px]">
                                                <a
                                                    href={
                                                        "/storage/" +
                                                        item.ktp_pemohon
                                                    }
                                                >
                                                    <img
                                                        className="w-[40px]"
                                                        src={
                                                            "/storage/" +
                                                            item.ktp_pemohon
                                                        }
                                                        alt=""
                                                    />
                                                </a>
                                            </TableLayout.Td>
                                            <TableLayout.Td className="w-[40px]">
                                                <a
                                                    href={
                                                        "/storage/" +
                                                        item.ktp_pasangan
                                                    }
                                                >
                                                    <img
                                                        className="w-[40px]"
                                                        src={
                                                            "/storage/" +
                                                            item.ktp_pasangan
                                                        }
                                                        alt=""
                                                    />
                                                </a>
                                            </TableLayout.Td>
                                            <TableLayout.Td className="w-[40px]">
                                                <a
                                                    href={
                                                        "/storage/" +
                                                        item.kartu_keluarga
                                                    }
                                                >
                                                    <img
                                                        className="w-[40px]"
                                                        src={
                                                            "/storage/" +
                                                            item.kartu_keluarga
                                                        }
                                                        alt=""
                                                    />
                                                </a>
                                            </TableLayout.Td>
                                            <TableLayout.Td>
                                                <a
                                                    className="text-xs tracking-tighter text-blue-400 font-light leading-3"
                                                    href={
                                                        "/storage/" +
                                                        item.rekening_koran
                                                    }
                                                >
                                                    Download Rekening Koran
                                                </a>
                                            </TableLayout.Td>
                                            <TableLayout.Td className="w-[40px]">
                                                <a
                                                    href={
                                                        "/storage/" +
                                                        item.slip_gaji
                                                    }
                                                >
                                                    <img
                                                        className="w-[40px]"
                                                        src={
                                                            "/storage/" +
                                                            item.slip_gaji
                                                        }
                                                        alt=""
                                                    />
                                                </a>
                                            </TableLayout.Td>
                                            <TableLayout.Td>
                                                {item.status_berkas}
                                            </TableLayout.Td>
                                            <TableLayout.Td>
                                                {item.tanggal_di_cek}
                                            </TableLayout.Td>
                                            <TableLayout.Td className="w-[70px]">
                                                {item.keterangan}
                                            </TableLayout.Td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </TableLayout>
                    </div>
                )}
            </Dialogs>
            <Dialogs
                open={modalFilter}
                handleClose={() => setModalFilter(false)}
            >
                <div className="flex flex-col gap-2">
                    <select
                        onChange={(e) =>
                            setParams({
                                ...params,
                                status_permohonan: e.target.value,
                            })
                        }
                        defaultValue={""}
                        className="w-full"
                    >
                        <option value="">Pilih status Permohonan</option>
                        <option value="menunggu konfirmasi">
                            Menunggu Konfirmasi
                        </option>
                        <option value="diterima">Diterima</option>
                        <option value="selesai">Selesai</option>
                    </select>

                    <div className="flex gap-3">
                        <InputText
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    dari_tanggal: e.target.value,
                                })
                            }
                            type="date"
                            title={"Dari Tanggal"}
                        />
                        <InputText
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    sampai_tanggal: e.target.value,
                                })
                            }
                            type="date"
                            title={"Sampai Tanggal"}
                        />
                    </div>
                </div>
            </Dialogs>
            <div className="flex flex-col items-center justify-center gap-1">
                <h3 className="tex-4xl font-semibold text-green-500">
                    Permohonan Kredit
                </h3>
                <p className="text-xs font-light italic text-secondary">
                    Daftar Permintaan Kredit Anda
                </p>
            </div>
            <TableLayout>
                <div className="flex justify-end items-center px-4 py-3 gap-3 text-xl">
                    <InputText
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                        placeholder="Cari"
                        className="w-1/6"
                    />
                    <button
                        onClick={() => setModalFilter(true)}
                        className="bg-gray-500 py-4 px-4 rounded-md text-white"
                    >
                        <Search color="inherit" fontSize="inherit" />
                    </button>
                </div>
                <TableLayout.Table>
                    <TableLayout.Thead>
                        <tr>
                            <TableLayout.Th>#</TableLayout.Th>
                            <TableLayout.Th>Kode / Tanggal</TableLayout.Th>
                            <TableLayout.Th>Nama Rumah</TableLayout.Th>
                            <TableLayout.Th>Nama Pemohon</TableLayout.Th>
                            <TableLayout.Th>Nomor Pemohon</TableLayout.Th>
                            <TableLayout.Th>Status Permohonan</TableLayout.Th>
                            <TableLayout.Th>Nama Petugas</TableLayout.Th>
                            <TableLayout.Th>Nomor Petugas</TableLayout.Th>
                            <TableLayout.Th>Aksi</TableLayout.Th>
                        </tr>
                    </TableLayout.Thead>
                    <tbody>
                        {permohonan.map((item, key) => (
                            <>
                                <tr key={key}>
                                    <TableLayout.Td className="w-[10px]">
                                        {key++}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[100px] capitalize">
                                        <p>{item.kode_permohonan}</p>
                                        <p>{item.tanggal_permohonan}</p>
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[50px] capitalize">
                                        {item.rumah.nama_rumah}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[150px] capitalize">
                                        {item.nama_pemohon}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[100px]">
                                        {item.no_hp_pemohon}
                                    </TableLayout.Td>

                                    <TableLayout.Td className="w-[150px] capitalize">
                                        {item.status_permohonan}
                                    </TableLayout.Td>

                                    <TableLayout.Td className="w-[150px] capitalize">
                                        {item.nama_petugas_melayani
                                            ? item.nama_petugas_melayani
                                            : "Belum Diterima Oleh Petugas"}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[150px]">
                                        {item.no_hp_petugas
                                            ? item.no_hp_petugas
                                            : "Belum Diterima Oleh Petugas"}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[150px]">
                                        <button
                                            onClick={() => showBerkas(item)}
                                            className="text-xs text-white tracking-tighter bg-blue-500 hover:bg-blue-600 useTransition rounded-md py-1.5 px-2"
                                        >
                                            Lihat Berkas
                                        </button>
                                    </TableLayout.Td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </TableLayout.Table>
            </TableLayout>
        </div>
    );
}

Index.layout = (page) => (
    <GuestLayout children={page} judul={"History Booking Kunjungan"} />
);
