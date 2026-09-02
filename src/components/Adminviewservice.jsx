import React, { useEffect, useState } from "react";
import api from "./Api";
import {
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  Wrench,
  Building2,
  Clapperboard,
  MonitorSmartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Adminviewservice = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [expanded, setExpanded] = useState({});

  // ================= Fetch Services =================

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/service/viewservices");

      if (res.data.status === "ok") {
        setServices(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load services.",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#d4af37",
      });
    }
  };

  // ================= Delete Service =================

  const deleteService = async (id) => {
  const result = await Swal.fire({
    title: "Delete Service?",
    text: "Are you sure you want to delete this service?",
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
    const res = await api.delete(`/service/service/${id}`);

    if (res.data.status === "ok") {
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Service deleted successfully.",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#d4af37",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchServices();
    } else {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: res.data.message || "Unable to delete service.",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#d4af37",
      });
    }
  } catch (err) {
    console.error("Delete service error:", err);

    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: "Something went wrong while deleting the service.",
      background: "#18181b",
      color: "#fff",
      confirmButtonColor: "#d4af37",
    });
  }
};

  // ================= Group Services =================

  const groupedServices = services.reduce((acc, service) => {
    const page = service.page || "Others";

    if (!acc[page]) {
      acc[page] = [];
    }

    acc[page].push(service);

    return acc;
  }, {});

  // ================= Page Name =================

  const getPageName = (page) => {
    if (page === "construction") return "Construction";
    if (page === "film") return "Film";
    if (page === "infroge") return "Studiobit Technology";

    return page;
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] p-8 text-white">

      {/* ================= Header ================= */}

      <div className="mb-10 border-b border-[#d4af37]/20 pb-6">

        <h1 className="text-4xl font-bold text-[#d4af37]">
          Service Management
        </h1>

        <p className="mt-2 text-gray-400">
          View, edit and manage all services.
        </p>

      </div>

      {/* ================= Dashboard ================= */}

      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        {/* Total */}

        <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">

          <Wrench
            className="mb-3 text-[#d4af37]"
            size={30}
          />

          <p className="text-gray-400">
            Total Services
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {services.length}
          </h2>

        </div>

        {/* Construction */}

        <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">

          <Building2
            className="mb-3 text-[#d4af37]"
            size={30}
          />

          <p className="text-gray-400">
            Construction
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {
              services.filter(
                (service) => service.page === "construction"
              ).length
            }
          </h2>

        </div>

        {/* Film */}

        <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">

          <Clapperboard
            className="mb-3 text-[#d4af37]"
            size={30}
          />

          <p className="text-gray-400">
            Film
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {
              services.filter(
                (service) => service.page === "film"
              ).length
            }
          </h2>

        </div>

        {/* Technology */}

        <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">

          <MonitorSmartphone
            className="mb-3 text-[#d4af37]"
            size={30}
          />

          <p className="text-gray-400">
            Studiobit Tech
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {
              services.filter(
                (service) => service.page === "infroge"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* ================= Service Groups ================= */}

      {Object.keys(groupedServices).map((page) => {

        const list = groupedServices[page];
        const showAll = expanded[page];

        return (
          <div
            key={page}
            className="mb-14"
          >

            {/* Section Header */}

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-[#d4af37]">
                  {getPageName(page)}
                </h2>

                <p className="mt-1 text-gray-400">
                  {list.length}{" "}
                  {list.length === 1 ? "Service" : "Services"}
                </p>

              </div>

            </div>

            {/* ================= Cards ================= */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {(showAll ? list : list.slice(0, 3)).map(
                (service) => (

                  <div
                    key={service._id}
                    className="group overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-xl hover:shadow-[#d4af37]/10"
                  >

                    {/* Image */}

                    <div className="relative h-64 overflow-hidden bg-[#1a1a1a]">

<img
  src={service.photo}
  alt={service.title}
  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
/>

                      {/* Overlay */}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />


                      {/* Category + Title */}

                      <div className="absolute bottom-0 left-0 right-0 p-5">

    <h3 className="mt-3 text-xl font-bold text-white">
      {service.title}
    </h3>

  </div>

                    </div>

                    {/* Description */}

                    <div className="p-5">

                      <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-400">
                        {service.description}
                      </p>

                      {/* Buttons */}

                      <div className="flex gap-3">

                        {/* Edit */}

                        <button
                          onClick={() =>
                            navigate(
                              `/admineditservice/${service._id}`
                            )
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#d4af37] py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        {/* Delete */}

                        <button
                          onClick={() =>
                            deleteService(service._id)
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

            {/* ================= See More ================= */}

            {list.length > 3 && (

              <div className="mt-8">

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

      {/* ================= Empty State ================= */}

      {services.length === 0 && (

        <div className="rounded-2xl border border-dashed border-gray-700 py-20 text-center">

          <Wrench
            className="mx-auto mb-5 text-gray-600"
            size={50}
          />

          <h2 className="text-2xl font-semibold text-gray-300">
            No Services Found
          </h2>

          <p className="mt-3 text-gray-500">
            Add your first service to see it here.
          </p>

        </div>

      )}

    </div>
  );
};

export default Adminviewservice;