import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Lightbulb,
  FileText,
  Clapperboard,
  Scissors,
  Send,
} from "lucide-react";
import api from "./Api";
import "aos/dist/aos.css";
import AOS from "aos";
import Footer from "./Footer";
import ContactCTA from "./ContactCTA";
import SEO from './SEO'



const Film = () => {
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const [reviewData, setreviewData] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
  });

  const [reviewSubmit, setreviewSubmit] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: true,
    });

    fetchProjects();
   fetchServices();

  }, []);




  // =====================================================
  // PROCESS
  // =====================================================

  const process = [
    {
      number: "01",
      title: "Concept Development",
      text: "We shape your initial idea into a clear creative vision and strong story concept.",
      icon: Lightbulb,
    },
    {
      number: "02",
      title: "Script & Planning",
      text: "We develop the script and carefully plan every creative and production detail.",
      icon: FileText,
    },
    {
      number: "03",
      title: "Production",
      text: "We bring the vision to life through professional direction, cinematography, and execution.",
      icon: Clapperboard,
    },
    {
      number: "04",
      title: "Post Production",
      text: "We refine every frame through editing, color grading, sound, and visual finishing.",
      icon: Scissors,
    },
    {
      number: "05",
      title: "Final Delivery",
      text: "We deliver a polished, high-quality final film ready to connect with your audience.",
      icon: Send,
    },
  ];

  // =====================================================
  // WHATSAPP
  // =====================================================

  const whatsappMessage = encodeURIComponent(
    "Hello S1 Creations, I came across your website and would like to know more about your film production services. Please share the details."
  );

  // =====================================================
  // ENQUIRY
  // =====================================================

  const handleEnquiry = async (e) => {
    e.preventDefault();

    try {
      await api.post("/enquiry/submit", {
        ...formData,
        service: "Film",
      });

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      alert("Failed to send enquiry");
    }
  };

  // =====================================================
  // REVIEW
  // =====================================================

  const ReviewSub = async (e) => {
    e.preventDefault();

    try {
      await api.post("/rev/add-review", {
        ...reviewData,
        service: true,
      });

      setreviewSubmit(true);

      setreviewData({
        name: "",
        email: "",
        rating: 5,
        message: "",
      });
    } catch (err) {
      alert("Failed to submit review");
    }
  };
  //========== project =============


 const fetchServices = async () => {
  try {
    const res = await api.get("/service/viewservices?page=film");

    if (res.data.status === "ok") {
      setServices(res.data.data);
    }
  } catch (err) {
    console.error("Error fetching services:", err);
  }
};


  const fetchProjects = async () => {
  try {
    const res = await api.get("/project/viewprojects?page=film");

    if (res.data.status === "ok") {
      setProjects(res.data.data);
    }
  } catch (err) {
    console.error("Error fetching projects:", err);
  }
};

  return (
    <div className="min-h-screen scroll-smooth bg-[#0b0b0b] text-white">
      <SEO
  title="S1 Creations | Global Film Production & Creative Media"
  description="S1 Creations delivers professional film production, cinematic storytelling, creative media, and visual content from concept to screen."
  path="/film"
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
          src="/film3.jpeg"
          alt="S1 Creations Film Division"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-20 text-center">

          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-[#d4af37]">
            S1 Creations Film
          </p>

          <h1 className="text-5xl font-semibold leading-[1] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
            Crafting Stories

            <span className="block font-semibold text-[#d4af37]">
              That Inspire
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm font-semibold leading-7 text-gray-300 md:text-base">
            We bring ideas to life through powerful visuals, cinematic
            storytelling, and professional film production.
          </p>

          <a
            href="#works"
            className="group mt-10 inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition"
          >
            <span className="transition group-hover:text-[#d4af37]">
              Explore Our Stories
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
        className="bg-[#0b0b0b] px-6 py-14 lg:px-12 lg:py-20"
      >
        <div className="mx-auto max-w-[1600px]">

          <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-14">

            <div className="lg:col-span-2">

              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#d4af37]">
                About Us
              </p>

              <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                Bringing Ideas

                <span className="block font-semibold text-[#d4af37]">
                  To Life
                </span>
              </h2>

              <div className="mt-6 grid max-w-md gap-4">

                <p className="text-sm font-semibold leading-7 text-gray-400">
                  S1 Creations is passionate about bringing ideas to life
                  through powerful visuals and meaningful storytelling.
                </p>

                <p className="text-sm font-semibold leading-7 text-gray-400">
                  We combine creativity, technology, and expertise to produce
                  cinematic content that connects with audiences emotionally
                  and professionally.
                </p>

              </div>

              <a
                href="#services"
                className="mt-7 inline-block border-b border-[#d4af37] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4af37] transition hover:text-white"
              >
                Explore Our Services →
              </a>

            </div>


            <div className="lg:col-span-3">

              <div className="group relative overflow-hidden">

                <img
                  src="/film9.jpeg"
                  alt="S1 Creations Visual Storytelling"
                  className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[420px]"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/10" />

                <div className="absolute bottom-0 left-0 p-6">

                  <h3 className="text-xl font-semibold text-white">
                    Powerful Visuals. Meaningful Stories.
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
                  Our Film Services
                </p>

                <h2 className="mt-6 text-5xl font-semibold leading-tight md:text-6xl lg:text-5xl">
                  Stories

                  <span className="block font-semibold text-[#d4af37]">
                    In Every Frame
                  </span>
                </h2>

                <p className="mt-6 max-w-sm text-sm font-semibold leading-7 text-gray-500">
                  From cinematic projects and short films to advertisements,
                  documentaries, and music videos, we create visual content
                  with creativity, precision, and purpose.
                </p>

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
                    {/* Number */}
                    <div className="md:col-span-1">
                      <span className="text-xs font-semibold tracking-widest text-[#F8B400]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="overflow-hidden md:col-span-4">
                      <img
                        src={`http://localhost:4000/media/${service.photo}`}
                        alt={service.title}
                        className="h-[190px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[210px]"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/600x400?text=Service";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-6">
                      <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                        {service.title}
                      </h3>

                      <div className="mt-4 h-px w-10 bg-[#F8B400] transition-all duration-500 group-hover:w-20" />

                      <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-gray-500">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}

                {services.length === 0 && (
                  <div className="py-12 text-center text-gray-500">
                    No services available.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section
        id="process"
        className="bg-[#0b0b0b] px-6 py-16 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-[1600px]">

          <div className="max-w-3xl">

            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d4af37]">
              Our Process
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
              From Concept

              <span className="block font-semibold text-[#d4af37]">
                To Creation
              </span>
            </h2>

          </div>


          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            {process.map((step) => {

              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative flex min-h-[300px] flex-col overflow-hidden border border-white/10 bg-[#111111] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/40 hover:bg-[#151515] md:p-7"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-8 w-8 items-center justify-center text-[#d4af37] transition-transform duration-500 group-hover:scale-110">
                      <Icon
                        size={20}
                        strokeWidth={1.4}
                      />
                    </div>

                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[#d4af37]">
                      {step.number}
                    </span>

                  </div>


                  <div className="mt-8">

                    <h3 className="max-w-[200px] text-lg font-semibold leading-snug text-white">
                      {step.title}
                    </h3>

                    <div className="mt-4 h-px w-8 bg-[#d4af37] transition-all duration-500 group-hover:w-16" />

                    <p className="mt-4 text-xs font-semibold leading-6 text-gray-500">
                      {step.text}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          WORKS
      ====================================================== */}

      <section
        id="works"
        className="bg-[#0b0b0b] px-6 py-12 lg:px-12 lg:py-16"
      >
        <div className="mx-auto max-w-[1600px]">

          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">

            <div className="flex flex-col justify-center lg:col-span-3">

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                Our Works
              </p>

              <h2 className="mt-4 max-w-xs text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                Stories{" "}

                <span className="font-semibold text-[#d4af37]">
                  We Create
                </span>
              </h2>

              <p className="mt-5 max-w-xs text-xs font-semibold leading-6 text-gray-500">
                Explore our collection of films, documentaries, commercials,
                and visual stories created through creativity, cinematic
                vision, and meaningful storytelling.
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
                  : "View More Works"}

                <span
                  className={`transition-transform duration-300 ${showAllProjects ? "rotate-180" : ""
                    }`}
                >
                  →
                </span>
              </button>

            </div>


            <div className="lg:col-span-9">

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(showAllProjects ? projects : projects.slice(0, 3)).map((project) => (
                  <div
                    key={project._id}
                    className="group relative overflow-hidden rounded-xl border border-yellow-500/20 bg-[#111111]"
                  >
                    <div className="relative h-[280px] overflow-hidden md:h-[320px]">

                      <img
                        src={`${api.defaults.baseURL}/media/${project.photo}`}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/no-image.jpg";
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                      <div className="absolute inset-3 border border-transparent transition duration-500 group-hover:border-[#d4af37]/50" />

                      <div className="absolute bottom-0 left-0 right-0 p-5">

                        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                          {project.category}
                        </p>

                        <h3 className="mt-2 text-lg font-semibold leading-tight text-white">
                          {project.title}
                        </h3>

                        {project.description && (
                          <p className="mt-3 line-clamp-2 text-xs leading-5 text-gray-300">
                            {project.description}
                          </p>
                        )}

                        <div className="mt-3 h-px w-8 bg-[#d4af37] transition-all duration-500 group-hover:w-14" />

                      </div>

                    </div>
                  </div>
                ))}
              </div>
              {projects.length === 0 && (
                <div className="mt-10 text-center text-gray-400">
                  No film projects available.
                </div>
              )}

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT CTA
      ====================================================== */}

      <ContactCTA division="film"></ContactCTA>


      
      


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
};

export default Film;