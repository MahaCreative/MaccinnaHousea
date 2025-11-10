import TableLayout from "@/Components/Table/TableLayout";
import React from "react";

export default function Print(props) {
    const permohonan = props.permohonan;
    return (
        <div className="px-4">
            <TableLayout>
                <TableLayout.Table>
                    <TableLayout.Thead>
                        <tr>
                            <TableLayout.Th>#</TableLayout.Th>
                            <TableLayout.Th>Kode</TableLayout.Th>
                            <TableLayout.Th>Tanggal Permohonan</TableLayout.Th>
                            <TableLayout.Th>Nama Rumah</TableLayout.Th>
                            <TableLayout.Th>Nama Pemohon</TableLayout.Th>
                            <TableLayout.Th>Nomor Pemohon</TableLayout.Th>
                            <TableLayout.Th>Status Permohonan</TableLayout.Th>
                            <TableLayout.Th>Status Berkas</TableLayout.Th>
                            <TableLayout.Th>Nama Petugas</TableLayout.Th>
                            <TableLayout.Th>Nomor Petugas</TableLayout.Th>
                        </tr>
                    </TableLayout.Thead>
                    <tbody>
                        {permohonan.map((item, key) => (
                            <>
                                <tr key={key}>
                                    <TableLayout.Td className="w-[10px]">
                                        {key++}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[100px] capitalize text-xs">
                                        <p>{item.kode_permohonan}</p>
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[100px] capitalize text-xs">
                                        <p>{item.tanggal_permohonan}</p>
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[50px] capitalize text-xs">
                                        {item.rumah.nama_rumah}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[150px] capitalize text-xs">
                                        {item.nama_pemohon}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[100px]">
                                        {item.no_hp_pemohon}
                                    </TableLayout.Td>

                                    <TableLayout.Td className="w-[150px] capitalize text-xs">
                                        {item.status_permohonan}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[150px] capitalize text-xs">
                                        {item.status_berkas}
                                    </TableLayout.Td>

                                    <TableLayout.Td className="w-[150px] capitalize text-xs">
                                        {item.nama_petugas_melayani
                                            ? item.nama_petugas_melayani
                                            : "Belum Diterima Oleh Petugas"}
                                    </TableLayout.Td>
                                    <TableLayout.Td className="w-[150px] capitalize text-xs">
                                        {item.no_hp_petugas
                                            ? item.no_hp_petugas
                                            : "Belum Diterima Oleh Petugas"}
                                    </TableLayout.Td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </TableLayout.Table>
            </TableLayout>
        </div>
    );
}
