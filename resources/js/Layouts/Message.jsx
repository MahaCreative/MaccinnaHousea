import {
    Check,
    Checklist,
    Close,
    Fullscreen,
    List,
    Search,
    Send,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, router, usePage } from "@inertiajs/react";
export default function Message({ auth }) {
    const [open, setOpen] = useState(false);
    const { lastMessage } = usePage().props;
    const [message, setMessage] = useState({ kode_pesan: "", message: "" });
    const submitHandler = () => {
        router.post(
            route("sent-message"),
            { ...message },
            {
                onSuccess: () => {
                    setMessage({ ...message, message: "" });
                },
            }
        );
    };
    useEffect(() => {
        if (lastMessage) {
            setMessage({ ...message, kode_pesan: lastMessage.kode_pesan });
        }
    }, [lastMessage]);
    const fullScreenHandler = () => {
        setOpen(false);
        setFullScreen(true);
    };

    return (
        <>
            {/* chat kecil */}
            <div
                className={`${
                    open ? "w-[90%] md:w-[400px]" : "w-[300px]"
                } fixed bottom-3 right-3 z-[99999]   useTransition rounded-md overflow-hidden shadow-md shadow-gray-500/50 `}
            >
                <div className="w-full h-full">
                    <div className="bg-secondary py-2 px-3  text-white flex justify-between items-center gap-5">
                        {auth.user ? (
                            <>
                                {lastMessage ? (
                                    <>
                                        {lastMessage.petugas_id ? (
                                            <div className="flex gap-4 items-center">
                                                <img
                                                    src={`/storage/${lastMessage.petugas.avatar}`}
                                                    alt=""
                                                    className="h-10 w-10 rounded-full object-cover object-center"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold tracking-tighter">
                                                        {
                                                            lastMessage.petugas
                                                                .nama_lengkap
                                                        }
                                                    </h3>
                                                    <div
                                                        className={`${
                                                            open ? "" : "hidden"
                                                        } flex gap-x-3 items-center`}
                                                    >
                                                        <p className="text-white text-sm tracking-tighter leading-3">
                                                            {
                                                                lastMessage
                                                                    .petugas
                                                                    .role
                                                            }
                                                        </p>
                                                        <p className="leading-3 text-white text-xs tracking-tighter">
                                                            User Sedang Mengetik
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Pesan belum di baca petugas</p>
                                        )}
                                    </>
                                ) : (
                                    <p>Tidak ada pesan</p>
                                )}
                            </>
                        ) : (
                            <p>Tidak ada pesan</p>
                        )}
                        <div className={`flex gap-x-2`}>
                            <button
                                onClick={() => setOpen(!open)}
                                className={` ${
                                    open ? "rotate-90" : ""
                                } useTransition hover:cursor-pointer hover:scale-125`}
                            >
                                <ArrowForwardIosIcon
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </button>
                        </div>
                    </div>
                    <div
                        className={`${
                            open
                                ? "h-[300px] w-full md:w-[400px] overflow-y-auto"
                                : "w-[300px] h-0 overflow-y-hidden"
                        }  bg-white  relative useTransition overflow-x-hidden`}
                    >
                        {/* data message */}
                        {open && (
                            <>
                                <div className="absolute top-2 left-2  w-full h-[230px]  py-2  overflow-y-auto px-4 ">
                                    {auth.user ? (
                                        <>
                                            {lastMessage && (
                                                <>
                                                    {lastMessage.detail.map(
                                                        (item, key) => (
                                                            <div
                                                                key={key}
                                                                className={`py-1.5 px-1.5 w-full flex  ${
                                                                    item.sender_id ==
                                                                    auth.user.id
                                                                        ? "justify-end"
                                                                        : "justify-start"
                                                                }`}
                                                            >
                                                                <div
                                                                    className={`flex flex-col gap-x-3   w-[200px]`}
                                                                >
                                                                    <div className="flex gap-x-1 items-center w-full justify-start">
                                                                        <img
                                                                            src={`/storage/${item.sender.avatar}`}
                                                                            className="w-[24px] h-[25px] object-cover object-center rounded-full"
                                                                            alt=""
                                                                        />
                                                                        <div>
                                                                            <p className="font-semibold tracking-tighter text-sm text-green-500">
                                                                                {item.sender_id ==
                                                                                auth
                                                                                    .user
                                                                                    .id
                                                                                    ? "Anda"
                                                                                    : item
                                                                                          .sender
                                                                                          .nama_lengkap}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="">
                                                                        <div
                                                                            className={`flex justify-between items-end ${
                                                                                item.sender_id ==
                                                                                auth
                                                                                    .user
                                                                                    .id
                                                                                    ? "bg-green-300"
                                                                                    : "bg-gray-200"
                                                                            } rounded-md py-1 px-2 leading-4 my-1.5`}
                                                                        >
                                                                            <p className="text-xs tracking-tighter leading-4 w-[150px]">
                                                                                {
                                                                                    item.message
                                                                                }
                                                                            </p>
                                                                            {item.status ==
                                                                            "dilihat" ? (
                                                                                <p
                                                                                    className={`text-cyan-500`}
                                                                                >
                                                                                    <Checklist
                                                                                        fontSize="inherit"
                                                                                        color="inherit"
                                                                                    />
                                                                                </p>
                                                                            ) : (
                                                                                <p
                                                                                    className={`text-red-500`}
                                                                                >
                                                                                    <Check
                                                                                        fontSize="inherit"
                                                                                        color="inherit"
                                                                                    />
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-secondary text-xs">
                                                                            Dilihat
                                                                            17.00
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <div className="h-full w-full flex flex-col  items-start gapy-3 justify-center">
                                            <h3 className="text-xl font-semibold text-secondary tracking-tighter">
                                                Silahkan login terlebih dahulu
                                                untuk menggunanakan fitur chat
                                                kami.
                                            </h3>
                                            <Link
                                                href={route("login")}
                                                className="py-2 px-3 text-white rounded-md bg-secondary"
                                            >
                                                Login
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                {auth.user && (
                                    <div className="absolute bottom-2 right-0 px-3 w-full">
                                        <div className="flex gap-2 items-center">
                                            <textarea
                                                inputMode="text"
                                                onChange={(e) =>
                                                    setMessage({
                                                        ...message,
                                                        message: e.target.value,
                                                    })
                                                }
                                                value={message.message}
                                                placeholder="ketik pesan disini"
                                                className="rounded-md w-full outline-none border-none focus:outline-1 text-xs h-[30px] border-gray-500 focus:outline-green-500 focus:ring-0"
                                            />
                                            <button
                                                onClick={submitHandler}
                                                className=" text-green-500 hover:bg-green-500 hover:text-white useTransition leading-3 px-4 text-2xl rounded-full w-[50px] h-[50px]"
                                            >
                                                <Send
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
