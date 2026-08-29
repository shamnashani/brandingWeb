import React, { useEffect, useState } from "react";
import api from "./Api";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactCTA from "./ContactCTA";
import SEO from './SEO'

const Constructions = () => {
  const [projects, setProjects] = useState([]);
const [services, setServices] = useState([]);

const [showAllProjects, setShowAllProjects] = useState(false);
const [showAllServices, setShowAllServices] = useState(false);

const [currentWhyImage, setCurrentWhyImage] = useState(0);
  // ================= WHY US SLIDER IMAGES =================
  const whyImages = [
    "/jcb.jpeg",
    "/bed.jpeg",
    
    "/aii.jpeg",
  ];

  useEffect(() => {
  fetchProjects();
  fetchServices();
}, []);

const fetchProjects = async () => {
  try {
    const res = await api.get("/project/viewprojects?page=construction");

    if (res.data.status === "ok") {
      setProjects(res.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};



const fetchServices = async () => {
  try {
    const res = await api.get("/service/viewservices?page=construction");

    if (res.data.status === "ok") {
      setServices(res.data.data);
    }
  } catch (err) {
    console.error("Error fetching construction services:", err);
  }
};

  // ================= AUTOMATIC IMAGE SLIDER =================
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWhyImage((prev) => (prev + 1) % whyImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [whyImages.length]);


  return (
    <div className="min-h-screen scroll-smooth bg-[#0b0b0b] text-white">
          <SEO
      title="S1 Creations | Global Construction & Interior Design Solutions"
      description="S1 Creations delivers professional construction, interior design, and project solutions with a focus on quality, innovation, and modern spaces across global markets."
      path="/construction"
    />
      

      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <img
          src="/arc.jpeg"
          alt="Modern building"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-20 text-center">

          <h1 className="text-5xl font-semibold leading-[1] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
            Building

            <span className="block font-semibold text-[#d4af37]">
              Excellence
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm font-semibold leading-7 text-gray-300 md:text-base">
            Creating exceptional spaces through architecture,
            craftsmanship, and timeless design.
          </p>

          <a
            href="#projects"
            className="group mt-10 inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition"
          >
            <span className="font-semibold transition group-hover:text-[#d4af37]">
              Explore Projects
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37] text-lg font-semibold text-[#d4af37] transition duration-300 group-hover:bg-[#d4af37] group-hover:text-black">
              →
            </span>
          </a>

        </div>
      </section>


      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section
        id="about"
        className="bg-[#0b0b0b] px-6 py-12 lg:px-12 lg:py-16"
      >
        <div className="mx-auto max-w-[1600px]">

          <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-12">

            {/* LEFT - TEXT */}

            <div className="lg:col-span-2">

              <h2 className="max-w-md text-2xl font-semibold leading-tight tracking-tight md:text-3xl lg:text-4xl">
                Designing

                <span className="font-semibold text-[#d4af37]">
                  {" "}Meaningful Spaces
                </span>
              </h2>

              <div className="mt-5 grid max-w-md gap-3">

                <p className="text-xs font-semibold leading-6 text-gray-400 md:text-sm">
                  S1 Creations creates timeless environments that enrich
                  everyday life through thoughtful design, natural materials,
                  and enduring craftsmanship.
                </p>

                <p className="text-xs font-semibold leading-6 text-gray-400 md:text-sm">
                  From concept to completion, every project is approached with
                  precision, transparency, and a commitment to creating spaces
                  that stand the test of time.
                </p>

              </div>

              <a
                href="#services"
                className="mt-5 inline-block border-b border-[#d4af37] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4af37] transition hover:text-white"
              >
                Discover Our Approach →
              </a>

            </div>


            {/* RIGHT - VIDEO */}

            <div className="lg:col-span-3">

              <div className="group relative overflow-hidden">

                <video
                  src="/OIG4.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[380px]"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/10" />

                <div className="absolute bottom-0 left-0 p-5">

                  <h3 className="mt-2 text-lg font-semibold text-white">
                    Crafting Exceptional Spaces
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section
  id="services"
  className="bg-[#111111] px-6 py-14 lg:px-12 lg:py-20"
>
  <div className="mx-auto max-w-[1600px]">

    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">

      {/* LEFT */}

      <div className="lg:col-span-4">

        <div className="lg:sticky lg:top-32">

          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d4af37]">
            Services
          </p>

          <h2 className="mt-6 text-5xl font-semibold leading-tight md:text-6xl lg:text-5xl">

            End-to-End

            <span className="block font-semibold text-[#d4af37]">
              Solutions
            </span>

          </h2>

          <p className="mt-6 max-w-sm text-sm font-semibold leading-7 text-gray-500">
            From thoughtful residential spaces to sophisticated
            commercial environments, we bring together design,
            craftsmanship, and precision to create spaces that are
            built to last.
          </p>

          {/* View All Services */}

          {services.length > 4 && (
            <button
              type="button"
              onClick={() =>
                setShowAllServices(!showAllServices)
              }
              className="mt-7 border border-[#d4af37]/60 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d4af37] transition duration-300 hover:bg-[#d4af37] hover:text-black"
            >
              {showAllServices
                ? "Show Less"
                : "View All Services"}
            </button>
          )}

        </div>

      </div>


      {/* RIGHT */}

      <div className="lg:col-span-8">

        <div className="border-t border-white/20">

          {(showAllServices
            ? services
            : services.slice(0, 4)
          ).map((service, index) => (

            <div
              key={service._id}
              className="group grid gap-6 border-b border-white/20 py-7 md:grid-cols-12 md:items-center md:gap-8"
            >

              {/* NUMBER */}

              <div className="md:col-span-1">

                <span className="text-xs font-semibold tracking-widest text-[#d4af37]">
                  {String(index + 1).padStart(2, "0")}
                </span>

              </div>


              {/* IMAGE */}

              <div className="overflow-hidden md:col-span-4">

                <img
                  src={`${api.defaults.baseURL}/media/${service.photo}`}
                  alt={service.title}
                  className="h-[190px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[210px]"
                />

              </div>


              {/* CONTENT */}

              <div className="md:col-span-6">

                <h3 className="text-2xl font-semibold md:text-3xl">
                  {service.title}
                </h3>

                <div className="mt-4 h-px w-10 bg-[#d4af37] transition-all duration-500 group-hover:w-20" />

                <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-gray-500">
                  {service.description}
                </p>

              </div>

            </div>

          ))}


          {/* No Services */}

          {services.length === 0 && (

            <div className="border-b border-white/20 py-16 text-center">

              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                No services available
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  </div>
</section>


      {/* =====================================================
          PROJECTS
      ====================================================== */}

      <section
        id="projects"
        className="bg-[#0b0b0b] px-6 py-12 lg:px-12 lg:py-16"
      >
        <div className="mx-auto max-w-[1600px]">

          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">

            {/* LEFT CONTENT */}

            <div className="flex flex-col justify-center lg:col-span-3">

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                Works
              </p>

              <h2 className="mt-4 max-w-xs text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                Featured{" "}

                <span className="font-semibold text-[#d4af37]">
                  Projects
                </span>
              </h2>

              <p className="mt-5 max-w-xs text-xs font-semibold leading-6 text-gray-500">
                Explore our latest projects and discover how thoughtful
                architecture, craftsmanship, and design come together.
              </p>

              <button
                type="button"
                onClick={() =>
                  setShowAllProjects(!showAllProjects)
                }
                className="mt-6 inline-flex w-fit items-center gap-3 border border-[#d4af37]/60 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d4af37] transition duration-300 hover:bg-[#d4af37] hover:text-black"
              >
                {showAllProjects
                  ? "Show Less"
                  : "View More Projects"}

                <span
                  className={`font-semibold transition-transform duration-300 ${
                    showAllProjects ? "rotate-180" : ""
                  }`}
                >
                  →
                </span>
              </button>

            </div>


            {/* PROJECT CARDS */}

<div className="lg:col-span-9">
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {(showAllProjects ? projects : projects.slice(0, 3)).map((project) => (
      <div
        key={project._id}
        className="group relative overflow-hidden rounded-xl border border-yellow-500/20 bg-[#111111]"
      >
        <div className="relative h-[280px] overflow-hidden">

          <img
            src={`${api.defaults.baseURL}/media/${project.photo}`}
            alt={project.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x350?text=No+Image";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
              {project.category}
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {project.title}
            </h3>
          </div>

        </div>
      </div>
    ))}
  </div>

  {projects.length === 0 && (
    <div className="mt-10 text-center text-gray-400">
      No projects available.
    </div>
  )}
</div>
          </div>

        </div>
      </section>


      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}

      <section
        id="why-us"
        className="bg-[#111111] px-6 py-10 lg:px-12 lg:py-12"
      >
        <div className="mx-auto max-w-[1500px]">

          <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-14">

            {/* LEFT CONTENT */}

            <div className="lg:col-span-2">

              <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                Why Us
              </p>

              <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                Why

                <span className="font-semibold text-[#d4af37]">
                  {" "}Choose Us
                </span>
              </h2>

              <p className="mt-4 max-w-md text-sm font-semibold leading-6 text-gray-500">
                We combine thoughtful design, skilled craftsmanship, and a
                client-focused approach to create spaces that are built to last.
              </p>


              {/* FEATURES */}

              <div className="mt-6 space-y-3">

                <div className="flex items-center gap-4 border-b border-white/10 pb-3">

                  <span className="text-[10px] font-semibold text-[#d4af37]">
                    01
                  </span>

                  <p className="text-sm font-semibold text-gray-300">
                    Complete Design & Build Solutions
                  </p>

                </div>


                <div className="flex items-center gap-4 border-b border-white/10 pb-3">

                  <span className="text-[10px] font-semibold text-[#d4af37]">
                    02
                  </span>

                  <p className="text-sm font-semibold text-gray-300">
                    Experienced Team
                  </p>

                </div>


                <div className="flex items-center gap-4 border-b border-white/10 pb-3">

                  <span className="text-[10px] font-semibold text-[#d4af37]">
                    03
                  </span>

                  <p className="text-sm font-semibold text-gray-300">
                    Modern & Creative Designs
                  </p>

                </div>


                <div className="flex items-center gap-4 border-b border-white/10 pb-3">

                  <span className="text-[10px] font-semibold text-[#d4af37]">
                    04
                  </span>

                  <p className="text-sm font-semibold text-gray-300">
                    Quality Materials & Workmanship
                  </p>

                </div>


                <div className="flex items-center gap-4 border-b border-white/10 pb-3">

                  <span className="text-[10px] font-semibold text-[#d4af37]">
                    05
                  </span>

                  <p className="text-sm font-semibold text-gray-300">
                    Client-Focused Approach
                  </p>

                </div>

              </div>

            </div>


            {/* RIGHT - AUTOMATIC IMAGE SLIDER */}

            <div className="lg:col-span-3">

              <div className="group relative overflow-hidden rounded-[22px]">

                {/* SLIDER IMAGES */}

                {whyImages.map((image, index) => (

                  <img
                    key={image}
                    src={image}
                    alt="S1 Creations construction project"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                      currentWhyImage === index
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />

                ))}


                {/* IMAGE CONTAINER */}

                <div className="h-[300px] w-full md:h-[350px] lg:h-[400px]" />


                {/* DARK OVERLAY */}

                <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-black/10" />


                {/* SLIDER DOTS */}

                <div className="absolute bottom-5 left-5 z-10 flex gap-2">

                  {whyImages.map((_, index) => (

                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentWhyImage(index)}
                      className={`h-1.5 font-semibold transition-all duration-500 ${
                        currentWhyImage === index
                          ? "w-8 bg-[#d4af37]"
                          : "w-2 bg-white/50"
                      }`}
                      aria-label={`Show image ${index + 1}`}
                    />

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT CTA
      ====================================================== */}

     <ContactCTA division="construction"></ContactCTA>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer></Footer>

    </div>
  );
};

export default Constructions;
