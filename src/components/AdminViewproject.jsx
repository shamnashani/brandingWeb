import React, { useEffect, useState } from "react";
import api from "./Api";

import {
    Pencil,
    Trash2,
    ChevronDown,
    ChevronUp,
    FolderOpen,
    Building2,
    Clapperboard,
    MonitorSmartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminViewproject = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get("/project/viewprojects");

            if (res.data.status === "ok") {
                setProjects(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

   const deleteProject = async (id) => {
  const result = await Swal.fire({
    title: "Delete Project?",
    text: "Are you sure you want to delete this project?",
    icon: "warning",
    background: "#18181b",
    color: "#fff",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#555",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await api.delete(`/project/deleteproject/${id}`);

    if (res.data.status === "ok") {
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Project deleted successfully.",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#d4af37",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchProjects();
    } else {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: res.data.message || "Unable to delete project.",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#d4af37",
      });
    }
  } catch (err) {
    console.error("Delete project error:", err);

    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: "Something went wrong while deleting the project.",
      background: "#18181b",
      color: "#fff",
      confirmButtonColor: "#d4af37",
    });
  }
};

    const groupedProjects = projects.reduce((acc, project) => {
        const page = project.page || "Others";

        if (!acc[page]) acc[page] = [];

        acc[page].push(project);

        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-[#0b0b0b] p-8 text-white">

            {/* Header */}

            <div className="mb-10 border-b border-[#d4af37]/20 pb-6">

                <h1 className="text-4xl font-bold text-[#d4af37]">
                    Project Management
                </h1>

                <p className="mt-2 text-gray-400">
                    View, edit and manage all projects.
                </p>

            </div>

            {/* Dashboard */}

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">
                    <FolderOpen className="mb-3 text-[#d4af37]" size={30} />
                    <p className="text-gray-400">Total Projects</p>
                    <h2 className="mt-2 text-4xl font-bold">{projects.length}</h2>
                </div>

                <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">
                    <Building2 className="mb-3 text-[#d4af37]" size={30} />
                    <p className="text-gray-400">Construction</p>
                    <h2 className="mt-2 text-4xl font-bold">
                        {projects.filter((p) => p.page === "construction").length}
                    </h2>
                </div>

                <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">
                    <Clapperboard className="mb-3 text-[#d4af37]" size={30} />
                    <p className="text-gray-400">Film</p>
                    <h2 className="mt-2 text-4xl font-bold">
                        {projects.filter((p) => p.page === "film").length}
                    </h2>
                </div>

                <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">
                    <MonitorSmartphone className="mb-3 text-[#d4af37]" size={30} />
                    <p className="text-gray-400">Studiobits tech</p>
                    <h2 className="mt-2 text-4xl font-bold">
                        {projects.filter((p) => p.page === "infroge").length}
                    </h2>
                </div>

            </div>

            {Object.keys(groupedProjects).map((page) => {

                const list = groupedProjects[page];
                const showAll = expanded[page];

                return (

                    <div key={page} className="mb-14">

                        <div className="mb-8 flex items-center justify-between">

                            <div>

                                <h2 className="text-3xl font-bold capitalize text-[#d4af37]">
  {page === "infroge" ? "Studiobits Tech" : page}
</h2>

                                <p className="text-gray-400">
                                    {list.length} Projects
                                </p>

                            </div>

                            

                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

  {(showAll ? list : list.slice(0, 3)).map((project) => (

    <div
      key={project._id}
      className="group overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-xl hover:shadow-[#d4af37]/10"
    >

      {/* Image */}

      <div className="relative h-64 overflow-hidden bg-[#1a1a1a]">
<img
  src={project.photo}
  alt={project.title}
  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
/>

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

        {/* Category + Title */}

        <div className="absolute bottom-0 left-0 right-0 p-5">

          <span className="inline-block rounded-full bg-[#d4af37] px-3 py-1 text-xs font-semibold text-black">
            {project.category}
          </span>

          <h3 className="mt-3 text-xl font-bold text-white">
            {project.title}
          </h3>

        </div>

      </div>

      {/* Buttons */}

      <div className="p-4">

        <div className="flex gap-3">

          <button
  onClick={() =>
    navigate(`/admineditproject/${project._id}`)
  }
  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#d4af37] py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
>
  <Pencil size={16} />
  Edit
</button>

          <button
            onClick={() => deleteProject(project._id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>

      </div>

    </div>

  ))}

</div>

{/* See More / See Less */}

{list.length > 3 && (

  <div className="mt-8 flex justify-center">

    <button
      onClick={() =>
        setExpanded({
          ...expanded,
          [page]: !showAll,
        })
      }
      className="flex items-center gap-2 rounded-full border border-[#d4af37] px-6 py-3 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
    >
      {showAll ? (
        <>
          <ChevronUp size={18} />
          See Less
        </>
      ) : (
        <>
          <ChevronDown size={18} />
          See More
        </>
      )}
    </button>

  </div>

)}
                    </div>

                );
            })}

            {projects.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-700 py-20 text-center">
                    <h2 className="text-2xl font-semibold text-gray-300">
                        No Projects Found
                    </h2>
                    <p className="mt-3 text-gray-500">
                        Add your first project to see it here.
                    </p>
                </div>
            )}

        </div>
    );
};

export default AdminViewproject;