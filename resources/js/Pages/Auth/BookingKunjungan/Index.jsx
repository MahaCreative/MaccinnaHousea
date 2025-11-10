import Card from "@/Components/Card/Card";
import Dialogs from "@/Components/Dialog";
import InputText from "@/Components/Form/InputText";
import TableLayout from "@/Components/Table/TableLayout";
import ResponseAlert from "@/Hooks/ResponseAlert";
import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { router, usePage } from "@inertiajs/react";
import { Filter, List, Search } from "@mui/icons-material";
import { debounce, Select } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

export default function Index(props) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const { auth } = usePage().props;
    const count = props.count;
    const booking = props.booking;
    const [modalFilter, setModalFilter] = useState(false);
    const [params, setParams] = useState({
        cari: "",
        status_booking: "",
        nama_petugas: "",
        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("auth.booking-kunjungan"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    const updateHandler = (id, e) => {
        ResponseMethode(
            "warning",
            "Warning!!!",
            "Yakin ingin memperbaharui status booking kunjungan?",
            () => {
                router.post(
                    route("auth.update-booking-kunjungan"),
                    {
                        id: id,
                        status_booking: e.target.value,
                    },
                    {
                        onSuccess: () => {
                            showResponse(
                                "success",
                                "Sukses",
                                "Berhasil memperbaharui status booking kunjungan"
                            );
                        },
                    }
                );
            }
        );
    };
    return (
        <div className="px-4 md:px-8 lg:px-16 usetTransition py-7 ">
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
                                status_booking: e.target.value,
                            })
                        }
                        defaultValue={""}
                        className="w-full"
                    >
                        <option value="">Pilih status Booking</option>
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 items center">
                        <Card
                            icon={<List color="inherit" fontSize="inherit" />}
                            title={"Menunggu Konfirmasi"}
                            count={count.menunggu_konfirmasi}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={<List color="inherit" fontSize="inherit" />}
                            title={"Permohonan Diterima"}
                            count={count.diterima}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={<List color="inherit" fontSize="inherit" />}
                            title={"Selesai"}
                            count={count.selesai}
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
                    <div className="flex justify-end items-center px-4 py-3 gap-3 text-xl">
                        <div className="flex gap-x-3 items-center w-full justify-end">
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
                    </div>
                    <TableLayout.Table>
                        <TableLayout.Thead>
                            <tr>
                                <TableLayout.Th>#</TableLayout.Th>
                                <TableLayout.Th>Nama Rumah</TableLayout.Th>
                                <TableLayout.Th>Nama Pengunjung</TableLayout.Th>
                                <TableLayout.Th>
                                    Nomor Pengunjung
                                </TableLayout.Th>
                                <TableLayout.Th>
                                    Tanggal Kunjungan
                                </TableLayout.Th>
                                <TableLayout.Th>Rating</TableLayout.Th>
                                <TableLayout.Th>Status Booking</TableLayout.Th>
                                <TableLayout.Th>Nama Petugas</TableLayout.Th>
                                <TableLayout.Th>Nomor Petugas</TableLayout.Th>
                            </tr>
                        </TableLayout.Thead>
                        <tbody>
                            {booking.map((item, key) => (
                                <tr key={key}>
                                    <TableLayout.Td className="w-[20px]">
                                        {key++}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[170px] capitalize">
                                        {item.rumah.nama_rumah}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[170px] capitalize">
                                        {item.nama_pengunjung}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[170px] capitalize">
                                        {item.tanggal_kunjungan}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[170px] capitalize">
                                        {item.rating
                                            ? item.rating
                                            : "Belum di nilai"}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[170px]">
                                        {item.nomor_pengunjung}
                                    </TableLayout.Td>
                                    {item.petugas_id == auth.user.id ||
                                    item.petugas_id == null ? (
                                        <>
                                            {item.status_booking ==
                                            "selesai" ? (
                                                <TableLayout.Td className="w-[200px] capitalize">
                                                    {item.status_booking}
                                                </TableLayout.Td>
                                            ) : (
                                                <TableLayout.Td className="w-[200px]">
                                                    <select
                                                        placeholder={
                                                            item.status_booking
                                                        }
                                                        onChange={(e) =>
                                                            updateHandler(
                                                                item.id,
                                                                e
                                                            )
                                                        }
                                                        name=""
                                                        id=""
                                                        className={`${
                                                            item.status_booking ==
                                                            "menunggu konfirmasi"
                                                                ? "bg-orange-500"
                                                                : item.status_booking ==
                                                                  "selesai"
                                                                ? "bg-green-500"
                                                                : "bg-blue-500"
                                                        } text-xs outline-none border-none rounded-md focus:border-none focus:outline-none capitalize text-white`}
                                                    >
                                                        <option
                                                            value=""
                                                            className=""
                                                        >
                                                            {
                                                                item.status_booking
                                                            }
                                                        </option>
                                                        {item.status_booking !==
                                                            "diterima" && (
                                                            <option
                                                                disabled={
                                                                    item.status_booking ==
                                                                    "diterima"
                                                                        ? true
                                                                        : false
                                                                }
                                                                value="diterima"
                                                            >
                                                                Diterima
                                                            </option>
                                                        )}
                                                        {item.status_booking !==
                                                            "selesai" && (
                                                            <option
                                                                disabled={
                                                                    item.status_booking ==
                                                                    "selesai"
                                                                        ? true
                                                                        : false
                                                                }
                                                                value="selesai"
                                                            >
                                                                Selesai
                                                            </option>
                                                        )}
                                                    </select>
                                                </TableLayout.Td>
                                            )}
                                        </>
                                    ) : (
                                        <TableLayout.Td className="w-[200px] capitalize">
                                            {item.status_booking}
                                        </TableLayout.Td>
                                    )}
                                    <TableLayout.Td className="w-[200px] capitalize">
                                        {item.petugas
                                            ? item.petugas.nama_lengkap
                                            : "Belum Diterima Oleh Petugas"}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[200px]">
                                        {item.petugas
                                            ? item.petugas.no_hp
                                            : "Belum Diterima Oleh Petugas"}
                                    </TableLayout.Td>
                                </tr>
                            ))}
                        </tbody>
                    </TableLayout.Table>
                </TableLayout>
            </div>
        </div>
    );
}
Index.layout = (page) => (
    <AuthLayout children={page} title={"Booking Kunjungan"} />
);
