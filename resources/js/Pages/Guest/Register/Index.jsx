import InputText from "@/Components/Form/InputText";
import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";
import { useForm, Link } from "@inertiajs/react";
import ResponseAlert from "@/Hooks/ResponseAlert";
export default function Index() {
    const { showResponse } = ResponseAlert();
    const { data, setData, post, reset, errors } = useForm({
        nama_lengkap: "",
        no_hp: "",
        avatar: "",
        email: "",
        password: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        post(route("store.register"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Register berhasil dilakukan, dan anda telah berhasil login"
                );
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Register gagal dilakukan, silahkan periksa kembali isian anda. Error Code: " +
                        err
                );
            },
        });
    };
    return (
        <div className="px-4 md:px-8 lg:px-6">
            <div className="py-3 px-4 ">
                <h1 className="text-4xl font-semibold text-green-500 mb-4 ">
                    Buat Akun
                </h1>
                <form action="" onSubmit={submitHandler}>
                    <div className="flex justify-between items-center gap-2">
                        <InputText
                            className={"w-full"}
                            name="nama_lengkap"
                            type="text"
                            placeholder="Nama Lengkap"
                            title={"Nama Lengkap"}
                            value={data.nama_lengkap}
                            errors={errors.nama_lengkap}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    nama_lengkap: e.target.value,
                                })
                            }
                        />
                        <InputText
                            className={"w-full"}
                            name="no_hp"
                            type="text"
                            placeholder="Nomor Hp"
                            title={"Nomor Hp"}
                            value={data.no_hp}
                            errors={errors.no_hp}
                            onChange={(e) =>
                                setData({ ...data, no_hp: e.target.value })
                            }
                        />
                    </div>
                    <InputText
                        name="avatar"
                        type="file"
                        placeholder="Avatar"
                        title={"Avatar"}
                        errors={errors.avatar}
                        onChange={(e) =>
                            setData({ ...data, avatar: e.target.files[0] })
                        }
                    />
                    <InputText
                        name="email"
                        type="email"
                        placeholder="Email"
                        title={"Email"}
                        value={data.email}
                        errors={errors.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                    />
                    <InputText
                        name="password"
                        type="password"
                        placeholder="Password"
                        title={"Password"}
                        value={data.password}
                        errors={errors.password}
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                    />
                    <div className="flex gap-3 items-center w-full mt-5">
                        <button
                            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
                            type="submit"
                        >
                            Register
                        </button>
                        <Link
                            href={route("login")}
                            className="text-xs font-light text-green-500"
                        >
                            Login jika sudah punya akun?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} title="Login" />;
