import AuthLayout from "@/Layouts/Admin/AuthLayout";
import React from "react";

export default function Index() {
    return <div>Dashboard</div>;
}

Index.layout = (page) => <AuthLayout children={page} />;
