import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Add_project = () => {
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState("");
  const [photo, setPhoto] = useState(null);

  const btn = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("page", page);
    formData.append("photo", photo);

    try {
      const res = await axios.post(
        "http://localhost:4000/project/projects",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "ok") {
        Swal.fire({
          icon: "success",
          title: "Project Added",
          text: "Your project has been added successfully.",
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
        text: "Failed to add project.",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#d4af37",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-yellow-600/30 bg-zinc-900/80 backdrop-blur-lg shadow-2xl p-6">

        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6">
          Add New Project
        </h2>

        <form
          onSubmit={btn}
          encType="multipart/form-data"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Project Title */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Project Title
            </label>

            <input
              type="text"
              required
              value={title}
              placeholder="Enter project title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Category
            </label>

            <input
              type="text"
              required
              value={category}
              placeholder="Enter project category"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>

          {/* Select Page */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2 font-medium">
              Project For
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
              <option value="infroge">studiobit Technology</option>
            </select>
          </div>

          {/* Project Image */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2 font-medium">
              Project Image
            </label>

            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full rounded-lg border border-dashed border-yellow-600 bg-zinc-800 px-4 py-3 text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-yellow-400 cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-500 py-3 text-lg font-semibold text-black transition hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/30"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_project;