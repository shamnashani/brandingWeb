import filmImg from "../assets/images/film.jpg";
import constructionImg from "../assets/images/construction.jpg";
import techImg from "../assets/images/tech.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Divisions() {
  const token = localStorage.getItem("token");



  return (
    <section id="divisions" className="bg-[#0A0A0A]  md:py-24 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-[#F8B400] uppercase tracking-[4px] text-sm font-semibold">
            Three Divisions, One Vision
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Our Expertise
          </h2>

          <p className="text-gray-400 mt-5 max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-2">
            Creating impactful stories, inspiring spaces, and innovative
            digital solutions that empower businesses and communities.
          </p>
        </div>

        {/* INFORGE Technologies */}
        <div
          id="tech"
          className="grid lg:grid-cols-2 gap-8 md:gap-14 items-center mb-20 md:mb-32"
        >
          <div className="overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <img
              src={techImg}
              alt="StudioBits Tech"
              className="w-full h-[260px] sm:h-[380px] md:h-[550px] object-cover hover:scale-105 duration-700"
            />
          </div>

          <div>
            <span className="text-[#F8B400] uppercase tracking-wider text-sm font-semibold">
              StudioBits Tech
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
              Powering Digital Innovation
            </h3>

            <p className="text-gray-400 text-base md:text-lg leading-7 md:leading-relaxed mb-6 md:mb-8">
              We help businesses embrace the future through intelligent
              software, scalable digital solutions, and transformative
              technology services that drive growth, efficiency, and success.
            </p>

            <Link
              to={token ? "/tech" : "/login"}
              state={{ redirectTo: "/tech" }}
            >
              <button
               className="group flex
               items-center
               gap-2
               bg-[#0E7490]
               hover:bg-[#0b6178]
               text-white
               px-6
               md:px-8
               py-3
               rounded-full
               text-sm
               md:text-base
               transition-all
               duration-300">
              Discover More

              <ArrowRight
                 size={16}
                 className="transition-transform duration-300 group-hover:translate-x-1"
               />
            </button>
            </Link>
          </div>
        </div>

        {/* Film Division */}
        <div
          id="film"
          className="grid lg:grid-cols-2 gap-8 md:gap-14 items-center mb-20 md:mb-32"
        >
          <div className="overflow-hidden  shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <img
              src={filmImg}
              alt="Film Division"
              className="w-full h-[260px] sm:h-[380px] md:h-[550px] object-cover hover:scale-105 duration-700"
            />
          </div>

          <div>
            <span className="text-[#F8B400] uppercase tracking-wider text-sm font-semibold">
              Film Division
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
              Where Creativity Meets the Camera
            </h3>

            <p className="text-gray-400 text-base md:text-lg leading-7 md:leading-relaxed mb-6 md:mb-8">
              From concept development and scriptwriting to production and
              post-production, we create advertisements, films, promotional
              videos, and visual content that help brands, businesses, and
              creators tell their stories with impact.
            </p>

            <Link
              to={token ? "/film" : "/login"}
              state={{ redirectTo: "/film" }}
            >
              <button
               className="group flex items-center  gap-2 bg-[#0E7490] hover:bg-[#0b6178] text-white px-6
               md:px-8
               py-3
               rounded-full
               text-sm
               md:text-base
               transition-all
               duration-300">
              Discover More

              <ArrowRight
                 size={16}
                 className="transition-transform duration-300 group-hover:translate-x-1"
               />
            </button>
            </Link>
          </div>
        </div>

        {/* Construction Division */}
        <div
          id="construction"
          className="grid lg:grid-cols-2 gap-8 md:gap-14 items-center"
        >
                <div className="overflow-hidden  shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <img
              src={constructionImg}
              alt="Construction Division"
              className="w-full h-[260px] sm:h-[380px] md:h-[550px] object-cover hover:scale-105 duration-700"
            />
          </div>
          <div className="order-2 lg:order-1">
            <span className="text-[#F8B400] uppercase tracking-wider text-sm font-semibold">
              Construction & Interior Design
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight">
              Building Spaces That Inspire
            </h3>

            <p className="text-gray-400 text-base md:text-lg leading-7 md:leading-relaxed mb-6 md:mb-8">
              We design and build exceptional spaces that blend innovation,
              functionality, and elegance. Every project is crafted to deliver
              lasting quality, modern aesthetics, and meaningful experiences.
            </p>

            <Link
              to={token ? "/construction" : "/login"}
              state={{ redirectTo: "/construction" }}
            >
              <button
               className="group flex
               items-center
               gap-2
               bg-[#0E7490]
               hover:bg-[#0b6178]
               text-white
               px-6
               md:px-8
               py-3
               rounded-full
               text-sm
               md:text-base
               transition-all
               duration-300">
              Discover More

              <ArrowRight
                 size={16}
                 className="transition-transform duration-300 group-hover:translate-x-1"
               />
            </button>
            </Link>
          </div>

  
        </div>

        

      </div>
    </section>
  );
}

export default Divisions;