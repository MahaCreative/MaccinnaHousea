import Card from "@/Components/Card/Card";
import Dialogs from "@/Components/Dialog";
import InputText from "@/Components/Form/InputText";
import TableLayout from "@/Components/Table/TableLayout";
import ResponseAlert from "@/Hooks/ResponseAlert";
import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { router, usePage } from "@inertiajs/react";
import { ErrorTwoTone, List, Search } from "@mui/icons-material";
import { debounce } from "@mui/material";

import React, { useCallback, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import FormKredit from "./FormKredit";
import SelectOption from "@/Components/Form/SelectOption";
import FormPenjualan from "./FormPenjualan";

export default function Index(props) {
    const { showResponse } = ResponseAlert();
    const count = props.count;
    const permohonan = props.permohonan;
    const { auth } = usePage().props;
    const [modalForm, setModalForm] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const [modalBerkas, setModalBerkas] = useState(false);
    const [model, setModel] = useState([]);
    const [modalPenjualan, setModalPenjualan] = useState(false);
    const [berkas, setBerkas] = useState(null);
    const [params, setParams] = useState({
        cari: "",
        status_permohonan: "",
        nama_petugas: "",
        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const [dataPenolakan, setDataPenolakan] = useState({
        idBerkas: "",
        status_berkas: "",
        keterangan: "",
    });
    const showBerkas = (item) => {
        setBerkas(item);
        setModalBerkas(true);
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route("auth.permohonan-kredit"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    const updateHandler = (id, e) => {
        setDataPenolakan({
            ...dataPenolakan,
            idBerkas: id,
            status_berkas: e.target.value,
        });
        if (e.target.value !== "ditolak") {
            router.post(
                route("auth.update-berkas"),
                { idBerkas: id, status_berkas: e.target.value, keterangan: "" },
                {
                    onSuccess: () => {
                        setModalBerkas(false);
                        setBerkas(null);
                        setDataPenolakan({
                            ...dataPenolakan,
                            idBerkas: "",
                            status_berkas: "",
                            keterangan: "",
                        });
                    },
                }
            );
        }
        //
    };
    const updateBerkas = () => {
        router.post(
            route("auth.update-berkas"),
            { ...dataPenolakan },
            {
                onSuccess: () => {
                    setModalBerkas(false);
                    setBerkas(null);
                    setDataPenolakan({
                        ...dataPenolakan,
                        idBerkas: "",
                        status_berkas: "",
                        keterangan: "",
                    });
                },
            }
        );
    };
    const updatePermohonan = (value, item) => {
        if (value == "followup" || value == "cancell" || value == "closing") {
            if (value == "closing") {
                setModalPenjualan(true);
                setModel(item);
                console.log(item);
            }
            router.post(
                route("auth.update-status-permohonan", {
                    status_permohonan: value,
                    id: item.id,
                })
            );
        }
    };
    // useEffect(() => {}, [dataPenolakan]);

    return (
        <div className="px-4 md:px-8 lg:px-16 usetTransition py-7 ">
            {modalPenjualan && (
                <Dialogs
                    maxWidth={1000}
                    open={modalPenjualan}
                    handleClose={() => {
                        setModalPenjualan(false);
                        setModel([]);
                    }}
                >
                    <FormPenjualan
                        model={model}
                        handleClose={() => {
                            setModalPenjualan(false);
                            setModel([]);
                        }}
                    />
                </Dialogs>
            )}
            {auth.user.role == "admin" && (
                <Dialogs
                    maxWidth={1000}
                    open={modalForm}
                    handleClose={() => setModalForm(false)}
                >
                    <FormKredit setModal={() => setModalForm(false)} />
                </Dialogs>
            )}
            <Dialogs
                maxWidth={1000}
                open={modalBerkas}
                handleClose={() => (
                    setModalBerkas(false),
                    setBerkas(null),
                    setDataPenolakan({
                        ...dataPenolakan,
                        idBerkas: "",
                        status_berkas: "",
                        keterangan: "",
                    })
                )}
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
                                                {key++}{" "}
                                                {dataPenolakan.status_berkas}
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
                                                {auth.user.role == "admin" ? (
                                                    <>
                                                        {berkas.status_permohonan ==
                                                        "baru" ? (
                                                            <>
                                                                {item.status_berkas ==
                                                                "menunggu konfirmasi" ? (
                                                                    <select
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateHandler(
                                                                                item.id,
                                                                                e
                                                                            )
                                                                        }
                                                                        name=""
                                                                        id=""
                                                                        className={`${
                                                                            item.status_berkas ==
                                                                            "menunggu konfirmasi"
                                                                                ? "bg-orange-500"
                                                                                : item.status_berkas ==
                                                                                  "diterima"
                                                                                ? "bg-green-500"
                                                                                : "bg-red-500"
                                                                        } text-xs outline-none border-none rounded-md focus:border-none focus:outline-none capitalize text-white`}
                                                                    >
                                                                        <option
                                                                            value={
                                                                                item.status_berkas
                                                                            }
                                                                            className=""
                                                                            disabled
                                                                            selected
                                                                        >
                                                                            {
                                                                                item.status_berkas
                                                                            }
                                                                        </option>
                                                                        {item.status_berkas !==
                                                                            "diterima" && (
                                                                            <option
                                                                                disabled={
                                                                                    item.status_berkas ==
                                                                                    "diterima"
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                value="diterima"
                                                                            >
                                                                                Diterima
                                                                            </option>
                                                                        )}
                                                                        {item.status_berkas !==
                                                                            "ditolak" && (
                                                                            <option
                                                                                disabled={
                                                                                    item.status_berkas ==
                                                                                    "ditolak"
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                value="ditolak"
                                                                            >
                                                                                Ditolak
                                                                            </option>
                                                                        )}
                                                                    </select>
                                                                ) : (
                                                                    item.status_berkas
                                                                )}
                                                            </>
                                                        ) : (
                                                            item.status_berkas
                                                        )}
                                                    </>
                                                ) : (
                                                    item.status_berkas
                                                )}
                                            </TableLayout.Td>
                                            <TableLayout.Td>
                                                {item.tanggal_di_cek}
                                            </TableLayout.Td>
                                            <TableLayout.Td className="w-[70px]">
                                                {item.keterangan}
                                            </TableLayout.Td>
                                        </tr>
                                        {dataPenolakan.status_berkas ==
                                            "ditolak" && (
                                            <tr>
                                                <TableLayout.Td colspan="9">
                                                    <p className="font-light text-sm">
                                                        * Isikan Keterangan
                                                        Penolakan{" "}
                                                    </p>
                                                    <textarea
                                                        onChange={(e) =>
                                                            setDataPenolakan({
                                                                ...dataPenolakan,
                                                                keterangan:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full"
                                                        name=""
                                                        id=""
                                                    ></textarea>
                                                    <button
                                                        onClick={updateBerkas}
                                                        className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white useTransition"
                                                    >
                                                        Submit
                                                    </button>
                                                </TableLayout.Td>
                                            </tr>
                                        )}
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
                    <InputText
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                        title={"Berdasarkan Nama Pengunjung"}
                        placeholder="Cari Nama Pengunjung"
                    />
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
            <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items center">
                        <Card
                            icon={<List color="inherit" fontSize="inherit" />}
                            title={"Permohonan Baru"}
                            count={count.baru}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={<List color="inherit" fontSize="inherit" />}
                            title={"Permohonan Follow Up"}
                            count={count.followup}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={<List color="inherit" fontSize="inherit" />}
                            title={"Permohonan Closing"}
                            count={count.closing}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={<List color="inherit" fontSize="inherit" />}
                            title={"Permohonan Cancell"}
                            count={count.cancell}
                            bgColor={"from-blue-800 to-primary"}
                        />
                    </div>
                </div>
            </div>
            <div className="my-3">
                <h3 className="tracking-tighter font-light text-blue-500 text-2xl">
                    Daftar Permohonan Kredit
                </h3>
                <p className="text-xs">
                    *Note Petugas yang menerima permohonan maka akan bertugas
                    untuk menangani Kredit pelanggan
                </p>
                <TableLayout>
                    <div className="flex justify-between items-center px-4 py-3 gap-3 text-xl">
                        {auth.user.role == "admin" && (
                            <button
                                onClick={() => setModalForm(true)}
                                className="text-sm bg-blue-600 py-2 px-3 rounded-md text-white"
                            >
                                Tambah Permohonan
                            </button>
                        )}
                        <div className="flex items-center gap-x-2 w-1/2 justify-end">
                            <InputText
                                // onChange={(e) =>
                                //     setParams({ ...params, cari: e.target.value })
                                // }
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
                    </div>
                    <TableLayout.Table>
                        <TableLayout.Thead>
                            <tr>
                                <TableLayout.Th>#</TableLayout.Th>
                                <TableLayout.Th>Kode</TableLayout.Th>
                                <TableLayout.Th>
                                    Tanggal Permohonan
                                </TableLayout.Th>
                                <TableLayout.Th>Nama Rumah</TableLayout.Th>
                                <TableLayout.Th>Nama Pemohon</TableLayout.Th>
                                <TableLayout.Th>Nomor Pemohon</TableLayout.Th>
                                <TableLayout.Th>
                                    Status Permohonan
                                </TableLayout.Th>
                                <TableLayout.Th>Status Berkas</TableLayout.Th>
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
                                        <TableLayout.Td className="w-[100px] capitalize text-xs">
                                            <p>{item.kode_permohonan}</p>
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[100px] capitalize text-xs">
                                            <p>{item.tanggal_permohonan}</p>
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[50px] capitalize text-xs">
                                            {item.rumah.nama_rumah}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[150px] capitalize text-xs">
                                            {item.nama_pemohon}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[100px]">
                                            {item.no_hp_pemohon}
                                        </TableLayout.Td>

                                        <TableLayout.Td className="w-[150px] capitalize text-xs">
                                            {auth.user.role == "admin" ? (
                                                item.status_berkas ==
                                                    "diterima" &&
                                                item.status_permohonan !==
                                                    "closing" &&
                                                item.status_permohonan !==
                                                    "cancell" ? (
                                                    <SelectOption
                                                        className={`${
                                                            item.status_permohonan ==
                                                            "baru"
                                                                ? "bg-blue-500"
                                                                : item.status_permohonan ==
                                                                  "followup"
                                                                ? "bg-cyan-500"
                                                                : item.status_permohonan ==
                                                                  "closing"
                                                                ? "bg-green-500"
                                                                : "bg-red-500"
                                                        }`}
                                                        onChange={(e) =>
                                                            updatePermohonan(
                                                                e.target.value,
                                                                item
                                                            )
                                                        }
                                                        value={
                                                            item.status_permohonan
                                                        }
                                                    >
                                                        <option
                                                            className="capitalize"
                                                            value={
                                                                item.status_permohonan
                                                            }
                                                            disabled
                                                            selected
                                                        >
                                                            {
                                                                item.status_permohonan
                                                            }
                                                        </option>
                                                        {/* <option
                                                        disabled
                                                        className="capitalize"
                                                        value=""
                                                    >
                                                        Pilih status permohonan
                                                    </option> */}
                                                        {item.status_permohonan !==
                                                            "followup" && (
                                                            <option
                                                                className="capitalize"
                                                                value="followup"
                                                            >
                                                                Follow Up
                                                            </option>
                                                        )}
                                                        {item.status_permohonan !==
                                                            "closing" && (
                                                            <option
                                                                className="capitalize"
                                                                value="closing"
                                                            >
                                                                Closing
                                                            </option>
                                                        )}
                                                        {item.status_permohonan !==
                                                            "cancell" && (
                                                            <option
                                                                className="capitalize"
                                                                value="cancell"
                                                            >
                                                                cancell
                                                            </option>
                                                        )}
                                                    </SelectOption>
                                                ) : (
                                                    item.status_permohonan
                                                )
                                            ) : (
                                                item.status_permohonan
                                            )}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[150px] capitalize text-xs">
                                            {item.status_berkas}
                                        </TableLayout.Td>

                                        <TableLayout.Td className="w-[150px] capitalize text-xs">
                                            {item.nama_petugas_melayani
                                                ? item.nama_petugas_melayani
                                                : "Belum Diterima Oleh Petugas"}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[150px] capitalize text-xs">
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
        </div>
    );
}
Index.layout = (page) => (
    <AuthLayout children={page} title={"Permohonan Kredit"} />
);
