import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

interface Album {
    id: number;
    album_name: string;
    customer_name: string;
}

export default function UploadMedia() {

    const [albums, setAlbums] = useState<Album[]>([]);

    const [albumId, setAlbumId] = useState("");

    const [photo, setPhoto] =
        useState<File | null>(null);

    const [video, setVideo] =
        useState<File | null>(null);

    const [success, setSuccess] =
        useState("");

    const [error, setError] =
        useState("");

    const videoInputRef =
        useRef<HTMLInputElement>(null);

    const photoInputRef =
        useRef<HTMLInputElement>(null);
    const [uploading, setUploading] =
        useState(false);


    useEffect(() => {
        loadAlbums();
    }, []);

    const loadAlbums = async () => {
        try {
            const response =
                await api.get("/albums");

            setAlbums(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const uploadMedia = async () => {

        setSuccess("");
        setError("");

        if (
            !albumId ||
            !photo ||
            !video
        ) {
            setError(
                "Please select album, photo and video"
            );
            return;
        }

        setUploading(true);

        try {

            const formData =
                new FormData();

            formData.append(
                "album_id",
                albumId
            );

            formData.append(
                "photo",
                photo
            );

            formData.append(
                "video",
                video
            );

            const response =
                await api.post(
                    "/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

            console.log(response.data);

            setSuccess(
                "Photo & Video Pair Saved Successfully"
            );

        } catch (err) {

            console.error(err);

            setError(
                "Upload Failed"
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <Layout>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">

                {/* Decorative Blur */}
                <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-violet-100 blur-3xl" />
                <div className="absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-fuchsia-100 blur-3xl" />

                <div className="relative z-10">

                    {/* Header */}
                    <div className="mb-8">



                        <h2 className="mt-4 text-3xl font-bold text-slate-900">
                            Create Live Photo Pair
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Upload a photo and connect it with a related video.
                        </p>

                    </div>

                    {/* Alerts */}
                    {success && (
                        <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Album Selection */}
                    <div className="mb-6">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Select Album
                        </label>

                        <select
                            value={albumId}
                            onChange={(e) =>
                                setAlbumId(e.target.value)
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white"
                        >
                            <option value="">
                                Choose Album
                            </option>

                            {albums.map((album) => (
                                <option
                                    key={album.id}
                                    value={album.id}
                                >
                                    {album.album_name} - {album.customer_name}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Upload Section */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div
                            className="cursor-pointer rounded-3xl border border-dashed border-violet-300 bg-violet-50 p-6 transition hover:border-violet-500 hover:bg-violet-100"
                            onClick={() => photoInputRef.current?.click()}
                        >
                            <div className="text-center">

                                <div className="mb-3 text-4xl">
                                    📸
                                </div>

                                <h3 className="font-semibold text-slate-800">
                                    Related Photo
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Click anywhere to upload image
                                </p>

                                <input
                                    ref={photoInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            setPhoto(
                                                e.target.files[0]
                                            );
                                        }
                                    }}
                                />

                                {photo ? (
                                    <div className="mt-4">

                                        <p className="font-medium text-emerald-600">
                                            ✓ {photo.name}
                                        </p>

                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="Preview"
                                            className="mx-auto mt-4 max-h-40 rounded-xl border"
                                        />

                                    </div>
                                ) : (
                                    <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-slate-400">
                                        Click to select image
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Video Upload */}
                        <div
                            className="cursor-pointer rounded-3xl border border-dashed border-fuchsia-300 bg-fuchsia-50 p-6 transition hover:border-fuchsia-500 hover:bg-fuchsia-100"
                            onClick={() => videoInputRef.current?.click()}
                        >
                            <div className="text-center">

                                <div className="mb-3 text-4xl">
                                    🎥
                                </div>

                                <h3 className="font-semibold text-slate-800">
                                    Related Video
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Click anywhere to upload video
                                </p>

                                <input
                                    ref={videoInputRef}
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            setVideo(
                                                e.target.files[0]
                                            );
                                        }
                                    }}
                                />

                                {video ? (
                                    <div className="mt-4">

                                        <p className="font-medium text-emerald-600">
                                            ✓ {video.name}
                                        </p>

                                        <video
                                            className="mx-auto mt-4 max-h-40 rounded-xl border"
                                            controls
                                        >
                                            <source
                                                src={URL.createObjectURL(video)}
                                                type={video.type}
                                            />
                                        </video>

                                    </div>
                                ) : (
                                    <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-slate-400">
                                        Click to select video
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex gap-4">

                        <button
                            onClick={uploadMedia}
                            disabled={uploading}
                            className={`rounded-2xl px-8 py-4 font-bold text-white shadow-lg transition ${uploading
                                    ? "cursor-not-allowed bg-slate-400"
                                    : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105"
                                }`}
                        >
                            {uploading ? (
                                <span className="flex items-center gap-3">
                                    <svg
                                        className="h-5 w-5 animate-spin"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            opacity="0.25"
                                        />
                                        <path
                                            d="M22 12a10 10 0 00-10-10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                    </svg>

                                    Uploading...
                                </span>
                            ) : (
                                "Save Live Pair"
                            )}
                        </button>
                        <button
                            onClick={() => {
                                setPhoto(null);
                                setVideo(null);
                                setAlbumId("");
                            }}
                            className="rounded-2xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Reset
                        </button>

                    </div>

                </div>

            </div>

        </Layout>
    );
}