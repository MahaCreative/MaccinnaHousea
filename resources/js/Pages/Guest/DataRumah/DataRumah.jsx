import GuestLayout from "@/Layouts/GuestLayout";
import { Link, router } from "@inertiajs/react";
import {
    Bathtub,
    Cancel,
    CheckCircle,
    Checklist,
    Hotel,
    KeyboardDoubleArrowDown,
    Kitchen,
    LocalParking,
    SquareFoot,
} from "@mui/icons-material";
import { debounce } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

export default function DataRumah(props) {
    const { data: data } = props.dataRumah;
    const [dataTipe, setDataTipe] = useState([]);
    const [params, setParams] = useState({ load: "", tipe: "" });
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
        router.get(route("data-rumah"), query, {
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
                                                ? "bg-teal-500 text-white"
                                                : "text-secondary"
                                        } h-12 py-3 px-4  rounded-md font-light hover:bg-teal-700 useTransition border-teal-500 border w-[120px] hover:text-white`}
                                    >
                                        Tipe {item.nama_tipe}
                                    </button>
                                )
                        )}
                    </div>
                    <select
                        name="load"
                        onChange={(e) =>
                            setParams({ ...params, load: e.target.value })
                        }
                        className="my-2 rounded-md border border-teal-500 active:outline-none active:ring-0 focus:ring-0  focus:outline-none focus:border-teal-700 w-full"
                    >
                        <option value="1">10</option>
                        <option value="20">20</option>
                    </select>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {data.length > 0 &&
                    data.map((item, key) => (
                        <div className="overflow-hidden rounded-md shadow-sm shadow-gray-400/50">
                            <img
                                src={"/storage/" + item.foto_rumah}
                                alt=""
                                className="w-full h-64 object-cover hover:scale-110 useTransition"
                            />
                            <div className="px-4 py-6 text-gray-500">
                                <h3 className="font-extrabold text-teal-500 text-xl my-3">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(item.harga_rumah)}
                                </h3>
                                <Link>
                                    <h3 className="font-bold text-secondary text-xl mt-3 capitalize hover:text-teal-500 hover:cursor-pointer">
                                        {item.nama_rumah}
                                    </h3>
                                </Link>
                                <p>Block {item.blok_rumah}</p>
                            </div>
                            <div className="border-t border-dashed border-teal-500 px-4 flex w-full justify-between">
                                <div className="w-full px-2 border-r border-dashed border-teal-500 text-gray-500 flex items-center gap-4  py-2">
                                    <p className="text-xl text-teal-500 leading-3">
                                        <SquareFoot
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p className="leading-3">
                                        {item.luas_lahan} m2
                                    </p>
                                </div>
                                <div className="w-full px-2 border-r border-dashed border-teal-500 text-gray-500 flex items-center gap-4  py-2">
                                    <p className="text-xl text-teal-500 leading-3">
                                        <Hotel
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p className="leading-3">
                                        {item.luas_lahan} m2
                                    </p>
                                </div>
                                <div className="w-full px-2 text-gray-500 flex items-center gap-4  py-2">
                                    <p className="text-xl text-teal-500 leading-3">
                                        <Bathtub
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p className="leading-3">
                                        {item.luas_lahan} m2
                                    </p>
                                </div>
                            </div>
                            <div className=" px-4 flex w-full justify-between">
                                <div className="w-full px-2 border-r border-dashed border-teal-500 text-gray-500 flex items-center gap-4  py-2">
                                    <p className="text-xl text-teal-500 leading-3">
                                        <LocalParking
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p className="leading-3">
                                        Parkiran
                                        {item.status_parkiran == "true" ? (
                                            <span
                                                className={
                                                    "text-xl text-teal-500 leading-3 mx-3"
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
                                                    "text-xl text-red-500 leading-3 mx-3"
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
                                <div className="w-full px-2 text-gray-500 flex items-center gap-4  py-2">
                                    <p className="text-xl text-teal-500 leading-3">
                                        <Kitchen
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p className="leading-3">
                                        Dapur
                                        {item.status_dapur == "true" ? (
                                            <span
                                                className={
                                                    "text-xl text-teal-500 leading-3 mx-3"
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
                                                    "text-xl text-red-500 leading-3 mx-3"
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
                    className="py-3 px-4 text-white font-light bg-teal-500 hover:bg-teal-600 useTransition rounded-md flex gap-3"
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
DataRumah.layout = (page) => <GuestLayout children={page} title="Data Rumah" />;
