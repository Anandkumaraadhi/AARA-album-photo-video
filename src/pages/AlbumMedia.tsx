import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

import type { Media } from "../types/Media";
import Layout from "../components/Layout";

function AlbumMedia() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [media, setMedia] =
    useState<Media[]>([]);

  const [selectedMedia, setSelectedMedia] =
    useState<Media | null>(null);

  useEffect(() => {
    api.get(`/albums/${id}/media`)
      .then((res) => {

        if (Array.isArray(res.data)) {
          setMedia(res.data);
          // if (res.data.length > 0) {
          //   setSelectedMedia(res.data[0]);
          // }

        }

      });
  }, [id]);

  return (
    <Layout>
      <div
        className="
          sticky top-0 z-30 mb-5
          flex items-center justify-between
          rounded-2xl border border-slate-200
          bg-white/90 px-4 py-3
          shadow-sm shadow-slate-100
          backdrop-blur-xl
          sm:px-5" >
        {/* Left Side */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="
                  rounded-xl
                  border border-slate-200
                  px-4 py-2
                  text-sm font-semibold
                  text-slate-600
                  hover:bg-slate-50">
            ← Back
          </button>
        </div>

        {/* Right Side */}
        <div>
          <p className="text-sm font-semibold text-violet-600">
            Album Gallery
          </p>

        </div>
      </div>



      {/* {selectedVideo && (
        <div
          className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/70 p-4
        "
          onClick={() => setSelectedVideo("")}
        >
          <div
            className="
            relative w-full max-w-5xl
            rounded-3xl bg-white
            overflow-hidden
          "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo("")}
              className="
              absolute top-4 right-4
              z-10 rounded-full bg-white
              px-3 py-1 shadow
            "
            >
              ✕
            </button>

            <video
              className="w-full"
              controls
              autoPlay
            >
              <source
                src={selectedVideo}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      )} */}

      <div className="w-full mb-8 rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-6 text-white shadow-2xl shadow-violet-200/40 sm:p-8 mt-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
          Live scanner online
        </span>
        <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
          Scan a photo.{" "}
          <span className="bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
            Watch memories come alive.
          </span>
        </h2>
        <p className="mt-4 max-w-lg text-base leading-7 text-white/75 sm:text-lg">
          LiveLens connects printed photos to matching videos instantly. Build interactive albums with real-time AI recognition.
        </p>
        {/* <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="#scanner" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-violet-700 shadow-lg shadow-black/10 transition hover:shadow-xl">
            📷 Start Live Scan
          </a>
        </div> */}
      </div>


      <section id="dashboard" className="grid gap-5 xl:grid-cols-12">

        <div className="xl:col-span-5 relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-6 text-white shadow-2xl shadow-violet-200/40 sm:p-8">
          {media.map((item) => (
            <>
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />
              <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                <div className="float-soft mx-auto w-full max-w-[550px] xl:max-w-[500px] 2xl:max-w-[600px]">
                  <div className="rounded-3xl border border-white/20 bg-white/10 p-2.5 shadow-2xl backdrop-blur-sm">
                    <div className="relative overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-slate-900 to-slate-800 p-3">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-violet-400 via-fuchsia-500 to-cyan-400 p-0.5">
                        <div className="flex h-full flex-col justify-between rounded-[0.9rem] bg-slate-900/90 p-3 backdrop-blur"
                          onClick={() =>
                            setSelectedMedia(item)
                          }
                        >

                          <img

                            src={item.photo_url}
                            alt=""
                            className="
                                      h-full
                                      w-full
                                      object-cover
                                      transition duration-500
                                      group-hover:scale-105
                                    "
                          />

                          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/15 bg-white/10 text-3xl">🎞️</div>

                          <div className="scan-line absolute inset-x-2 top-8 h-12 rounded-full bg-gradient-to-b from-white/0 via-white/30 to-white/0 blur-sm" />
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="pulse-glow absolute -right-1 top-8 h-4 w-4 rounded-full bg-emerald-400" />
                </div>
              </div>
            </>
          ))}
        </div>

        {/* Video Preview Card */}
        <div id="scanner" className="card-base overflow-hidden p-5 sm:p-6 xl:col-span-7 card-base overflow-hidden p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-violet-600">Now playing</p>
              <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-slate-900">Related video preview</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Matched
            </span>
          </div>

          <div className="relative mt-5 overflow-hidden rounded-2xl bg-slate-900 shadow-lg">

            {selectedMedia ? (
              <video
                key={selectedMedia.id}
                className="aspect-video w-full object-cover"
                controls
                autoPlay
                playsInline
              >
                <source
                  src={selectedMedia.video_url}
                  type="video/mp4"
                />
              </video>
            ) : (
              <>
                <div className="aspect-video bg-gradient-to-br from-slate-800 via-violet-900 to-cyan-900" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute inset-0 grid place-items-center">
                  <button className="grid h-14 w-14 place-items-center rounded-full bg-white text-lg text-violet-600 shadow-2xl shadow-white/25 transition hover:scale-110">
                    ▶
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-cyan-200">
                        Click a photo
                      </p>
                      <p className="mt-0.5 text-base font-black text-white">
                        Select an image to play video
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <p className="text-xs text-slate-500">Recognition</p>
              <p className="mt-1 text-2xl font-black text-slate-900">98.7%</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <p className="text-xs text-slate-500">Latency</p>
              <p className="mt-1 text-2xl font-black text-slate-900">0.8s</p>
            </div>
          </div>
        </div>

      </section>
    </Layout>
  );

}

export default AlbumMedia;