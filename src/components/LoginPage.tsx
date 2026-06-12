
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");
    const navigate = useNavigate();


    const login = async () => {
        try {
            setLoading(true);
            setError("");

            if (email === "admin" && password === "admin" || password === "Admin") {
                localStorage.setItem("token", "dummy-admin-token");
                navigate("/dashboard");
            } else {
                setError("Invalid Email or Password");
            }
        } catch (err) {
            setError("Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (


        <div className="grid min-h-screen lg:grid-cols-[58%_42%]">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 px-12 py-10">
                <div className="mt-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-violet-700 shadow-sm">
                        ✨ Smart Memory Recognition
                    </div>

                    <h1 className="mt-8 max-w-xl text-4xl font-black leading-tight text-slate-900">

                        Turn Photos Into Living

                        <span className="text-violet-600">
                            &nbsp;Memories
                        </span>

                    </h1>

                    <p className="mt-8 text-xl text-center leading-9 text-slate-600">

                        Scan wedding photos, birthday memories,
                        travel moments and family pictures.
                        Instantly watch the related video come alive.

                    </p>

                </div>

                {/* Scanner Illustration */}
                <div className="mt-12 rounded-[32px] bg-white p-8 shadow-xl">

                    <div className="aspect-video rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-6" >

                        <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-white/40">

                            <div className="text-center text-white">

                                <div className="text-6xl">
                                    📸
                                </div>

                                <h3 className="mt-4 text-2xl font-bold">
                                    Scan Photo
                                </h3>

                                <p className="mt-2 text-white/80">
                                    Match Found → Play Video
                                </p>

                            </div>

                        </div>

                    </div>

                </div>



            </div>

            {/* RIGHT PANEL */}

            <div className="flex items-center justify-center bg-slate-50 px-10">

                <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-2xl">

                    <h2 className="text-3xl font-bold text-slate-900">
                        Welcome Back
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Login to access your albums
                    </p>

                    {error && (

                        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
                            {error}
                        </div>

                    )}

                    <div className="mt-8 space-y-5">

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                placeholder="admin"
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-5
                            py-4
                            outline-none
                            transition
                            focus:border-violet-500
                            focus:bg-white
                        "
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-5
                            py-4
                            outline-none
                            transition
                            focus:border-violet-500
                            focus:bg-white
                        "
                            />

                        </div>

                        <div className="flex items-center justify-between">

                            <label className="flex items-center gap-2 text-sm text-slate-600">

                                <input type="checkbox" />

                                Remember Me

                            </label>

                            <button className="text-sm font-medium text-violet-600">
                                Forgot Password?
                            </button>

                        </div>

                        <button
                            onClick={login}
                            disabled={loading}
                            className="
                        w-full
                        rounded-2xl
                        bg-gradient-to-r
                        from-violet-600
                        to-fuchsia-600
                        py-4
                        text-lg
                        font-bold
                        text-white
                        shadow-lg
                        transition
                        hover:shadow-xl
                    "
                        >
                            {loading
                                ? "Signing In..."
                                : "Access Dashboard"}
                        </button>

                        <div className="border-t border-slate-100 pt-6 text-center text-sm text-slate-400">

                            © 2026 AARA LiveLens —
                            Turn Photos Into Memories

                        </div>

                    </div>

                </div>

            </div>

        </div>



    );

}