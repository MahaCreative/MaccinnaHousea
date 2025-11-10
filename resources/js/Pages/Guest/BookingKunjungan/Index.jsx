import TableLayout from "@/Components/Table/TableLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

export default function Index(props) {
    const booking = props.booking;
    return (
        <div className="px-4 md:px-8 lg:px-16 py-16">
            <div className="flex flex-col items-center justify-center gap-1">
                <h3 className="tex-4xl font-semibold text-green-500">
                    Booking Kunjungan
                </h3>
                <p className="text-xs font-light italic text-secondary">
                    Daftar Kunjungan anda
                </p>
            </div>
            <TableLayout>
                <TableLayout.Table>
                    <TableLayout.Thead>
                        <tr>
                            <TableLayout.Th>#</TableLayout.Th>
                            <TableLayout.Th>Nama Rumah</TableLayout.Th>
                            <TableLayout.Th>Nama Pengunjung</TableLayout.Th>
                            <TableLayout.Th>Nomor Pengunjung</TableLayout.Th>
                            <TableLayout.Th>Status Booking</TableLayout.Th>
                            <TableLayout.Th>Nama Petugas</TableLayout.Th>
                            <TableLayout.Th>Nomor Petugas</TableLayout.Th>
                        </tr>
                    </TableLayout.Thead>
                    <tbody>
                        {booking.map((item, key) => (
                            <tr key={key}>
                                <TableLayout.Td className="w-[20px]">
                                    {key++}
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

Index.layout = (page) => (
    <GuestLayout children={page} judul={"History Booking Kunjungan"} />
);
