import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";
import About from "../About/About";

export default function Home() {
    return (
        <div>
            <About />
        </div>
    );
}

Home.layout = (page) => <GuestLayout children={page} judul={"Home"} />;
