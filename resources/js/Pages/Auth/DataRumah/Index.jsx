import ResponseAlert from "@/Hooks/ResponseAlert";
import AuthLayout from "@/Layouts/Admin/AuthLayout";

import { Link, router, usePage } from "@inertiajs/react";
import {
    Bathtub,
    Cancel,
    CheckCircle,
    Checklist,
    Delete,
    Edit,
    Hotel,
    KeyboardDoubleArrowDown,
    Kitchen,
    LocalParking,
    RemoveRedEye,
    SquareFoot,
} from "@mui/icons-material";
import { debounce, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

export default function Index(props) {
    const { auth } = usePage().props;
    const { showResponse, ResponseMethode } = ResponseAlert();
    const { data: data } = props.dataRumah;
    const [dataTipe, setDataTipe] = useState([]);
    const [params, setParams] = useState({ load: "", tipe: "", cari: "" });
    const fetchDataTipe = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/data-tipe");
            setDataTipe(response.data);
            setParams({ tipe: response.data[0].id });
        } catch (err) {
            alert("Gagal meload data tipe rumah. Error Code : " + err);
        }
    };
    useEffect(() => {
        fetchDataTipe();
    }, []);
    const fetchData = async (query) => {
        router.get(route("auth.data-rumah"), query, {
            preserveScroll: true,
            preserveState: true,
        });
    };
    const reload = useCallback(
        debounce((query) => {
            fetchData(query);
        }),
        []
    );
    useEffect(() => reload(params), [params]);
    const deleteHandler = (id) => {
        ResponseMethode(
            "warning",
            "Hapus Data!",
            "Ingin menghapus data ini?. data yang dihapus tidak dapat dikembalikan.",
            () => {
                router.delete(route("auth.delete-data-rumah", id), {
                    preserveScroll: () => true,
                    onSuccess: () => {
                        showResponse(
                            "success",
                            "Sukses",
                            "Berhasil menghapus data rumah"
                        );
                    },
                    onError: () => {},
                });
            },
            () => {},
            "Ya Hapus Data."
        );
    };

    const editHandler = (id) => {
        ResponseMethode(
            "warning",
            "Edit Data!",
            "Yakin ngin mengedit data ini?.",
            () => {
                router.visit(route("auth.edit-data-rumah", id));
            },
            () => {},
            "Ya Saya Yakin"
        );
    };
    return (
        <div className="px-4 md:px-8 lg:px-16 useTransition my-3">
            <div className="flex flex-col-reverse md:flex-row-reverse justify-between gap-3">
                <div>
                    <div className="flex gap-3">
                        {dataTipe.map(
                            (item, key) =>
                                key + 1 <= 3 && (
                                    <button
                                        key={key}
                                        onClick={() =>
                                            setParams({
                                                ...params,
                                                tipe: item.id,
                                            })
                                        }
                                        className={`${
                                            params.tipe == item.id
                                                ? "bg-blue-500 text-white"
                                                : "text-secondary"
                                        } h-12 py-3 px-4  rounded-md font-light hover:bg-blue-700 useTransition border-blue-500 border w-[120px] hover:text-white`}
                                    >
                                        Tipe {item.nama_tipe}
                                    </button>
                                )
                        )}
                    </div>
                    <div className="flex gap-1 items-center">
                        <select
                            name="load"
                            value={params.load}
                            onChange={(e) =>
                                setParams({ ...params, load: e.target.value })
                            }
                            className="form"
                        >
                            <option value="1">10</option>
                            <option value="20">20</option>
                        </select>
                        <input
                            placeholder="Cari Rumah...."
                            className="form"
                            value={params.cari}
                            type="text"
                            name="cari"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    {auth.user.role == "super admin" && (
                        <Link
                            as="button"
                            href={route("auth.create-data-rumah")}
                            className="btn-primary w-full text-center flex items-center justify-center"
                        >
                            Tambah Katalog
                        </Link>
                    )}
                </div>
                <div>
                    <h1 className="text-secondary font-bold text-3xl lg:text-5xl">
                        Data Perumahan
                    </h1>
                    <p className="w-full md:w-1/2 text-gray-500 font-light tracking-tighter text-xl my-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facere id in obcaecati asperiores, odit porro maxime
                        tempore inventore ipsum cumque perspiciatis rerum vel,
                        ex voluptatum eveniet, quidem aspernatur ut ipsa.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
                {data.length > 0 &&
                    data.map((item, key) => (
                        <div
                            key={key}
                            className="overflow-hidden rounded-md shadow-sm shadow-gray-400/50"
                        >
                            <div className="relative">
                                <img
                                    src={"/storage/" + item.foto_rumah}
                                    alt=""
                                    className="w-full h-24 object-cover hover:scale-110 useTransition "
                                />
                                {auth.user.role == "super admin" && (
                                    <div className="absolute top-2 right-2 flex gap-1.5 justify-end items-center w-full">
                                        <Tooltip title="Show">
                                            <Link
                                                href={route(
                                                    "show-data-rumah",
                                                    item.id
                                                )}
                                                className="bg-blue-500 p-2 rounded-md text-white font-light hover:bg-blue-600 useTransition tracking-tighter leading-3"
                                            >
                                                <RemoveRedEye
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </Link>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <button
                                                onClick={() =>
                                                    editHandler(item.id)
                                                }
                                                className="bg-orange-500 p-2 rounded-md text-white font-light hover:bg-orange-600 useTransition tracking-tighter leading-3"
                                            >
                                                <Edit
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <button
                                                onClick={() =>
                                                    deleteHandler(item.id)
                                                }
                                                className="bg-red-500 p-2 rounded-md text-white font-light hover:bg-red-600 useTransition tracking-tighter leading-3"
                                            >
                                                <Delete
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </button>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>
                            <div className="px-4 py-6 text-gray-500">
                                <h3 className="font-extrabold text-blue-500 text-sm my-3">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(item.harga_rumah)}
                                </h3>
                                <Link href={route("show-data-rumah", item.id)}>
                                    <h3 className="font-bold text-secondary text-sm mt-3 capitalize hover:text-blue-500 hover:cursor-pointer">
                                        {item.nama_rumah}
                                    </h3>
                                </Link>
                                <p>Block {item.blok_rumah}</p>
                            </div>
                            <div className="border-t border-dashed border-blue-500 px-4 flex w-full justify-between">
                                <div className="w-full px-1 border-r border-dashed border-blue-500 text-gray-500 flex justify-center items-center gap-1 py-2">
                                    <p className="text-xs text-blue-500 leading-3">
                                        <SquareFoot
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p className="leading-3 text-xs">
                                        {item.luas_lahan} m2
                                    </p>
                                </div>
                                <div className="w-full px-1 border-r border-dashed border-blue-500 text-gray-500 flex justify-center items-center gap-1 py-2">
                                    <p className="text-xs text-blue-500 leading-3">
                                        <Hotel
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p className="leading-3">
                                        {item.jumlah_kamar}
                                    </p>
                                </div>
                                <div className="w-full px-1 text-gray-500 flex items-center gap-4 justify-center  py-2">
                                    <p className="text-sm text-blue-500 leading-3">
                                        <Bathtub
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p className="leading-3 text-xs">
                                        {item.jumlah_kamar_mandi}
                                    </p>
                                </div>
                            </div>
                            <div className=" px-4 flex w-full justify-between">
                                <div className="w-full px-1 border-r border-dashed border-blue-500 text-gray-500 flex justify-center items-center gap-1 py-2">
                                    <p className="text-sm text-blue-500 leading-3">
                                        <LocalParking
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p className="leading-3 text-xs flex">
                                        Parkiran
                                        {item.status_parkiran == "true" ? (
                                            <span
                                                className={
                                                    "text-xs text-blue-500 leading-3 mx-1"
                                                }
                                            >
                                                <CheckCircle
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </span>
                                        ) : (
                                            <span
                                                className={
                                                    "text-xs text-red-500 leading-3 mx-1"
                                                }
                                            >
                                                <Cancel
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div className="w-full px-1 text-gray-500 flex items-center gap-4 justify-center  py-2">
                                    <p className="text-sm text-blue-500 leading-3">
                                        <Kitchen
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p className="leading-3 text-xs">
                                        Dapur
                                        {item.status_dapur == "true" ? (
                                            <span
                                                className={
                                                    "text-xs text-blue-500 leading-3 mx-1"
                                                }
                                            >
                                                <CheckCircle
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </span>
                                        ) : (
                                            <span
                                                className={
                                                    "text-xs text-red-500 leading-3 mx-1"
                                                }
                                            >
                                                <Cancel
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="w-full flex justify-center items-center">
                <button
                    onClick={() =>
                        params.load == "all"
                            ? setParams({ ...params, load: "" })
                            : setParams({ ...params, load: "all" })
                    }
                    className="py-3 px-4 text-white font-light bg-blue-500 hover:bg-blue-600 useTransition rounded-md flex gap-3"
                >
                    <p>
                        <KeyboardDoubleArrowDown
                            color="inherit"
                            fontSize="inherit"
                        />
                    </p>
                    <p>Show More</p>
                </button>
            </div>
        </div>
    );
}
Index.layout = (page) => <AuthLayout children={page} title="Data Rumah" />;
