import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "./Api";

const Addservice = () => {
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState("");
  const [photo, setPhoto] = useState(null);

  const btn = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("page", page);
    formData.append("photo", photo);

    try {
      const res = await api.post(
        "/service/services",
        formData,
      );

      if (res.data.status === "ok") {
  await Swal.fire({
    icon: "success",
    title: "Service Added",
    text: "Your service has been added successfully.",
    background: "#18181b",
    color: "#fff",
    confirmButtonColor: "#d4af37",
    timer: 1800,
    showConfirmButton: false,
  });

  if (page === "construction") {
    nav("/construction");
  } else if (page === "film") {
    nav("/film");
  } else if (page === "infroge") {
    nav("/tech");
  }
}

} catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to add service.",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#d4af37",
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl">

        <h2 className="mb-6 text-center text-2xl font-bold text-yellow-500">
          Add New Service
        </h2>

        <form
          onSubmit={btn}
          encType="multipart/form-data"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {/* Service Title */}
          <div>
            <label className="mb-2 block font-medium text-gray-300">
              Service Title
            </label>

            <input
              type="text"
              required
              value={title}
              placeholder="Enter service title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>

          {/* Select Page */}
          <div>
            <label className="mb-2 block font-medium text-gray-300">
              Service For
            </label>

            <select
              required
              value={page}
              onChange={(e) => setPage(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40"
            >
              <option value="">Select division</option>
              <option value="construction">Construction</option>
              <option value="film">Film</option>
              <option value="infroge">Studiobit Technology</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-gray-300">
              Service Description
            </label>

            <textarea
              required
              rows={3}
              value={description}
              placeholder="Enter service description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-zinc-800 px-4 py-2 text-white placeholder-gray-500 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40 resize-none"
            />
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-gray-300">
              Service Image
            </label>

            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full cursor-pointer rounded-lg border border-dashed border-yellow-600 bg-zinc-800 px-4 py-3 text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-yellow-400"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-500 py-3 text-lg font-semibold text-black transition hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/30"
            >
              Add Service
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Addservice;