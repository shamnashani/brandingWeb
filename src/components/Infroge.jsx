import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import ContactCTA from "./ContactCTA";
import Footer from "./Footer";
import SEO from './SEO'


const Infroge = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);


  useEffect(() => {
    fetchProjects();
    fetchServices();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/project/viewprojects?page=infroge"
      );

      if (res.data.status === "ok") {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const fetchServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/service/viewservices?page=infroge"
      );

      if (res.data.status === "ok") {
        setServices(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="min-h-screen scroll-smooth bg-[#0b0b0b] text-white">
      <SEO
  title="StudioBits | MERN Full Stack Development & Software Solutions"
  description="StudioBits provides MERN full stack development, custom web applications, software engineering, and scalable digital solutions for businesses worldwide."
  path="/tech"
/>


      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <img
          src="/inf3.jpeg"
          alt="Infroge Technologies"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-20 text-center">

          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-[#F8B400]">
            Infroge Technologies
          </p>

          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Innovating
            <span className="block font-semibold text-[#F8B400]">
              The Future
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm font-semibold leading-7 text-gray-300 md:text-base">
            Empowering businesses through intelligent technology, innovative
            digital solutions, and future-ready systems designed to drive
            growth, transformation, and long-term success.
          </p>

          <a
            href="#projects"
            className="group mt-10 inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition"
          >
            <span className="transition group-hover:text-[#F8B400]">
              Explore Our Projects
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F8B400] text-lg font-semibold text-[#F8B400] transition duration-300 group-hover:bg-[#F8B400] group-hover:text-black">
              →
            </span>
          </a>

        </div>
      </section>


      {/* ABOUT */}
      <section
        id="about"
        className="bg-[#0b0b0b] px-6 py-14 lg:px-12 lg:py-20"
      >
        <div className="mx-auto max-w-[1600px]">

          <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-14">

            <div className="lg:col-span-2">

              <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                Technology
                <span className="block font-semibold text-[#F8B400]">
                  Built for the Digital Future
                </span>
              </h2>

              <div className="mt-6 grid max-w-md gap-4">

                <p className="text-sm font-semibold leading-7 text-gray-400">
                  Infroge Technologies is a forward-thinking technology company
                  focused on developing innovative, reliable, and scalable
                  software and digital solutions.
                </p>

                <p className="text-sm font-semibold leading-7 text-gray-400">
                  We create modern applications, intelligent software, and
                  advanced IT solutions using cutting-edge technologies to
                  deliver seamless digital experiences and solve complex
                  technological challenges.
                </p>

              </div>

              <a
                href="#services"
                className="mt-7 inline-block border-b border-[#F8B400] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F8B400] transition hover:text-white"
              >
                Explore Our Services →
              </a>

            </div>

            <div className="lg:col-span-3">

              <div className="group relative overflow-hidden">

                <img
                  src="/inf5.jpeg"
                  alt="Smart Technology"
                  className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[420px]"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/20" />

                <div className="absolute bottom-0 left-0 p-6">

                  <h3 className="text-xl font-semibold leading-tight text-white">
                    Smart Technology. Powerful Solutions.
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* MISSION & VISION */}
      <section className="bg-[#111111] px-6 py-14 lg:px-12 lg:py-20">

        <div className="mx-auto max-w-[1600px]">

          <div className="grid gap-5 md:grid-cols-2">

            <div className="border border-white/10 bg-[#0b0b0b] p-8 transition duration-500 hover:border-[#F8B400]/40 md:p-10">

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#F8B400]">
                Our Mission
              </p>

              <h3 className="mt-5 text-3xl font-semibold leading-tight text-white">
                Smart Solutions
              </h3>

              <div className="mt-5 h-px w-10 bg-[#F8B400]" />

              <p className="mt-5 text-sm font-semibold leading-7 text-gray-500">
                To provide smart, efficient, and affordable technology
                solutions for businesses of all sizes.
              </p>

            </div>


            <div className="border border-white/10 bg-[#0b0b0b] p-8 transition duration-500 hover:border-[#F8B400]/40 md:p-10">

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#F8B400]">
                Our Vision
              </p>

              <h3 className="mt-5 text-3xl font-semibold leading-tight text-white">
                Digital Leadership
              </h3>

              <div className="mt-5 h-px w-10 bg-[#F8B400]" />

              <p className="mt-5 text-sm font-semibold leading-7 text-gray-500">
                To become a trusted leader in digital transformation and
                technology innovation.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* SERVICES */}
      <section
        id="services"
        className="bg-[#111111] px-6 py-14 lg:px-12 lg:py-20"
      >

        <div className="mx-auto max-w-[1600px]">

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">

            <div className="lg:col-span-4">

              <div className="lg:sticky lg:top-32">

                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#F8B400]">
                  Our Services
                </p>

                <h2 className="mt-6 text-5xl font-semibold leading-tight text-white md:text-6xl lg:text-5xl">
                  Smart
                  <span className="block font-semibold text-[#F8B400]">
                    Digital Solutions
                  </span>
                </h2>

                <p className="mt-6 max-w-sm text-sm font-semibold leading-7 text-gray-500">
                  From customized software and accounting solutions to digital
                  transformation and IT services, we help businesses work
                  smarter and grow faster.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowAllServices(!showAllServices)
                  }
                  className="mt-7 border border-[#F8B400]/60 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F8B400] transition duration-300 hover:bg-[#F8B400] hover:text-black"
                >
                  {showAllServices
                    ? "Show Less"
                    : "View All Services"}
                </button>

              </div>

            </div>


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


      {/* PROJECTS */}
      <section
        id="projects"
        className="bg-[#0b0b0b] px-6 py-12 lg:px-12 lg:py-16"
      >

        <div className="mx-auto max-w-[1600px]">

          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">

            <div className="flex flex-col justify-center lg:col-span-3">

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#F8B400]">
                Our Works
              </p>

              <h2 className="mt-4 max-w-xs text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                Digital
                <span className="font-semibold text-[#F8B400]">
                  {" "}Innovation
                </span>
              </h2>

              <p className="mt-5 max-w-xs text-xs font-semibold leading-6 text-gray-500">
                Discover how our technology solutions help businesses improve
                efficiency, simplify operations, and move confidently into the
                digital future.
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

              <div className="grid gap-4 sm:grid-cols-3">

                {(showAllProjects ? projects : projects.slice(0, 3)).map((project) => (

                  <div
                    key={project._id}
                    className="group relative overflow-hidden"
                  >

                    <div className="relative h-[280px] overflow-hidden md:h-[320px]">

                      <img
                        src={`http://localhost:4000/media/${project.photo}`}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/600x400?text=Project";
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                      <div className="absolute inset-3 border border-transparent transition duration-500 group-hover:border-[#F8B400]/50" />

                      <div className="absolute bottom-0 left-0 right-0 p-5">

                        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F8B400]">
                          {project.category}
                        </p>

                        <h3 className="mt-2 text-lg font-semibold leading-tight text-white">
                          {project.title}
                        </h3>

                        <div className="mt-3 h-px w-8 bg-[#F8B400] transition-all duration-500 group-hover:w-14" />

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


      <ContactCTA division="tech"></ContactCTA>
      


      <Footer></Footer>
      

    </div>
  );
};

export default Infroge;