import Card from "@/Components/Card/Card";
import Dialogs from "@/Components/Dialog";
import InputText from "@/Components/Form/InputText";
import TableLayout from "@/Components/Table/TableLayout";
import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { Dialog } from "@headlessui/react";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Add,
    Article,
    ContentCut,
    PictureInPicture,
} from "@mui/icons-material";
import React, { useState } from "react";
import Create from "./Create";
import ResponseAlert from "@/Hooks/ResponseAlert";

export default function Index(props) {
    const { auth } = usePage().props;
    const promosi = props.promosi;
    const count = props.count;
    const { showResponse, ResponseMethode } = ResponseAlert();
    const [modalTambah, setModalTambah] = useState(false);
    const [model, setModel] = useState(null);
    const deleteHandler = (id) => {
        ResponseMethode(
            "warning",
            "Hapus Data!!!",
            "Anda yakin ingin menghapus data ini?, data yang terhapus tidak dapat dikembalikan lagi",
            () => {
                router.delete(route("auth.delete-promosi", { id }), {
                    onSuccess: () =>
                        showResponse(
                            "success",
                            "Suksess",
                            "1 Data foto berhasil dihapus"
                        ),
                });
            }
        );
    };
    const editHandler = (item) => {
        setModel(item);
    };
    return (
        <div className="px-4 md:px-8 lg:px-16 usetTransition py-7 ">
            <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                    <div className="grid grid-cols-2 gap-3 items center">
                        <Card
                            icon={
                                <PictureInPicture
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            }
                            title={"Jumlah Views promosi"}
                            count={count.views}
                            bgColor={"from-blue-800 to-primary"}
                        />
                        <Card
                            icon={
                                <Article color="inherit" fontSize="inherit" />
                            }
                            title={"Total promosi Ditambahkan"}
                            count={count.image}
                            bgColor={"from-blue-800 to-primary"}
                        />
                    </div>
                    <div className="py-2">
                        {/* {promosi.length > 0 && ( */}
                        <div className="w-full">
                            <TableLayout
                                className={
                                    " min-h-[400px] overflow-y-auto px-3"
                                }
                            >
                                <div className="flex justify-between  items-center px-4 py-1">
                                    <h3 className="tracking-tighter font-light text-blue-900 text-lg">
                                        Data promosi
                                    </h3>
                                </div>
                                <TableLayout>
                                    <TableLayout.Table>
                                        <TableLayout.Thead>
                                            <tr>
                                                <TableLayout.Th>
                                                    #
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Gambar
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Title
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Kontent
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Jumlah Views
                                                </TableLayout.Th>
                                                <TableLayout.Th>
                                                    Aksi
                                                </TableLayout.Th>
                                            </tr>
                                        </TableLayout.Thead>
                                        <tbody>
                                            {promosi.length > 0 ? (
                                                promosi.map((item, key) => (
                                                    <tr key={key}>
                                                        <TableLayout.Td>
                                                            {key + 1}
                                                        </TableLayout.Td>
                                                        <TableLayout.Td>
                                                            <img
                                                                src={
                                                                    "/storage/" +
                                                                    item.gambar
                                                                }
                                                                alt=""
                                                                className="w-[75px] h-[35px] object-cover object-center rounded-md shadow-sm shadow-gray-500/50"
                                                            />
                                                        </TableLayout.Td>
                                                        <TableLayout.Td>
                                                            <Link>
                                                                {item.title}
                                                            </Link>
                                                        </TableLayout.Td>
                                                        <TableLayout.Td>
                                                            <p
                                                                className="line-clamp-2 w-[200px]"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item.kontent,
                                                                }}
                                                            />
                                                        </TableLayout.Td>
                                                        <TableLayout.Td className="w-[10px]">
                                                            {item.views}
                                                        </TableLayout.Td>
                                                        <TableLayout.Td>
                                                            {auth.user.role ==
                                                                "admin" && (
                                                                <div className="flex gap-2 items-center">
                                                                    <button
                                                                        onClick={() =>
                                                                            deleteHandler(
                                                                                item.id
                                                                            )
                                                                        }
                                                                        className="text-white py-1.5 px-1.5 rounded-md bg-red-500 hover:bg-red-600 useTransition"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            editHandler(
                                                                                item
                                                                            )
                                                                        }
                                                                        className="text-white py-1.5 px-1.5 rounded-md bg-orange-500 hover:bg-orange-600 useTransition"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                </div>
                                                            )}
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
                {auth.user.role == "admin" && (
                    <div className="w-full">
                        <h3 className="text-blue-800">
                            Tambahkan Promosi Baru
                        </h3>
                        <Create model={model} setModel={setModel} />
                    </div>
                )}
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} title={"Data promosi"} />;
