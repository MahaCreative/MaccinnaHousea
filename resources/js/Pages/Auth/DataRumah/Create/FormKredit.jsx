import CostumSelect from "@/Components/Form/CostumSelect";
import CurrencyInputs from "@/Components/Form/CurrencyInput";
import InputText from "@/Components/Form/InputText";
import SelectOption from "@/Components/Form/SelectOption";
import useBankKreditAction from "@/Components/Function/BankKreditFunction";
import { useForm } from "@inertiajs/react";
import { Check, Close, DeleteForever } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function FormKredit({ form, setForm, errors }) {
    const [data, setData] = useState({
        nama_bank: [],
        bank_kredit_id: [],
        harga_bangunan: [],
        uang_muka: [],
        harga_cicilan: [],
        jumlah_cicilan: [],
    });
    const [multipleData, setMultipleData] = useState({
        nama_bank: "",
        bank_kredit_id: "",
        harga_bangunan: "",
        uang_muka: "",
        harga_cicilan: "",
        jumlah_cicilan: "",
    });
    const [formBank, setFormBank] = useState({
        nama_bank: "",
        logo_bank: "",
    });
    const {
        getDataBankKredit,
        submitBank,
        deleteBank,
        dataBank,
        errors: errorsBank,
    } = useBankKreditAction();
    const getDataBank = () => {
        getDataBankKredit();
    };
    useEffect(() => {
        getDataBank();
    }, []);
    const changeHandler = (e) => {
        if (e.target.value == "bri") {
            setFormBank({
                ...formBank,
                nama_bank: "bri",
                logo_bank: "LogoBank/bri.png",
            });
        } else if (e.target.value == "bni") {
            setFormBank({
                ...formBank,
                nama_bank: "bni",
                logo_bank: "LogoBank/bni.png",
            });
        } else if (e.target.value == "btn") {
            setFormBank({
                ...formBank,
                nama_bank: "btn",
                logo_bank: "LogoBank/btn.png",
            });
        } else if (e.target.value == "panin") {
            setFormBank({
                ...formBank,
                nama_bank: "panin",
                logo_bank: "LogoBank/panin.png",
            });
        } else if (e.target.value == "sea bank") {
            setFormBank({
                ...formBank,
                nama_bank: "sea bank",
                logo_bank: "LogoBank/seabank.png",
            });
        }
    };
    const tambahDataBank = () => {
        submitBank(formBank);
        getDataBank();
    };
    const deleteBankHandler = (id) => {
        deleteBank(id);
        getDataBank();
    };
    const moreInput = () => {
        const nama_bank = [...form.nama_bank];
        const bank_kredit_id = [...form.bank_kredit_id];
        const harga_bangunan = [...form.harga_bangunan];
        const uang_muka = [...form.uang_muka];
        const harga_cicilan = [...form.harga_cicilan];
        const jumlah_cicilan = [...form.jumlah_cicilan];
        nama_bank.push(multipleData.nama_bank);
        bank_kredit_id.push(multipleData.bank_kredit_id);
        harga_bangunan.push(multipleData.harga_bangunan);
        uang_muka.push(multipleData.uang_muka);
        harga_cicilan.push(multipleData.harga_cicilan);
        jumlah_cicilan.push(multipleData.jumlah_cicilan);
        setForm({
            ...form,
            nama_bank: nama_bank,
            bank_kredit_id: bank_kredit_id,
            harga_bangunan: harga_bangunan,
            uang_muka: uang_muka,
            harga_cicilan: harga_cicilan,
            jumlah_cicilan: jumlah_cicilan,
        });
        setMultipleData({
            ...multipleData,
            nama_bank: "",
            bank_kredit_id: "",
            harga_bangunan: "",
            uang_muka: "",
            harga_cicilan: "",
            jumlah_cicilan: "",
        });
    };
    const deleteInput = (index) => {
        setForm((prevData) => ({
            nama_bank: prevData.nama_bank.filter((_, i) => i !== index),
            bank_kredit_id: prevData.bank_kredit_id.filter(
                (_, i) => i !== index
            ),
            harga_bangunan: prevData.harga_bangunan.filter(
                (_, i) => i !== index
            ),
            uang_muka: prevData.uang_muka.filter((_, i) => i !== index),
            harga_cicilan: prevData.harga_cicilan.filter((_, i) => i !== index),
            jumlah_cicilan: prevData.jumlah_cicilan.filter(
                (_, i) => i !== index
            ),
        }));
    };
    return (
        <tbody>
            <tr class="bg-white border-b dark:bg-blue-800 dark:border-blue-700">
                <th
                    scope="row"
                    class="px-6 py-4 font-medium text-blue-900 whitespace-nowrap dark:text-white"
                >
                    <CostumSelect
                        value={multipleData.nama_bank}
                        placeholder="Pilih data bank"
                    >
                        {dataBank.length > 0 &&
                            dataBank.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 items-center tracking-tighter leading-3 my-2 uppercase"
                                >
                                    <div className="flex gap-2 items-center">
                                        <img
                                            src={"/storage/" + item.logo_bank}
                                            className="w-10"
                                            alt=""
                                        />
                                        <p>{item.nama_bank}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        {multipleData.bank_kredit_id ==
                                        item.id ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMultipleData({
                                                        ...setMultipleData,
                                                        nama_bank: "",
                                                        bank_kredit_id: "",
                                                    })
                                                }
                                                className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-red-500 text-center justify-center items-center"
                                            >
                                                <Tooltip
                                                    title={`Batal Pilih Bank ${item.nama_bank}`}
                                                >
                                                    <Close
                                                        color="inherit"
                                                        fontSize="inherit"
                                                    />
                                                </Tooltip>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMultipleData({
                                                        ...multipleData,
                                                        nama_bank:
                                                            item.nama_bank,
                                                        bank_kredit_id: item.id,
                                                    })
                                                }
                                                className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-blue-500 text-center justify-center items-center"
                                            >
                                                <Tooltip
                                                    title={`Pilih Tipe ${item.nama_bank}`}
                                                >
                                                    <Check
                                                        color="inherit"
                                                        fontSize="inherit"
                                                    />
                                                </Tooltip>
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteBankHandler(item.id)
                                            }
                                            className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-red-500 text-center justify-center items-center"
                                        >
                                            <Tooltip
                                                title={`Hapus Bank ${item.nama_bank}`}
                                            >
                                                <DeleteForever
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </Tooltip>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        {/* fungsi untuk menambahkan data bank ke database */}
                        <div className="flex gap-2 items-center">
                            <SelectOption
                                onChange={changeHandler}
                                errors={errorsBank}
                            >
                                <option value="">Pilih Bank</option>
                                <option value="bri">BRI</option>
                                <option value="bni">BNI</option>
                                <option value="btn">BTN</option>
                                <option value="panin">Panin</option>
                                <option value="sea bank">Sea Bank</option>
                            </SelectOption>
                            <button
                                type="button"
                                onClick={tambahDataBank}
                                className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-blue-500 text-center justify-center items-center"
                            >
                                <Tooltip title={`Tambahkan Bank Kredit`}>
                                    <Check color="inherit" fontSize="inherit" />
                                </Tooltip>
                            </button>
                        </div>
                    </CostumSelect>
                </th>
                <td class="px-6 py-4">
                    <CurrencyInputs
                        prefix="Rp. "
                        value={multipleData.harga_bangunan}
                        onValueChange={(value) =>
                            setMultipleData({
                                ...multipleData,
                                harga_bangunan: value,
                            })
                        }
                    />
                </td>
                <td class="px-6 py-4">
                    <CurrencyInputs
                        prefix="Rp. "
                        value={multipleData.uang_muka}
                        onValueChange={(value) =>
                            setMultipleData({
                                ...multipleData,
                                uang_muka: value,
                            })
                        }
                    />
                </td>
                <td class="px-6 py-4">
                    <CurrencyInputs
                        prefix="Rp. "
                        value={multipleData.harga_cicilan}
                        onValueChange={(value) =>
                            setMultipleData({
                                ...multipleData,
                                harga_cicilan: value,
                            })
                        }
                    />
                </td>
                <td class="px-6 py-4">
                    <InputText
                        onChange={(e) =>
                            setMultipleData({
                                ...multipleData,
                                jumlah_cicilan: e.target.value,
                            })
                        }
                        value={multipleData.jumlah_cicilan}
                        type="number"
                    />
                </td>
                <td class="px-6 py-4">
                    <CurrencyInputs
                        prefix="Rp. "
                        disabled
                        value={
                            multipleData.jumlah_cicilan *
                            multipleData.harga_cicilan
                        }
                    />
                </td>
                <td>
                    <button
                        type="button"
                        onClick={moreInput}
                        className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-green-500 text-center justify-center items-center"
                    >
                        <Tooltip title={`Tambahkan Data Cicilan Lagi`}>
                            <Check color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </td>
            </tr>
            {form.bank_kredit_id.length > 0 && (
                <tr>
                    <th colSpan={5} className="text-center">
                        Data Harga Kredit Yang Telah Ditambahkan
                    </th>
                </tr>
            )}
            {form.bank_kredit_id.length > 0 &&
                form.bank_kredit_id.map((item, key) => (
                    <tr
                        key={key}
                        class="bg-white border-b dark:bg-blue-800 dark:border-blue-700"
                    >
                        <th
                            scope="row"
                            class="px-6 py-4 font-medium text-blue-900 whitespace-nowrap dark:text-white"
                        >
                            <CostumSelect
                                errors={errors[`bank_kredit.${key}`]}
                                value={form.nama_bank[key]}
                                placeholder="Pilih data bank"
                            >
                                {dataBank.length > 0 &&
                                    dataBank.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-4 items-center tracking-tighter leading-3 my-2 uppercase"
                                        >
                                            <div className="flex gap-2 items-center">
                                                <img
                                                    src={
                                                        "/storage/" +
                                                        item.logo_bank
                                                    }
                                                    className="w-10"
                                                    alt=""
                                                />
                                                <p>{item.nama_bank}</p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                {data.bank_kredit_id[key] ==
                                                item.id ? (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setForm({
                                                                ...form,
                                                                nama_bank:
                                                                    form.nama_bank.map(
                                                                        (
                                                                            item,
                                                                            idx
                                                                        ) =>
                                                                            idx ===
                                                                            index
                                                                                ? ""
                                                                                : item
                                                                    ),
                                                                bank_kredit_id:
                                                                    form.bank_kredit_id.map(
                                                                        (
                                                                            item,
                                                                            idx
                                                                        ) =>
                                                                            idx ===
                                                                            index
                                                                                ? ""
                                                                                : item
                                                                    ),
                                                            })
                                                        }
                                                        className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-red-500 text-center justify-center items-center"
                                                    >
                                                        <Tooltip
                                                            title={`Batal Pilih Bank ${item.nama_bank}`}
                                                        >
                                                            <Close
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        </Tooltip>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setForm({
                                                                ...form,
                                                                nama_bank:
                                                                    form.nama_bank.map(
                                                                        (
                                                                            i,
                                                                            idx
                                                                        ) =>
                                                                            idx ===
                                                                            key
                                                                                ? item.nama_bank
                                                                                : i
                                                                    ),

                                                                bank_kredit_id:
                                                                    form.bank_kredit_id.map(
                                                                        (
                                                                            i,
                                                                            idx
                                                                        ) =>
                                                                            idx ===
                                                                            key
                                                                                ? item.id
                                                                                : i
                                                                    ),
                                                            })
                                                        }
                                                        className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-blue-500 text-center justify-center items-center"
                                                    >
                                                        <Tooltip
                                                            title={`Pilih Tipe ${item.nama_bank}`}
                                                        >
                                                            <Check
                                                                color="inherit"
                                                                fontSize="inherit"
                                                            />
                                                        </Tooltip>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                {/* fungsi untuk menambahkan data bank ke database */}
                            </CostumSelect>
                        </th>
                        <td class="px-6 py-4">
                            <CurrencyInputs
                                errors={errors[`harga_bangunan.${key}`]}
                                prefix="Rp. "
                                value={form.harga_bangunan[key]}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        harga_bangunan: form.harga_bangunan.map(
                                            (item, idx) =>
                                                idx === key ? value : item
                                        ),
                                    })
                                }
                            />
                        </td>
                        <td class="px-6 py-4">
                            <CurrencyInputs
                                errors={errors[`uang_muka.${key}`]}
                                prefix="Rp. "
                                value={form.uang_muka[key]}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        uang_muka: form.uang_muka.map(
                                            (item, idx) =>
                                                idx === key ? value : item
                                        ),
                                    })
                                }
                            />
                        </td>
                        <td class="px-6 py-4">
                            <CurrencyInputs
                                errors={errors[`harga_cicilan.${key}`]}
                                prefix="Rp. "
                                value={form.harga_cicilan[key]}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        harga_cicilan: form.harga_cicilan.map(
                                            (item, idx) =>
                                                idx === key ? value : item
                                        ),
                                    })
                                }
                            />
                        </td>
                        <td class="px-6 py-4">
                            <InputText
                                errors={errors[`jumlah_cicilan.${key}`]}
                                onChange={(value) =>
                                    setForm({
                                        ...form,
                                        jumlah_cicilan: form.jumlah_cicilan.map(
                                            (item, idx) =>
                                                idx === key
                                                    ? value.target.value
                                                    : item
                                        ),
                                    })
                                }
                                value={form.jumlah_cicilan[key]}
                                type="number"
                            />
                        </td>
                        <td class="px-6 py-4">
                            <CurrencyInputs
                                prefix="Rp. "
                                disabled
                                value={
                                    form.jumlah_cicilan[key] *
                                    form.harga_cicilan[key]
                                }
                            />
                        </td>
                        <td>
                            <button
                                type="button"
                                onClick={() => deleteInput(key)}
                                className="flex text-white leading-3 tracking-tighter hover:cursor-pointer h-5 w-5 rounded-full bg-red-500 text-center justify-center items-center"
                            >
                                <Tooltip title={`Hapus data ini`}>
                                    <Close color="inherit" fontSize="inherit" />
                                </Tooltip>
                            </button>
                        </td>
                    </tr>
                ))}
        </tbody>
    );
}
