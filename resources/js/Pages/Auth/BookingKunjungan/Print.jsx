import TableLayout from "@/Components/Table/TableLayout";
import React from "react";

export default function Print(props) {
    const booking = props.booking;
    return (
        <div className="py-6 px-4">
            <TableLayout>
                <TableLayout.Table>
                    <TableLayout.Thead>
                        <tr>
                            <TableLayout.Th>#</TableLayout.Th>
                            <TableLayout.Th>Nama Rumah</TableLayout.Th>
                            <TableLayout.Th>Nama Pengunjung</TableLayout.Th>
                            <TableLayout.Th>Nomor Pengunjung</TableLayout.Th>
                            <TableLayout.Th>Tanggal Kunjungan</TableLayout.Th>
                            <TableLayout.Th>Rating</TableLayout.Th>
                            <TableLayout.Th>Status Booking</TableLayout.Th>
                            <TableLayout.Th>Nama Petugas</TableLayout.Th>
                            <TableLayout.Th>Nomor Petugas</TableLayout.Th>
                        </tr>
                    </TableLayout.Thead>
                    <tbody>
                        {booking.map((item, key) => (
                            <tr key={key}>
                                <TableLayout.Td className="w-[20px]">
                                    {key + 1}
                                </TableLayout.Td>
                                <TableLayout.Td className="w-[170px] capitalize">
                                    {item.rumah.nama_rumah}
                                </TableLayout.Td>
                                <TableLayout.Td className="w-[170px] capitalize">
                                    {item.nama_pengunjung}
                                </TableLayout.Td>
                                <TableLayout.Td className="w-[170px]">
                                    {item.nomor_pengunjung}
                                </TableLayout.Td>
                                <TableLayout.Td className="w-[170px] capitalize">
                                    {item.tanggal_kunjungan}
                                </TableLayout.Td>
                                <TableLayout.Td className="w-[170px] capitalize">
                                    {item.rating
                                        ? item.rating
                                        : "Belum di nilai"}
                                </TableLayout.Td>

                                <TableLayout.Td className="w-[200px] capitalize">
                                    {item.status_booking}
                                </TableLayout.Td>
                                <TableLayout.Td className="w-[200px] capitalize">
                                    {item.petugas
                                        ? item.petugas.nama_lengkap
                                        : "Belum Diterima Oleh Petugas"}
                                </TableLayout.Td>
                                <TableLayout.Td className="w-[200px]">
                                    {item.petugas
                                        ? item.petugas.no_hp
                                        : "Belum Diterima Oleh Petugas"}
                                </TableLayout.Td>
                            </tr>
                        ))}
                    </tbody>
                </TableLayout.Table>
            </TableLayout>
        </div>
    );
}
