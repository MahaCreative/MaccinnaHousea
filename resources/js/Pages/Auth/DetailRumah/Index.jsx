import Card from "@/Components/Card/Card";
import InputText from "@/Components/Form/InputText";
import SelectOption from "@/Components/Form/SelectOption";
import TableLayout from "@/Components/Table/TableLayout";
import { formatRupiah } from "@/Hooks/FormatRupiah";
import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { router, usePage } from "@inertiajs/react";
import { Build, Done, Pending, PictureInPicture } from "@mui/icons-material";
import { debounce } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function Index(props) {
    const count = props.count;
    const tipe = props.tipe;
    const detail = props.detail;
    const { auth } = usePage().props;
    const [params, setParams] = useState({
        cari: "",
        tipe: "",
        penjualan: "",
        pembangunan: "",
    });

    const reload = useCallback(
        debounce((query) => {
            router.get(route("auth.detail-data-rumah"), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 500), // ⬅️ delay 500ms
        []
    );
    const changeStatus = (value, id) => {
        router.post(route("auth.update-detail-data-rumah"), {
            id: id,
            status_pembangunan: value,
        });
    };
    useEffect(() => reload(params), [params]);
    return (
        <div className="px-4 md:px-8 lg:px-16 usetTransition py-7 ">
            <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                    <div className="grid grid-cols-2 gap-3 items center">
                        <Card
                            icon={<Done color="inherit" fontSize="inherit" />}
                            title={"Jumlah Rumah Terjual"}
                            count={count.terjual}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={
                                <Pending color="inherit" fontSize="inherit" />
                            }
                            title={"Total Rumah Belum Terjual"}
                            count={count.belum_terjual}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={<Build color="inherit" fontSize="inherit" />}
                            title={"Jumlah Pembangunana Proses"}
                            count={count.proses}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={<Build color="inherit" fontSize="inherit" />}
                            title={"Jumlah Pembangunan Selesai"}
                            count={count.selesai}
                            bgColor={"from-blue-800 to-primary"}
                        />
                    </div>
                    <div className="py-2">
                        {/* {galery.length > 0 && ( */}
                        <div className="w-full">
                            <TableLayout
                                className={
                                    " min-h-[400px] overflow-y-auto px-3"
                                }
                            >
                                <div className="flex justify-between  items-center px-4 py-1">
                                    <div className="w-full flex justify-end gap-x-1">
                                        <input
                                            value={params.cari}
                                            placeholder="Cari Rumah"
                                            onChange={(e) =>
                                                setParams({
                                                    ...params,
                                                    cari: e.target.value,
                                                })
                                            }
                                        />
                                        <SelectOption
                                            value={params.tipe}
                                            onChange={(e) =>
                                                setParams({
                                                    ...params,
                                                    tipe: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">Pilih Tipe</option>
                                            {tipe.map((item, key) => (
                                                <option
                                                    value={item.nama_tipe}
                                                    key={key}
                                                >
                                                    {item.nama_tipe}
                                                </option>
                                            ))}
                                        </SelectOption>
                                        <SelectOption
                                            value={params.penjualan}
                                            onChange={(e) =>
                                                setParams({
                                                    ...params,
                                                    penjualan: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">
                                                Pilih Status Penjualan
                                            </option>
                                            <option value="terjual">
                                                Terjual
                                            </option>
                                            <option value="belum_terjual">
                                                Belum Terjual
                                            </option>
                                        </SelectOption>
                                        <SelectOption
                                            value={params.pembangunan}
                                            onChange={(e) =>
                                                setParams({
                                                    ...params,
                                                    pembangunan: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">
                                                Pilih Status Pembangunan
                                            </option>
                                            <option value="proses">
                                                proses
                                            </option>
                                            <option value="selesai">
                                                Selesai
                                            </option>
                                        </SelectOption>
                                    </div>
                                </div>
                                <TableLayout>
                                    <TableLayout.Table>
                                        <TableLayout.Thead>
                                            <tr>
                                                <TableLayout.Th>
                                                    #
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Nama Rumah
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Tipe Rumah
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Blok Rumah
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Harga Jual
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Status Penjualan
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Status Pembangungan
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Nama Pemilik
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Tanggal Terjual
                                                </TableLayout.Th>
                                            </tr>
                                        </TableLayout.Thead>
                                        <tbody>
                                            {detail.length > 0 ? (
                                                detail.map((item, key) => (
                                                    <tr key={key}>
                                                        <TableLayout.Td className="w-[10px]">
                                                            {key + 1}
                                                        </TableLayout.Td>
                                                        <TableLayout.Td className="w-[100px]">
                                                            <p className="w-[100px]">
                                                                {
                                                                    item.nama_rumah
                                                                }
                                                            </p>
                                                        </TableLayout.Td>
                                                        <TableLayout.Td className="w-[60px]">
                                                            <p className="w-[60px]">
                                                                {item.tipe}
                                                            </p>
                                                        </TableLayout.Td>
                                                        <TableLayout.Td className="w-[10px]">
                                                            {item.blok_rumah}
                                                        </TableLayout.Td>
                                                        <TableLayout.Td className="w-[100px]">
                                                            {formatRupiah(
                                                                item.harga_rumah
                                                            )}
                                                        </TableLayout.Td>
                                                        <TableLayout.Td className="w-[100px]">
                                                            {item.status_penjualan ==
                                                            "belum_terjual"
                                                                ? "Belum Terjual"
                                                                : "Terjual"}
                                                        </TableLayout.Td>
                                                        <TableLayout.Td className="w-[100px]">
                                                            {auth.user.role ==
                                                            "admin" ? (
                                                                <SelectOption
                                                                    value={
                                                                        item.status_pembangunan
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        changeStatus(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    <option
                                                                        selected
                                                                        disabled
                                                                        value={
                                                                            item.status_pembangunan
                                                                        }
                                                                    >
                                                                        {
                                                                            item.status_pembangunan
                                                                        }
                                                                    </option>
                                                                    <option
                                                                        value={
                                                                            "proses"
                                                                        }
                                                                    >
                                                                        {
                                                                            "proses"
                                                                        }
                                                                    </option>
                                                                    <option
                                                                        value={
                                                                            "selesai"
                                                                        }
                                                                    >
                                                                        {
                                                                            "selesai"
                                                                        }
                                                                    </option>
                                                                </SelectOption>
                                                            ) : (
                                                                item.status_pembangunan
                                                            )}
                                                        </TableLayout.Td>

                                                        <TableLayout.Td className="w-[100px]">
                                                            {item.nama_pemilik
                                                                ? item.nama_pemilik
                                                                : "Belum Terjual"}
                                                        </TableLayout.Td>
                                                        <TableLayout.Td className="w-[100px]">
                                                            {item.tanggal_laku
                                                                ? item.tanggal_laku
                                                                : "Belum Terjual"}
                                                        </TableLayout.Td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <TableLayout.Td
                                                        className="text-center"
                                                        colspan={8}
                                                    >
                                                        Belum ada data yang
                                                        ditambahkan
                                                    </TableLayout.Td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </TableLayout.Table>
                                </TableLayout>
                            </TableLayout>
                        </div>
                        {/* )} */}
                        <div className="w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} title={"Daftar Rumah"} />;
