import InputText from "@/Components/Form/InputText";
import QuillCompnent from "@/Components/Form/QuilComponent";
import ResponseAlert from "@/Hooks/ResponseAlert";
import AuthLayout from "@/Layouts/Admin/AuthLayout";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

export default function Create({ model, setModel, setOpen }) {
    const { showResponse, ResponseMethode } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        title: "",
        kontent: "",
        gambar: "",
    });
    const [previewImage, setPreviewImage] = useState("");
    const imageRef = useRef();
    const changeImage = (e) => {
        let image = e.target.files[0];
        setPreviewImage(URL.createObjectURL(image));
        setData({ ...data, gambar: image });
    };
    const imageClick = () => {
        imageRef.current.click();
    };
    const cancellHandler = () => {
        setPreviewImage("");
        reset("gambar", "kontent", "title");
        setModel();
    };
    const updateHandler = (e) => {
        e.preventDefault();
        ResponseMethode(
            "warning",
            "Edit Data?",
            "Apakah anda yakin ingin mengedit data ini?",
            () => {
                post(
                    route("auth.update-data-galery", model.id),

                    {
                        onSuccess: () => {
                            showResponse(
                                "success",
                                "Sukses",
                                "Berhasil memperbaharui data galery"
                            );
                            setModel();
                            reset("gambar", "kontent", "title");
                            setPreviewImage("");
                        },
                    }
                );
            },
            () => {}
        );
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("auth.store-data-galery"), {
            preserveScroll: true,
            onSuccess: () => {
                reset("gambar", "kontent", "title");
                setPreviewImage("");
                showResponse(
                    "success",
                    "Sukses Tambah Foto",
                    "1 Foto baru berhasil di tambahkan kedalam galery"
                );
            },onError:(err) =>{
                showResponse(
                    "error",
                    "Gagal",
                    "gagal menambahkan 1 galery baru, silahkan periksa kembali isian anda"
                );
            }
        });
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            title: model ? model.title : "",
            kontent: model ? model.kontent : "",
            gambar: model ? model.gambar : "",
        });
        setPreviewImage(model ? "/storage/" + model.gambar : "");
    }, [model]);
    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="flex flex-col gap-3"
        >
            <div
                onClick={imageClick}
                className="relative hover:cursor-pointer w-full overflow-hidden"
            >
                <div className="absolute top-2 left-2 bg-blue-700 text-white py-1 px-2 font-thin rounded-md">
                    Change Picture
                </div>
                <img
                    src={`${
                        previewImage ? previewImage : "/default_profile.jpg"
                    }`}
                    alt=""
                    className="w-full h-[200px] object-cover rounded-md shadow-sm shadow-gray-400/50 useTransition"
                />
                <input
                    ref={imageRef}
                    type="file"
                    className="hidden"
                    onChange={changeImage}
                />
                {errors.gambar && (
                    <div className="absolute bottom-2 right-2 bg-red-500 font-thin text-white text-xs rounded-md px-2 py-1 animate-pulse">
                        {errors.gambar}
                    </div>
                )}
            </div>
            <InputText
                name="title"
                errors={errors.title}
                value={data.title}
                title={"Judul Galery"}
                onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <div className="flex justify-between items-center">
                <h2 className="text-blue-700 font-light">Deskripsi Foto</h2>
                <div className=" flex gap-3 items-center">
                    <button
                        type=""
                        className="bg-blue-500 hover:bg-blue-600 useTransition py-1.5 px-4 text-white font-light rounded-md"
                    >
                        Submit
                    </button>
                    <button
                        onClick={cancellHandler}
                        type="button"
                        className="bg-red-500 hover:bg-red-600 useTransition py-1.5 px-4 text-white font-light rounded-md"
                    >
                        Cancell
                    </button>
                </div>
            </div>
            <QuillCompnent
                height="50px"
                value={data.kontent}
                errors={errors.content}
                onChange={(e) => setData({ ...data, kontent: e })}
            />
        </form>
    );
}

Create.layout = (page) => (
    <AuthLayout children={page} title={"Create Galery"} />
);
