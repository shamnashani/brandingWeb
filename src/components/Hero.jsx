import React, { useEffect, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

import techImg from "../assets/images/tech.png";
import filmImg from "../assets/images/film.jpg";
import constructionImg from "../assets/images/construction.jpg";

const SLIDE_DURATION = 5000; // 5 seconds per division

function Hero() {
  const slides = [
    {
      key: "tech",
      eyebrow: "StudioBits Tech",
      title: "Powering",
      highlight: "Digital Innovation",
      desc: "We help businesses embrace the future through intelligent software, scalable digital solutions, and transformative technology services that drive growth and efficiency.",
      image: techImg,
      sectionId: "tech",
    },
    {
      key: "film",
      eyebrow: "Film Division",
      title: "Where Creativity",
      highlight: "Meets The Camera",
      desc: "From concept development and scriptwriting to production and post-production, we create films, advertisements, and visual content that tell stories with impact.",
      image: filmImg,
      sectionId: "film",
    },
    {
      key: "construction",
      eyebrow: "Construction & Interior",
      title: "Building Spaces",
      highlight: "That Inspire",
      desc: "We design and build exceptional spaces that blend innovation, functionality, and elegance — crafted to deliver lasting quality and meaningful experiences.",
      image: constructionImg,
      sectionId: "construction",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgressKey((k) => k + 1);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goTo = (index) => {
    setCurrent(index);
    setProgressKey((k) => k + 1);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const slide = slides[current];

  return (
    <section className="relative bg-gradient-to-b from-[#0A0A0A] via-[#061A24] to-[#02141C] pt-32 pb-20 px-6 lg:px-12 overflow-hidden">

      {/* Ambient glow, subtle, matches theme accent colors */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#F8B400]/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#0E7490]/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — text content, changes per slide */}
          <div>
            {/* Eyebrow — hidden on phone, keeps mobile view minimal */}
            <p
              key={`eyebrow-${slide.key}`}
              className="hidden sm:block text-[#F8B400] uppercase tracking-[4px] text-xs sm:text-sm font-semibold mb-5 animate-fadeUp"
            >
              {slide.eyebrow}
            </p>

            {/* Main heading — always visible, the only text shown on phone */}
            <h1
              key={`title-${slide.key}`}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 animate-fadeUp"
            >
              {slide.title}
              <br />
              <span className="text-[#0E7490]">{slide.highlight}</span>
            </h1>

            {/* Description — hidden on phone */}
            <p
              key={`desc-${slide.key}`}
              className="hidden sm:block text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mb-9 animate-fadeUp"
            >
              {slide.desc}
            </p>

            {/* BUTTONS — Explore hidden on phone, Contact shown everywhere */}
            <div className="flex flex-wrap items-center gap-4 mt-6 sm:mt-0">
              <button
                onClick={() => scrollToSection(slide.sectionId)}
                className="hidden sm:inline-flex group items-center gap-2 bg-[#F8B400] hover:brightness-110 text-black px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300"
              >
                Explore {slide.eyebrow.split(" ")[0]}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => scrollToSection("contact-cta")}
                className="inline-flex items-center gap-2 bg-[#F8B400] sm:bg-transparent border border-[#F8B400] hover:bg-[#F8B400]/10 text-black sm:text-[#F8B400] px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <MessageCircle size={18} />
                Contact Us
              </button>
            </div>

            {/* Progress indicators — thin bars that fill over the slide duration */}
            <div className="flex gap-2 mt-12">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => goTo(i)}
                  className="relative h-[3px] flex-1 max-w-[64px] rounded-full bg-white/10 overflow-hidden"
                >
                  {i === current && (
                    <span
                      key={progressKey}
                      className="absolute inset-y-0 left-0 bg-[#F8B400] rounded-full"
                      style={{
                        animation: `fillBar ${SLIDE_DURATION}ms linear forwards`,
                      }}
                    />
                  )}
                  {i < current && (
                    <span className="absolute inset-0 bg-[#F8B400] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — image, changes per slide with crossfade */}
          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              {slides.map((s, i) => (
                <img
                  key={s.key}
                  src={s.image}
                  alt={s.eyebrow}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    i === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Division label chip, bottom-left of image */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-[#F8B400] animate-pulse" />
                <span className="text-white text-xs sm:text-sm font-medium">
                  {slide.eyebrow}
                </span>
              </div>
            </div>

            {/* Decorative accent ring behind image */}
            <div className="absolute -z-10 -top-6 -right-6 w-full h-full rounded-3xl border border-[#F8B400]/20 hidden sm:block" />
          </div>

        </div>

      </div>

      {/* Keyframes for text fade + progress bar fill */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.6s ease forwards;
        }
        @keyframes fillBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}

export default Hero;
