import { useRef, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Scanner() {

    const videoRef =
        useRef<HTMLVideoElement>(null);

    const canvasRef =
        useRef<HTMLCanvasElement>(null);

    const [videoUrl, setVideoUrl] =
        useState("");

    const [cameraReady, setCameraReady] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [showVideoModal, setShowVideoModal] =
        useState(false);


    const openCamera = async () => {

        try {

            setCameraReady(false);

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: {
                            ideal: "environment"
                        },
                        width: {
                            ideal: 1920
                        },
                        height: {
                            ideal: 1080
                        }
                    }
                });

            if (!videoRef.current) {
                return;
            }

            const video =
                videoRef.current;

            video.srcObject =
                stream;

            await video.play();

            await new Promise<void>((resolve) => {

                if (
                    video.videoWidth > 0 &&
                    video.videoHeight > 0
                ) {
                    resolve();
                    return;
                }

                video.onloadedmetadata = () => {
                    resolve();
                };

            });

            setTimeout(() => {

                console.log(
                    "Camera Ready",
                    video.videoWidth,
                    video.videoHeight
                );

                if (
                    video.videoWidth > 0 &&
                    video.videoHeight > 0
                ) {
                    setCameraReady(true);
                }

            }, 1000);

        } catch (err) {

            console.error(err);

            alert(
                "Unable to access camera"
            );

        }

    };

    const capturePhoto = async () => {

        if (
            !videoRef.current ||
            !canvasRef.current
        ) {
            alert(
                "Video or Canvas missing"
            );
            return;
        }

        const video =
            videoRef.current;

        if (
            video.videoWidth === 0 ||
            video.videoHeight === 0
        ) {
            alert(
                "Camera still loading. Please wait a moment."
            );
            return;
        }

        const canvas =
            canvasRef.current;

        canvas.width =
            video.videoWidth;

        canvas.height =
            video.videoHeight;

        const ctx =
            canvas.getContext("2d");

        if (!ctx) {
            alert(
                "Canvas context not found"
            );
            return;
        }

        ctx.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        setLoading(true);

        canvas.toBlob(
            async (blob) => {

                if (!blob) {

                    setLoading(false);

                    alert(
                        "Failed to capture image"
                    );

                    return;
                }

                const formData =
                    new FormData();

                formData.append(
                    "image",
                    blob,
                    "scan.jpg"
                );

                try {

                    const response =
                        await api.post(
                            "/scan",
                            formData,
                            {
                                headers: {
                                    "Content-Type":
                                        "multipart/form-data",
                                },
                            }
                        );

                    console.log(
                        response.data
                    );

                    if (
                        response.data.success &&
                        response.data.video_url
                    ) {

                        setVideoUrl(response.data.video_url);
                        setShowVideoModal(true);

                        // Stop camera
                        const stream =
                            videoRef.current?.srcObject as MediaStream;

                        stream?.getTracks().forEach(track =>
                            track.stop()
                        );

                        setCameraReady(false);

                    } else {

                        alert(
                            "No matching video found"
                        );

                    }

                } catch (err: any) {

                    console.error(err);

                    alert(
                        err?.response?.data?.message ||
                        err.message ||
                        "Scan failed"
                    );

                } finally {

                    setLoading(false);

                }

            },
            "image/jpeg",
            0.95
        );

    };

    return (
        <>
            <Layout>

                {/* ── Breadcrumb + Quick Actions ────────────────────────── */}
                <div className="flex flex-col gap-3 pb-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-medium text-slate-400">Pages / Dashboard</p>
                        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                            Command Center
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">
                            Downlaod
                        </button>
                        <button className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-200/50 transition hover:shadow-lg">
                            View Album
                        </button>
                    </div>
                </div>

                {/* <section id="dashboard" className="xl:grid-cols-[1.25fr_0.75fr]">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-6 text-white shadow-2xl shadow-violet-200/40 sm:p-8">
                        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />



                        <div className="flex items-center gap-3 flex-wrap">
                            <span
                                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm cursor-pointer"
                                onClick={openCamera}>
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                                Live Scanner Online
                            </span>

                            <span
                                className={`inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm ${!cameraReady || loading
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                    }`}
                                onClick={capturePhoto}

                                style={{
                                    marginLeft: "10px",
                                }}
                            >
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                                {loading ? "Scanning..." : "Scan Photo"}
                            </span>
                        </div>


                        <div
                            className={`relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between ${!cameraReady || loading
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                                }`}>

                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                controls={false}
                                style={{
                                    width: "100%",
                                    maxWidth: "600px",
                                    borderRadius: "10px",
                                    background: "#000",
                                }}
                            />
                            <div className="float-soft mx-auto w-full max-w-[500px] xl:max-w-[500px] 2xl:max-w-[600px]">
                                <div className="rounded-3xl border border-white/20 bg-white/10 p-2.5 shadow-2xl backdrop-blur-sm">
                                    <div className="relative overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-slate-900 to-slate-800 p-3">
                                        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-violet-400 via-fuchsia-500 to-cyan-400 p-0.5">
                                            <div className="flex h-full flex-col justify-between rounded-[0.9rem] bg-slate-900/90 p-3 backdrop-blur">
                                                <div className="scan-line absolute inset-x-2 top-8 h-12 rounded-full bg-gradient-to-b from-white/0 via-white/30 to-white/0 blur-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}






                <section id="dashboard">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-6 text-white shadow-2xl shadow-violet-200/40 sm:p-8">

                        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />

                        {/* Action Buttons */}
                        <div className="mb-8 flex items-center gap-3 flex-wrap">

                            <span
                                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm cursor-pointer"
                                onClick={openCamera}
                            >
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                                Live Scanner Online
                            </span>

                            <span
                                className={`inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm ${!cameraReady || loading
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                    }`}
                                onClick={() => {
                                    if (cameraReady && !loading) {
                                        capturePhoto();
                                    }
                                }}
                            >
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                                {loading ? "Scanning..." : "Scan Photo"}
                            </span>

                        </div>

                        {/* Scanner Area */}
                        <div className="flex justify-center">

                            <div className="w-full max-w-[500px]">

                                <div className="rounded-3xl border border-white/20 bg-white/10 p-2.5 shadow-2xl backdrop-blur-sm">

                                    <div className="relative overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-slate-900 to-slate-800 p-3">

                                        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-black">

                                            {/* Live Camera Feed */}
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                muted
                                                playsInline
                                                controls={false}
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />

                                            {/* Scanner Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />

                                            {/* Scanner Line */}
                                            <div className="scan-line absolute inset-x-4 top-8 h-12 rounded-full bg-gradient-to-b from-white/0 via-cyan-300/60 to-white/0 blur-sm" />

                                            {/* Corner Borders */}
                                            <div className="absolute left-4 top-4 h-12 w-12 border-l-4 border-t-4 border-cyan-300 rounded-tl-lg" />
                                            <div className="absolute right-4 top-4 h-12 w-12 border-r-4 border-t-4 border-cyan-300 rounded-tr-lg" />
                                            <div className="absolute bottom-4 left-4 h-12 w-12 border-l-4 border-b-4 border-cyan-300 rounded-bl-lg" />
                                            <div className="absolute bottom-4 right-4 h-12 w-12 border-r-4 border-b-4 border-cyan-300 rounded-br-lg" />

                                            {/* Status */}
                                            <div className="absolute bottom-4 left-0 right-0 text-center">

                                                <div className="inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium backdrop-blur">

                                                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                                                    {loading
                                                        ? "Scanning..."
                                                        : cameraReady
                                                            ? "Camera Ready"
                                                            : "Click Live Scanner Online"}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Related Video */}
                        {showVideoModal && videoUrl && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">

                                {/* Close Button */}
                                <button
                                    onClick={() => {
                                        setShowVideoModal(false);
                                        setVideoUrl("");
                                    }}
                                    className="absolute right-6 top-6 z-50 rounded-full bg-white p-3 text-black shadow-lg"
                                >
                                    ✕
                                </button>

                                {/* Video Container */}
                                <div className="w-[95vw] max-w-6xl">

                                    <video
                                        autoPlay
                                        controls
                                        playsInline
                                        className="w-full rounded-3xl shadow-2xl"
                                    >
                                        <source
                                            src={videoUrl}
                                            type="video/mp4"
                                        />
                                    </video>

                                </div>

                            </div>
                        )}

                        <canvas
                            ref={canvasRef}
                            className="hidden"
                        />

                    </div>
                </section>









                <div
                    style={{
                        padding: "80px",
                        textAlign: "center",
                    }}
                >

                    {/* <h1>
                        Live Photo Scanner
                    </h1>

                    <button
                        onClick={openCamera}
                    >
                        Open Camera
                    </button>

                    <button
                        onClick={capturePhoto}
                        disabled={
                            !cameraReady ||
                            loading
                        }
                        style={{
                            marginLeft: "10px",
                        }}
                    >
                        {
                            loading
                                ? "Scanning..."
                                : "Scan Photo"
                        }
                    </button> */}

                    <br />
                    <br />

                    {/* <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        controls={false}
                        style={{
                            width: "100%",
                            maxWidth: "600px",
                            borderRadius: "10px",
                            background: "#000",
                        }}
                    /> */}

                    <canvas
                        ref={canvasRef}
                        style={{
                            display: "none",
                        }}
                    />

                    {
                        videoUrl && (

                            <div
                                style={{
                                    marginTop: "30px",
                                }}
                            >

                                <h2>
                                    Related Video
                                </h2>

                                <video
                                    width={700}
                                    controls
                                    autoPlay
                                >
                                    <source
                                        src={videoUrl}
                                        type="video/mp4"
                                    />
                                </video>

                            </div>

                        )
                    }

                </div>
            </Layout>
        </>

    );

}

export default Scanner;