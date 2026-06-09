import { useState } from "react";

import Layout from "../components/Layout";
import api from "../services/api";

export default function CreateAlbum() {

  const [albumName, setAlbumName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const saveAlbum = async () => {

    try {

      const response = await api.post(
        "/albums",
        {
          album_name: albumName,
          customer_name: customerName,
          mobile,
        }
      );

      setSuccess(
        `Album Created Successfully! (ID: ${response.data.id})`
      );

      setAlbumName("");
      setCustomerName("");
      setMobile("");

    } catch (err) {

      console.error(err);

      setError(
        "Failed to create album"
      );
    }
  };

  return (
    <Layout>

      <section className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-400">
            Pages / Create Album
          </p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            Create New Album
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create personalized photo-to-video albums for your customers.
          </p>
        </div>

        {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">

    {/* Decorative Blur */}
    <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-violet-100 blur-3xl" />
    <div className="absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-fuchsia-100 blur-3xl" />

    <div className="relative z-10">

        {/* Badge */}
        <div className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700">
                ✨ Album Creation Wizard
            </span>
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

        {/* Form */}
        <div className="grid gap-6 md:grid-cols-2">

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Album Name
                </label>

                <input
                    type="text"
                    value={albumName}
                    onChange={(e) =>
                        setAlbumName(e.target.value)
                    }
                    placeholder="Wedding Album 2026"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder-slate-400 outline-none transition focus:border-violet-500 focus:bg-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Customer Name
                </label>

                <input
                    type="text"
                    value={customerName}
                    onChange={(e) =>
                        setCustomerName(e.target.value)
                    }
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder-slate-400 outline-none transition focus:border-violet-500 focus:bg-white"
                />
            </div>

            <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Mobile Number
                </label>

                <input
                    type="text"
                    value={mobile}
                    onChange={(e) =>
                        setMobile(e.target.value)
                    }
                    placeholder="+91 9876543210"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder-slate-400 outline-none transition focus:border-violet-500 focus:bg-white"
                />
            </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">

            <button
                onClick={saveAlbum}
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
                Create Album
            </button>

            <button
                onClick={() => {
                    setAlbumName("");
                    setCustomerName("");
                    setMobile("");
                }}
                className="rounded-2xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
                Reset
            </button>

        </div>

    </div>

</div>

      </section>
    </Layout>
  );
}