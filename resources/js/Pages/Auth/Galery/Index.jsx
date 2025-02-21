import Card from "@/Components/Card/Card";
import InputText from "@/Components/Form/InputText";
import TableLayout from "@/Components/Table/TableLayout";
import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { Article, ContentCut, PictureInPicture } from "@mui/icons-material";
import React from "react";

export default function Index() {
    return (
        <div className="px-4 md:px-8 lg:px-16 usetTransition py-7">
            <div className="grid grid-cols-4 gap-3 items center">
                <Card
                    icon={
                        <PictureInPicture color="inherit" fontSize="inherit" />
                    }
                    title={"Jumlah Views Galery"}
                    count={10}
                    bgColor={"from-teal-400 via-teal-600 to-teal-700"}
                />
                <Card
                    icon={<Article color="inherit" fontSize="inherit" />}
                    title={"Total Galery Ditambahkan"}
                    count={10}
                    bgColor={"from-teal-400 via-teal-600 to-teal-700"}
                />
            </div>
            <div className="py-2">
                <TableLayout>
                    <div className="flex justify-between  items-center px-4 py-3">
                        <h3 className="tracking-tighter font-light text-teal-500 text-2xl">
                            Data Galery
                        </h3>
                        <InputText
                            // onChange={(e) =>
                            //     setParams({
                            //         ...params,
                            //         cariPelanggan: e.target.value,
                            //     })
                            // }
                            placeholder="Cari"
                            className="w-1/6"
                        />{" "}
                    </div>
                    <TableLayout.Table>
                        <TableLayout.Thead>
                            <tr>
                                <TableLayout.Th>#</TableLayout.Th>
                                <TableLayout.Th>\Gambar#</TableLayout.Th>
                                <TableLayout.Th>Title</TableLayout.Th>
                                <TableLayout.Th>Kontent</TableLayout.Th>
                                <TableLayout.Th>Jumlah Views</TableLayout.Th>
                                <TableLayout.Th>Aksi</TableLayout.Th>
                            </tr>
                        </TableLayout.Thead>
                    </TableLayout.Table>
                </TableLayout>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} title={"Data Galery"} />;
