import GuestLayout from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Index(props) {
    const promosi = props.promosi;
    return (
        <div className=" py-6 px-4 md:px-8 lg:px-16">
            <div className="py-10 px-4 md:px-8 lg:px-16 useTransition">
                <p className="text-secondary tracking-tighter font-bold text-2xl md:text-4xl lg:text-6xl text-center">
                    Lihat{" "}
                    <span className="text-green-500">Informasi Promosi</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 useTransition gap-6 py-10">
                    {promosi.map((item, key) => (
                        <Link
                            href={route("detail-promosi", item.id)}
                            key={key}
                            className="rounded-md shadow-md shadow-gray-300 overflow-hidden hover:cursor-pointer useTransition hover:scale-110"
                        >
                            <img
                                src={"/storage/" + item.galery}
                                alt=""
                                className="w-full h-[170px] object-cover object-center"
                            />
                            <div className="bg-secondary px-4 py-1.5">
                                <p className="font-semibold text-lg text-white tracking-tighter">
                                    {item.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
