import InputText from "@/Components/Form/InputText";
import ResponseAlert from "@/Hooks/ResponseAlert";
import AuthLayout from "@/Layouts/Admin/AuthLayout";

import { useForm, usePage } from "@inertiajs/react";
import React, { useRef, useState } from "react";

export default function Index(props) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const { auth } = usePage().props;
    const imageRef = useRef();
    const [previewImage, setPreviewImage] = useState(null);
    const { data, setData, post, reset, errors } = useForm({
        nama_lengkap: auth.user.nama_lengkap,
        no_hp: auth.user.no_hp,
        avatar: auth.user.avatar,
        email: auth.user.email,
        password: "",
    });
    const changeImage = (e) => {
        let image = e.target.files[0];
        setPreviewImage(URL.createObjectURL(image));
        setData({ ...data, avatar: image });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        ResponseMethode(
            "warning",
            "Warning",
            "Apakah data yang anda masukkan sudah benar?",
            () => {
                post(route("update-profile"));
            }
        );
    };

    return (
        <div className="px-8">
            <div className="w-full flex flex-col items-center justify-center">
                <p className="font-bold tracking-tighter text-3xl text-green-500">
                    My Profile
                </p>
                <p className="italic my-3 font-light">
                    Silahkan mengupdate profile anda pada form dibawah ini
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-top bg-white shadow-md shadow-gray-500/50 border border-green-500 py-3 px-4 rounded-md">
                <div
                    onClick={() => imageRef.current.click()}
                    className="hover:cursor-pointer md:w-[340px] h-[350px] w-full rounded-md relative"
                >
                    <img
                        src={`${
                            previewImage
                                ? previewImage
                                : "/storage/" + auth.user.avatar
                        }`}
                        alt=""
                        className="w-full md:w-[340px] h-[350px]  object-cover object-center rounded-md"
                    />
                    <input
                        ref={imageRef}
                        type="file"
                        onChange={changeImage}
                        hidden
                    />
                    <div className="absolute top-3 left-3 w-full ">
                        <p className="py-2 px-3 rounded-md bg-green-500 text-white inline">
                            Change Picture
                        </p>
                    </div>
                </div>
                <form onSubmit={submitHandler} action="" className="w-full">
                    <InputText
                        errors={errors.nama_lengkap}
                        className={"w-full"}
                        title={"Nama Lengkap"}
                        value={data.nama_lengkap}
                        onChange={(e) =>
                            setData({ ...data, nama_lengkap: e.target.value })
                        }
                    />
                    <InputText
                        errors={errors.no_hp}
                        className={"w-full"}
                        title={"Nomor Handphone"}
                        value={data.no_hp}
                        onChange={(e) =>
                            setData({ ...data, no_hp: e.target.value })
                        }
                    />
                    <InputText
                        errors={errors.email}
                        className={"w-full"}
                        title={"Email"}
                        value={data.email}
                        type="email"
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                    />
                    <InputText
                        errors={errors.password}
                        className={"w-full"}
                        title={"Password"}
                        type="password"
                        onChange={(e) =>
                            setData({ ...data, passworde: e.target.value })
                        }
                        value={data.password}
                    />
                    <p className="text-xs font-light italic">
                        *Biarkan kosong jika tidak ingin mengganti password anda
                    </p>
                    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-md">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
