import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";
import { Button } from "@mui/material";

export default function Albums() {
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    api.get("/albums").then((res) => {
      setAlbums(res.data);
    });
  }, []);

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-violet-600">
            Album Management
          </p>

          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
            Albums
          </h1>
        </div>

        <Link
          to="/create-album"
          className="
            rounded-xl
            bg-gradient-to-r
            from-violet-500
            to-fuchsia-500
            px-5
            py-3
            text-sm
            font-bold
            text-white
            shadow-md
          "
        >
          + Create Album
        </Link>
      </div>

      {/* Album Grid */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {albums.map((album) => (
          <div
            key={album.id}
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >


            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              {/* Album Cover */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={
                    album.cover_image
                      ? `https://api.zivatronix.com/${album.cover_image}`
                      : "/placeholder.jpg"
                  }
                  alt={album.album_name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">
                    {album.album_name}
                  </h3>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">
                    Customer :
                  </span>{" "}
                  {album.customer_name}
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold">
                    Mobile :
                  </span>{" "}
                  {album.mobile}
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold">
                    Created :
                  </span>{" "}
                  {new Date(album.created_at).toLocaleDateString()}
                </p>

                <div className="mt-5 flex gap-3">


                  <Button
                    className="
          flex-1 rounded-xl
          bg-violet-600 px-4 py-2.5
          text-center text-sm
          font-semibold text-white
          transition hover:bg-violet-700 "
                    component={Link}
                    to={`/albums/${album.id}`}
                    variant="contained"
                  >
                    View Media
                  </Button>

                  <Link
                    to={`/album/edit/${album.id}`}
                    className="
          rounded-xl border border-slate-200
          px-4 py-2.5 text-sm
          font-semibold text-slate-700
          hover:bg-slate-50 " >
                    Edit
                  </Link>

                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {albums.length === 0 && (
        <div className="mt-20 text-center">
          <h3 className="text-xl font-bold text-slate-700">
            No Albums Found
          </h3>

          <p className="mt-2 text-slate-500">
            Create your first album to get started.
          </p>
        </div>
      )}
      
    </Layout>
  );
}