import TableLayout from "@/Components/Table/TableLayout";
import { formatRupiah } from "@/Hooks/FormatRupiah";
import React from "react";

export default function Print(props) {
    const detail = props.detail;
    return (
        <div>
            <TableLayout className={" min-h-[400px] overflow-y-auto px-3"}>
                <TableLayout>
                    <TableLayout.Table>
                        <TableLayout.Thead>
                            <tr>
                                <TableLayout.Th>#</TableLayout.Th>
                                <TableLayout.Th>Nama Rumah</TableLayout.Th>
                                <TableLayout.Th>Tipe Rumah</TableLayout.Th>
                                <TableLayout.Th>Blok Rumah</TableLayout.Th>
                                <TableLayout.Th>Harga Jual</TableLayout.Th>
                                <TableLayout.Th>
                                    Status Penjualan
                                </TableLayout.Th>
                                <TableLayout.Th>
                                    Status Pembangungan
                                </TableLayout.Th>
                                <TableLayout.Th>Nama Pemilik</TableLayout.Th>
                                <TableLayout.Th>Tanggal Terjual</TableLayout.Th>
                            </tr>
                        </TableLayout.Thead>
                        <tbody>
                            {detail.length > 0 ? (
                                detail.map((item, key) => (
                                    <tr key={key}>
                                        <TableLayout.Td className="w-[10px]">
                                            {key + 1}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[100px]">
                                            <p className="w-[100px]">
                                                {item.nama_rumah}
                                            </p>
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[60px]">
                                            <p className="w-[60px]">
                                                {item.tipe}
                                            </p>
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[10px]">
                                            {item.blok_rumah}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[100px]">
                                            {formatRupiah(item.harga_rumah)}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[100px]">
                                            {item.status_penjualan ==
                                            "belum_terjual"
                                                ? "Belum Terjual"
                                                : "Terjual"}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[100px]">
                                            {item.status_pembangunan}
                                        </TableLayout.Td>

                                        <TableLayout.Td className="w-[100px]">
                                            {item.nama_pemilik
                                                ? item.nama_pemilik
                                                : "Belum Terjual"}
                                        </TableLayout.Td>
                                        <TableLayout.Td className="w-[100px]">
                                            {item.tanggal_laku
                                                ? item.tanggal_laku
                                                : "Belum Terjual"}
                                        </TableLayout.Td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <TableLayout.Td
                                        className="text-center"
                                        colspan={8}
                                    >
                                        Belum ada data yang ditambahkan
                                    </TableLayout.Td>
                                </tr>
                            )}
                        </tbody>
                    </TableLayout.Table>
                </TableLayout>
            </TableLayout>
        </div>
    );
}
