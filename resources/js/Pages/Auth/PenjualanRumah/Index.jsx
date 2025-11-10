import Card from "@/Components/Card/Card";
import Dialogs from "@/Components/Dialog";
import InputText from "@/Components/Form/InputText";
import TableLayout from "@/Components/Table/TableLayout";
import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { List, Search } from "@mui/icons-material";

import React, { useState } from "react";
import Form from "./Form";
import { usePage } from "@inertiajs/react";
import { formatRupiah } from "@/Hooks/FormatRupiah";

export default function Index(props) {
    const { auth } = usePage().props;
    const penjualan = props.penjualan;
    const [modalForm, setModalForm] = useState(false);
    const [model, setModel] = useState([]);
    return (
        <div className="px-4 md:px-8 lg:px-16 usetTransition py-7 ">
            <Dialogs
                maxWidth={1000}
                title={model ? "Update Data Penjualan" : "Buat Penjualan Baru"}
                open={modalForm}
                handleClose={() => {
                    setModel([]);
                    setModalForm(false);
                }}
            >
                <Form
                    handleClose={() => {
                        setModel([]);
                        setModalForm(false);
                    }}
                />
            </Dialogs>
            <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items center">
                        <Card
                            icon={<List color="inherit" fontSize="inherit" />}
                            title={"Penjualan Hari Ini"}
                            count={0}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={<List color="inherit" fontSize="inherit" />}
                            title={"Penjualan Bulan Ini"}
                            count={0}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={<List color="inherit" fontSize="inherit" />}
                            title={"Penjualan Tahun Ini"}
                            count={0}
                            bgColor={"from-blue-800 to-primary"}
                        />
                    </div>
                </div>
            </div>
            <div className="my-3">
                <h3 className="tracking-tighter font-light text-blue-500 text-2xl">
                    Daftar Permohonan Kunjungan
                </h3>
                <p className="text-xs">
                    *Note Petugas yang menerima permohonan maka akan bertugas
                    untuk menangani kunjungan pelanggan
                </p>
                <TableLayout>
                    <div className="flex items-center  justify-end my-3">
                        <InputText
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    cari: e.target.value,
                                })
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
                                <TableLayout.Th className={"text-xs"}>
                                    #
                                </TableLayout.Th>
                                <TableLayout.Th className={"text-xs"}>
                                    NIK
                                </TableLayout.Th>
                                <TableLayout.Th className={"text-xs"}>
                                    Nama Pembeli
                                </TableLayout.Th>

                                <TableLayout.Th className={"text-xs"}>
                                    Nama Rumah / Tipe
                                </TableLayout.Th>

                                <TableLayout.Th className={"text-xs"}>
                                    Informasi KPR
                                </TableLayout.Th>

                                <TableLayout.Th className={"text-xs"}>
                                    Tanggal Penjualan
                                </TableLayout.Th>
                                <TableLayout.Th className={"text-xs"}>
                                    Nama Petufgas
                                </TableLayout.Th>
                            </tr>
                        </TableLayout.Thead>
                        <tbody>
                            {penjualan.length > 0 ? (
                                penjualan.map((item, key) => (
                                    <tr key={key}>
                                        <TableLayout.Td className="w-[20px]">
                                            {key + 1}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="text-nowrap">
                                            {item.nik}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="text-nowrap">
                                            <p>{item.nama_pemilik}</p>
                                        </TableLayout.Td>
                                        <TableLayout.Td className=" capitalize text-nowrap">
                                            <p className="w-full">
                                                {"Nama Rumah: " +
                                                    item.detail.rumah
                                                        .nama_rumah}
                                            </p>
                                            <p>
                                                {"Tipe Rumah: " +
                                                    item.tipe.nama_tipe}
                                            </p>
                                        </TableLayout.Td>
                                        <TableLayout.Td className="text-nowrap capitalize">
                                            <p>
                                                {"Cicilan : " +
                                                    formatRupiah(
                                                        item.cicilan_per_bulan
                                                    ) +
                                                    " / Bulan"}
                                            </p>
                                            <p>
                                                {"Uang Muka : " +
                                                    formatRupiah(
                                                        item.uang_muka
                                                    ) +
                                                    " / Bulan"}
                                            </p>
                                            <p>
                                                {"Tenor : " +
                                                    item.tenor_bulan +
                                                    " Bulan"}
                                            </p>
                                        </TableLayout.Td>
                                        <TableLayout.Td className="text-nowrap">
                                            {item.tanggal_transaksi}
                                        </TableLayout.Td>

                                        <TableLayout.Td className="w-[200px] capitalize">
                                            {item.petugas
                                                ? item.petugas.nama_lengkap
                                                : "Belum Diterima Oleh Petugas"}
                                        </TableLayout.Td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <TableLayout.Td
                                        colspan={7}
                                        className="text-center"
                                    >
                                        Belum ada penjualan yang ditambahkan
                                    </TableLayout.Td>
                                </tr>
                            )}
                        </tbody>
                    </TableLayout.Table>
                </TableLayout>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayout children={page} title={"Data Penjualan Rumah"} />
);
