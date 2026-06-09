import { useEffect, useState } from "react";

import api from "../services/api";
import Layout from "../components/Layout";


interface DashboardData {
  total_albums: number;
  total_media: number;
}



const albums = [
  {
    title: "Wedding Memories",
    scans: "4,218",
    videos: 182,
    status: "Live",
    gradient: "from-rose-400 via-fuchsia-500 to-indigo-500",
    progress: 92,
  },
  {
    title: "Graduation Night",
    scans: "2,904",
    videos: 94,
    status: "Syncing",
    gradient: "from-cyan-400 via-blue-500 to-violet-600",
    progress: 67,
  },
  {
    title: "Brand Launch 2026",
    scans: "7,640",
    videos: 211,
    status: "Live",
    gradient: "from-amber-300 via-orange-500 to-red-500",
    progress: 85,
  },
];

const activities = [
  { time: "Now", title: "Photo #LP-2049 unlocked video", detail: "Guests are watching 'First Dance Highlight'", color: "bg-emerald-500" },
  { time: "8m", title: "New memory pack uploaded", detail: "32 photos linked with 32 cinematic clips", color: "bg-cyan-500" },
  { time: "21m", title: "AI matching confidence improved", detail: "Album recognition accuracy reached 98.7%", color: "bg-fuchsia-500" },
  { time: "1h", title: "QR scan spike detected", detail: "Reception table cards performing 3.2x better", color: "bg-amber-400" },
];



export default function Dashboard() {
  const [data, setData] =
    useState<DashboardData>({
      total_albums: 0,
      total_media: 0,
    });

  useEffect(() => {
    api.get("/dashboard")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const stats = [
  { label: "Total Photos", value: data.total_albums, delta: "+24%", icon: "📸",  },
  { label: "Video matches", value: data.total_media, delta: "+18%", icon: "🎬", },
  { label: "Avg play time", value: "02:46", delta: "+11%", icon: "⏱️", },
  { label: "Active albums", value: "326", delta: "+32", icon: "📂", },
];


  return (
    <Layout>


      <section id="insights" className="grid gap-4 pb-8 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="card-base group p-5 hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-xl text-white shadow-lg`}>
                {stat.icon}
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                {stat.delta}
              </span>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-black tracking-tight text-slate-900"> {stat.value}</p>
          </article>
        ))}
      </section>



      <section id="albums" className="grid gap-5 pb-8 xl:grid-cols-[1fr_0.7fr]">
        {/* Albums */}
        <div className="card-base p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-violet-600">Live albums</p>
              <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900">Photo collections</h3>
            </div>
            <button className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-200/50 transition hover:shadow-lg">
              + Create Album
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {albums.map((album) => (
              <article key={album.title} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className={`relative h-32  p-4`}>
                  <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-xl" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex justify-between">
                      <span className="rounded-full bg-black/15 px-2.5 py-0.5 text-[10px] font-bold text-black backdrop-blur-sm">{album.status}</span>
                      <span className="text-xl">📷</span>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-black/60">Album</p>
                      <h4 className="mt-0.5 text-lg font-black leading-tight text-black">{album.title}</h4>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Scans: <b className="text-slate-800">{album.scans}</b></span>
                    <span>Videos: <b className="text-slate-800">{album.videos}</b></span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full bg-gradient-to-r ${album.gradient}`} style={{ width: `${album.progress}%` }} />
                  </div>
                  <p className="mt-1.5 text-right text-[10px] text-slate-400">{album.progress}% synced</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Scan Pipeline */}
        <div id="videos" className="card-base p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-600">Matching engine</p>
              <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900">Scan pipeline</h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-lg">⚡</div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              { step: "01", title: "Photo detected", detail: "Camera finds printed image markers", value: "100%", color: "bg-violet-500" },
              { step: "02", title: "AI identity match", detail: "Visual fingerprint paired to clip", value: "98.7%", color: "bg-fuchsia-500" },
              { step: "03", title: "Video playback", detail: "Related video opens in immersive player", value: "Live", color: "bg-cyan-500" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:bg-slate-50">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color} text-sm font-black text-white`}>
                  {item.step}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-slate-800">{item.title}</p>
                    <span className="shrink-0 text-xs font-black text-violet-600">{item.value}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        {/* Scanner Network */}
        <div className="card-base p-5 sm:p-6">
          <p className="text-sm font-semibold text-emerald-600">Device health</p>
          <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900">Scanner network</h3>

          <div className="mt-6 grid place-items-center">
            <div className="relative grid h-48 w-48 place-items-center rounded-full border-2 border-slate-100 bg-slate-50">
              <div className="absolute inset-4 rounded-full border border-violet-100" />
              <div className="absolute inset-8 rounded-full border border-fuchsia-100" />
              <div className="pulse-glow grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-4xl shadow-xl shadow-violet-200/40">📡</div>
              <span className="absolute left-6 top-10 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-white" />
              <span className="absolute bottom-10 right-8 h-3 w-3 rounded-full bg-cyan-400 ring-4 ring-white" />
              <span className="absolute right-10 top-6 h-3 w-3 rounded-full bg-fuchsia-400 ring-4 ring-white" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <b className="block text-xl font-black text-slate-900">42</b>
              <span className="text-xs text-slate-500">devices</span>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <b className="block text-xl font-black text-slate-900">99.9%</b>
              <span className="text-xs text-slate-500">uptime</span>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <b className="block text-xl font-black text-slate-900">5G</b>
              <span className="text-xs text-slate-500">sync</span>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="card-base p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-600">Real-time activity</p>
              <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900">Memory timeline</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
              Auto refresh
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {activities.map((activity) => (
              <article key={activity.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 transition hover:bg-slate-50/60">
                <div className="flex flex-col items-center gap-1.5 pt-0.5">
                  <span className={`h-3 w-3 rounded-full ring-4 ring-slate-50 ${activity.color}`} />
                  <span className="w-px flex-1 bg-slate-200" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-sm font-bold text-slate-800">{activity.title}</h4>
                    <time className="text-xs font-semibold text-slate-400">{activity.time}</time>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{activity.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}