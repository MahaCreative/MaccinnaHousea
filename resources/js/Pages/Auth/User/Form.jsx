import React from "react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";
import InputText from "@/Components/Form/InputText";
import { useState } from "react";
import { useEffect } from "react";
import ResponseAlert from "@/Hooks/ResponseAlert";
export default function Form({ setOpen, model, setModel }) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const [preview, setPreview] = useState("");
    const { data, setData, post, reset, errors } = useForm({
        nama_lengkap: "",
        no_hp: "",
        avatar: "",
        email: "",
        password: "",
    });
    const handleImage = (e) => {
        let dataImage = e.target.files[0];
        setPreview(URL.createObjectURL(dataImage));
        setData({ ...data, avatar: e.target.files[0] });
    };
    const imageRef = useRef(null);
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nama_lengkap: model ? model.nama_lengkap : "",
            no_hp: model ? model.no_hp : "",
            avatar: model ? model.avatar : "",
            email: model ? model.email : "",
        });
        setPreview(model ? "/storage/" + model.avatar : "");
    }, [model]);
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("auth.update-data-user"), {
            preserveScroll: true,
            onSuccess: () => {
                showResponse(
                    "success",
                    "Sukses",
                    "Berhasil mengupdate data user"
                );
                setOpen(false);
                setModel([]);
                reset("nama_lengkap", "no_hp", "avatar", "email", "password");
                setPreview("");
            },
            onError: (err) => {
                setOpen(false);
                showResponse(
                    "error",
                    "Errors",
                    "Gagal mengupdate data user, silahkan lengkapi data user dengan benar"
                );
                setTimeout(() => {
                    setOpen(true);
                }, 1500);
            },
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("auth.create-data-user"), {
            preserveScroll: true,
            onSuccess: () => {
                showResponse("success", "Sukses", "Berhasil membuat data user");
                setOpen(false);
                reset("nama_lengkap", "no_hp", "avatar", "email", "password");
                setPreview("");
            },
            onError: (err) => {
                setOpen(false);
                showResponse(
                    "error",
                    "Errors",
                    "Gagal membuat data user, silahkan lengkapi data user dengan benar"
                );
                setTimeout(() => {
                    setOpen(true);
                }, 1500);
            },
        });
    };
    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="flex flex-col md:flex-row gap-3 items-center w-[350px] md:w-[550px] useTransition "
        >
            <div
                onClick={() => imageRef.current.click()}
                className="relative hover:cursor-pointer"
            >
                <img
                    src={`${preview ? preview : "/default_profile.jpg"}`}
                    alt=""
                    className="w-44 h-full"
                />
                <input
                    onChange={handleImage}
                    type="file"
                    className="hidden"
                    ref={imageRef}
                />
                <p className="py-1.5 px-2 rounded-md bg-green-500 text-white absolute top-3 left-3 text-xs">
                    Change Picture
                </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <InputText
                    title={"Nama Lengkap"}
                    placeholder="Nama Lengkap"
                    value={data.nama_lengkap}
                    errors={errors.nama_lengkap}
                    name={"nama_lengkap"}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    title={"Nomor Hp"}
                    placeholder="Nomor Hp"
                    value={data.no_hp}
                    errors={errors.no_hp}
                    name={"no_hp"}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />

                <InputText
                    type="email"
                    title={"Email"}
                    placeholder="Email"
                    value={data.email}
                    errors={errors.email}
                    name={"email"}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <p className="text-xs text-gray-400 font-light">
                    *Biarkan kosong jika tidak ingin mengganti password
                </p>
                <InputText
                    type="password"
                    title={"password"}
                    placeholder="password"
                    value={data.password}
                    errors={errors.password}
                    name={"password"}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <button className="py-2 px-4 rounded-md text-white bg-green-500">
                    Simpan
                </button>
            </div>
        </form>
    );
}
