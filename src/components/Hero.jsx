import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import filmVideo from "../assets/videos/film.mp4";
import constructionVideo from "../assets/videos/construction.mp4";
import technologyVideo from "../assets/videos/tech.mp4";

function Hero() {
  const slides = [
    {
      key: "technology",
      eyebrow: "StudioBits Tech",
      title: "Driving",
      highlight: "Innovation",
      desc: "Building websites tailored to your vision and requirements.",
      video: technologyVideo,
      sectionId: "tech",
    },
    {
      key: "film",
      eyebrow: "Film Division",
      title: "Creating",
      highlight: "Stories",
      desc: "Bringing cinematic visions to life through creativity and excellence.",
      video: filmVideo,
      sectionId: "film",
    },
    {
      key: "construction",
      eyebrow: "Construction & Interior",
      title: "Building",
      highlight: "Futures",
      desc: "Delivering reliable construction solutions with precision and quality.",
      video: constructionVideo,
      sectionId: "construction",
    },
  ];

  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  const slide = slides[current];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative bg-white pt-28 pb-16 px-4 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1500px]">

        {/* ROUNDED VIDEO CARD — padded on all sides */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[28px] overflow-hidden">

          <video
            key={slide.key}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={slide.video} type="video/mp4" />
          </video>

          {/* Gradient for text legibility, not a flat dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

          {/* TEXT CONTENT — changes with slide */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">

            <p
              key={`eyebrow-${slide.key}`}
              className="text-[11px] uppercase tracking-[0.35em] text-[#d4af37] mb-4 animate-fadeUp"
            >
              {slide.eyebrow}
            </p>

            <h1
              key={`title-${slide.key}`}
              className="text-4xl sm:text-6xl lg:text-7xl font-light leading-[0.95] text-white animate-fadeUp"
            >
              {slide.title}
              <br />
              <span className="font-semibold text-[#d4af37]">
                {slide.highlight}
              </span>
            </h1>

            <p
              key={`desc-${slide.key}`}
              className="mt-5 max-w-md text-sm sm:text-base leading-6 text-gray-300 animate-fadeUp"
            >
              {slide.desc}
            </p>

            {/* BUTTON ROW — Explore + Contact Us, matched sizing */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection(slide.sectionId)}
                className="inline-flex w-fit items-center gap-2 bg-[#F8B400] text-black px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300"
              >
                Explore {slide.eyebrow.split(" ")[0]}
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={() => scrollToSection("contact-cta")}
                className="inline-flex w-fit items-center gap-2 border border-white/20 hover:border-[#0E7490] hover:bg-[#0E7490]/10 text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300"
              >
                <MessageCircle size={16} />
                Contact Us
              </button>
            </div>

          </div>

          {/* Slide indicators — inside the card, bottom right */}
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setCurrent(i)}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  current === i ? "w-8 bg-[#d4af37]" : "w-4 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Local keyframes for text transition */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}

export default Hero;
