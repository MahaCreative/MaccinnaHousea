import InputText from "@/Components/Form/InputText";
import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";
import { useForm, Link } from "@inertiajs/react";
export default function Index() {
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
    });
    const loginHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onSuccess: () => {},
            onError: () => {},
        });
    };

    return (
        <div className="px-4 md:px-8 lg:px-6">
            <div className="py-3 px-4 ">
                <h1 className="text-4xl font-semibold text-green-500 mb-4 ">
                    Login
                </h1>
                <form onSubmit={loginHandler} className="flex flex-col gap-3">
                    <InputText
                        title={"Email"}
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        errors={errors.email}
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                    />
                    <InputText
                        title={"Password"}
                        name="password"
                        type="password"
                        placeholder="Password"
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
                            onClick={post}
                        >
                            Login
                        </button>
                        <Link
                            href={route("register")}
                            className="text-xs font-light text-green-500"
                        >
                            Register jika belum punya akun?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} title="Login" />;
