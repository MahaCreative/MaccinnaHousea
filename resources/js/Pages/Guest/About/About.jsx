import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

export default function About() {
    return (
        <div className="flex py-6 px-4 md:px-8 lg:px-16 useTransition md:flex-row flex-col-reverse">
            <div className="w-full">
                <h1 className="text-4xl font-semibold text-green-500 mb-4">
                    About Us
                </h1>
                <p className="font-light text-secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    obcaecati molestias, error deleniti aspernatur,
                    reprehenderit voluptatem sint voluptate rem enim eaque iusto
                    adipisci veniam in sunt, minus ipsum. Facilis, magni.
                </p>
                <p className="font-light text-secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    obcaecati molestias, error deleniti aspernatur,
                    reprehenderit voluptatem sint voluptate rem enim eaque iusto
                    adipisci veniam in sunt, minus ipsum. Facilis, magni.
                </p>
                <p className="font-light text-secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    obcaecati molestias, error deleniti aspernatur,
                    reprehenderit voluptatem sint voluptate rem enim eaque iusto
                    adipisci veniam in sunt, minus ipsum. Facilis, magni.
                </p>
                <p className="font-light text-secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    obcaecati molestias, error deleniti aspernatur,
                    reprehenderit voluptatem sint voluptate rem enim eaque iusto
                    adipisci veniam in sunt, minus ipsum. Facilis, magni.
                </p>
            </div>
            <div className=" flex justify-end">
                <img
                    src="./storage/Image/about.jpg"
                    alt=""
                    className="w-[500px] my-6 object-cover"
                />
            </div>
        </div>
    );
}

About.layout = (page) => <GuestLayout children={page} judul={"About"} />;
