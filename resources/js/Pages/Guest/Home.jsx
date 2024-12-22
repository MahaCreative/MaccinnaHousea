import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";
import About from "./About/About";
import DataRumah from "./DataRumah/DataRumah";

export default function Home() {
    return (
        <div>
            <About />
            <DataRumah />
        </div>
    );
}

Home.layout = (page) => <GuestLayout children={page} judul={"Home"} />;
