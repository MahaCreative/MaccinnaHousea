import Card from "@/Components/Card/Card";
import AuthLayout from "@/Layouts/Admin/AuthLayout";
import React from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { AccountCircle, Add } from "@mui/icons-material";
import TableLayout from "@/Components/Table/TableLayout";
import InputText from "@/Components/Form/InputText";
import { useCallback } from "react";
import { debounce } from "@mui/material";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import ResponseAlert from "@/Hooks/ResponseAlert";
import Dialogs from "@/Components/Dialog";
import Form from "./Form";
export default function Index(props) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const [tambahModal, setTambahModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const admin = props.admin;
    const [params, setParams] = useState({ cariAdmin: "" });
    const [model, setModel] = useState([]);
    const reloadAdmin = useCallback(
        debounce((query) => {
            router.get(route("auth.user"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => {
        reloadAdmin(params);
    }, [params]);
    const deleteHandler = (id) => {
        ResponseMethode(
            "warning",
            "Hapus Data!!!",
            "Anda yakin ingin menghapus data ini?, data yang terhapus tidak dapat dikembalikan lagi",
            () => {
                router.delete(route("auth.delete-data-user", id), {
                    preserveScroll: () => true,
                    onSuccess: () => {
                        showResponse(
                            "success",
                            "Sukses",
                            "Berhasil menghapus data"
                        );
                    },
                    onError: () => {
                        showResponse(
                            "error",
                            "Error",
                            "Gagal menghapus data, coba lagi nanti"
                        );
                    },
                });
            }
        );
    };
    const editHandler = (data) => {
        setEditModal(true);
        setModel(data);
    };
    return (
        <div className="px-4 md:px-8 lg:px-16 useTransition py-6">
            <Dialogs
                open={editModal}
                setOpen={setEditModal}
                handleClose={() => setEditModal(false)}
                title={"Edit Data"}
            >
                <Form
                    model={model}
                    setModel={setModel}
                    setOpen={setEditModal}
                />
            </Dialogs>
            <Dialogs
                open={tambahModal}
                setOpen={setTambahModal}
                handleClose={() => setTambahModal(false)}
                title={"Edit Data"}
            >
                <Form setOpen={setTambahModal} />
            </Dialogs>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 useTransition">
                <Card
                    bgColor={"from-teal-500 to-teal-600"}
                    icon={
                        <SupervisorAccountIcon
                            color="inherit"
                            fontSize="inherit"
                        />
                    }
                    count={10}
                    title={"Total Admin"}
                />
                <Card
                    bgColor={"from-teal-500 to-teal-600"}
                    icon={<AccountCircle color="inherit" fontSize="inherit" />}
                    count={10}
                    title={"Total Pengunjung Terdaftar"}
                />
            </div>
            <div className="my-3">
                <h3 className="tracking-tighter font-light text-teal-500 text-2xl">
                    Data Petugas
                </h3>
                <TableLayout>
                    <div className="flex justify-between items-center px-4 py-3">
                        <button
                            onClick={() => setTambahModal(true)}
                            className="flex gap-3 items-center py-2 px-4 rounded-md bg-blue-500 text-white leading-3 tracking-tighter"
                        >
                            <p>
                                <Add color="inherit" fontSize="inherit" />
                            </p>
                            <p>Tambah User</p>
                        </button>
                        <InputText
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    cariAdmin: e.target.value,
                                })
                            }
                            placeholder="Cari"
                            className="w-1/6"
                        />{" "}
                    </div>
                    <TableLayout.Table>
                        <TableLayout.Thead>
                            <tr>
                                <TableLayout.Th>#</TableLayout.Th>
                                <TableLayout.Th>Image</TableLayout.Th>
                                <TableLayout.Th>Nama Lengkap</TableLayout.Th>
                                <TableLayout.Th>Email</TableLayout.Th>
                                <TableLayout.Th>Nomor Hp</TableLayout.Th>
                                <TableLayout.Th>Aksi</TableLayout.Th>
                            </tr>
                        </TableLayout.Thead>
                        <tbody>
                            {admin.length > 0 &&
                                admin.map((item, key) => (
                                    <tr key={key}>
                                        <TableLayout.Td className="w-12">
                                            {key + 1}
                                        </TableLayout.Td>
                                        <TableLayout.Td
                                            key={key}
                                            className="w-24"
                                        >
                                            <img
                                                src={"/storage/" + item.avatar}
                                                className="w-24 rounded-full h=24 object-cover"
                                                alt=""
                                            />
                                        </TableLayout.Td>
                                        <TableLayout.Td
                                            key={key}
                                            className="w-36"
                                        >
                                            {item.nama_lengkap}
                                        </TableLayout.Td>
                                        <TableLayout.Td
                                            key={key}
                                            className="w-36"
                                        >
                                            {item.email}
                                        </TableLayout.Td>
                                        <TableLayout.Td key={key} className="">
                                            {item.no_hp}
                                        </TableLayout.Td>
                                        <TableLayout.Td key={key} className="">
                                            <div className="flex gap-2 items-center">
                                                <button
                                                    onClick={() =>
                                                        deleteHandler(item.id)
                                                    }
                                                    className="text-white py-1.5 px-1.5 rounded-md bg-red-500 hover:bg-red-600 useTransition"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        editHandler(item)
                                                    }
                                                    className="text-white py-1.5 px-1.5 rounded-md bg-orange-500 hover:bg-orange-600 useTransition"
                                                >
                                                    Edit
                                                </button>
                                            </div>
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

Index.layout = (page) => <AuthLayout children={page} title={"Data User"} />;
