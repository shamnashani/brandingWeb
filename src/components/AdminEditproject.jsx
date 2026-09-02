import React, { useEffect, useState, useCallback } from "react";
import api from "./Api";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AdminEditproject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState("");
  const [photo, setPhoto] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= Fetch Project =================

  const fetchProject = useCallback(async () => {
    try {
      const res = await api.get(`/project/viewproject/${id}`);

      if (res.data.status === "ok") {
        const project = res.data.data;

        setTitle(project.title || "");
        setCategory(project.category || "");
        setPage(project.page || "");
        setCurrentPhoto(project.photo || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  // ================= Update Project =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("page", page);

    // Only send photo if a new one is selected
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const res = await api.put(
        `/project/editproject/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "ok") {
        await Swal.fire({
          icon: "success",
          title: "Project Updated",
          text: "Project updated successfully.",
          background: "#18181b",
          color: "#fff",
          confirmButtonColor: "#d4af37",
          timer: 1800,
          showConfirmButton: false,
        });

        navigate("/adminviewproject");
      }
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update project.",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#d4af37",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0b] text-white">
        <p className="text-lg text-gray-400">
          Loading project...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] p-6 text-white md:p-10">

      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8 border-b border-[#d4af37]/20 pb-6">

          <h1 className="text-3xl font-bold text-[#d4af37] md:text-4xl">
            Edit Project
          </h1>

          <p className="mt-2 text-gray-400">
            Update project details and image.
          </p>

        </div>

        {/* Form */}

        <div className="rounded-2xl border border-[#d4af37]/20 bg-[#111111] p-6 md:p-8">

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >

            {/* Title */}

            <div>

              <label className="mb-2 block font-medium text-gray-300">
                Project Title
              </label>

              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                className="w-full rounded-lg border border-gray-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40"
              />

            </div>

            {/* Category */}

            <div>

              <label className="mb-2 block font-medium text-gray-300">
                Project Category
              </label>

              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter project category"
                className="w-full rounded-lg border border-gray-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40"
              />

            </div>

            {/* Page */}

            <div className="md:col-span-2">

              <label className="mb-2 block font-medium text-gray-300">
                Project For
              </label>

              <select
                required
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40"
              >
                <option value="">
                  Select division
                </option>

                <option value="construction">
                  Construction
                </option>

                <option value="film">
                  Film
                </option>

                <option value="infroge">
                  Studiobit Technology
                </option>
              </select>

            </div>

            {/* Current Image */}

            {currentPhoto && (
              <div className="md:col-span-2">

                <label className="mb-3 block font-medium text-gray-300">
                  Current Project Image
                </label>

                <div className="overflow-hidden rounded-xl border border-gray-700 bg-[#1a1a1a]">

                  <img
                    src={currentPhoto}
                    alt={title}
                    className="max-h-[400px] w-full object-contain"
                  />

                </div>

              </div>
            )}

            {/* New Image */}

            <div className="md:col-span-2">

              <label className="mb-2 block font-medium text-gray-300">
                Change Project Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPhoto(e.target.files[0])
                }
                className="w-full cursor-pointer rounded-lg border border-dashed border-yellow-600 bg-zinc-800 px-4 py-3 text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-yellow-400"
              />

              <p className="mt-2 text-xs text-gray-500">
                Leave empty if you want to keep the current image.
              </p>

            </div>

            {/* Buttons */}

            <div className="flex gap-3 md:col-span-2">

              <button
                type="button"
                onClick={() =>
                  navigate("/adminviewproject")
                }
                className="flex-1 rounded-lg border border-gray-600 py-3 font-semibold text-gray-300 transition hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 rounded-lg bg-[#d4af37] py-3 font-semibold text-black transition hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/30"
              >
                Update Project
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AdminEditproject;