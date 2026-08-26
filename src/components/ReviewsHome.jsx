import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import api from "./Api";
import Aos from "aos";

const GOOGLE_REVIEW_LINK = "https://g.page/r/YOUR_UNIQUE_ID/review"; // ← replace with your real link

const TestimonialsFeatured = ({ division }) => {
  const [reviews, setReviews] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    Aos.init({ duration: 1000, offset: 120, once: true });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/rev/featured");
        const filtered = division
          ? res.data.filter((r) => r.service === division)
          : res.data;
        setReviews(filtered.slice(0, 6));
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [division]);

  if (reviews.length === 0) return null;

  const initials = (name) =>
    name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const avgRating =
    (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section  id="reviews" className="bg-gradient-to-b from-[#02141C]  via-[#061A24] to-[#02141C] py-16 md:py-24 px-5 md:px-6  scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        {/* Heading, same pattern as your other sections */}
        <div className="text-center mb-8 sm:mb-10" data-aos="fade-up">
          <span className="text-[#F8B400] uppercase tracking-[4px] text-sm font-semibold">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 leading-tight">
            What Our Clients Say
          </h2>
        </div>

        {/* RATING SUMMARY BANNER */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#0E7490] rounded-2xl p-6 sm:p-8 mb-10 sm:mb-14"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <p className="text-4xl sm:text-5xl font-bold text-white">{avgRating}</p>
            <div>
              <div className="flex text-[#F8B400] text-lg gap-0.5">
                {"★".repeat(Math.round(avgRating))}
                <span className="text-white/20">{"★".repeat(5 - Math.round(avgRating))}</span>
              </div>
              <p className="text-white/70 text-sm mt-1">
                {reviews.length} verified review{reviews.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <a
            href={GOOGLE_REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F8B400] hover:bg-[#e0a300] text-[#0A0A0A] px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shrink-0"
          >
            <ArrowRight size={16} />
            Review us on Google
          </a>
        </div>

        {/* CARD GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
  {reviews.map((rev, index) => {
    const isLong = rev.message.length > 110;
    const isOpen = expanded[rev._id];
    console.log(rev.service);

    return (
      <div
        key={rev._id}
        data-aos="fade-up"
        data-aos-delay={index * 100}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-[#0E7490] transition-all duration-300 h-full flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#F8B400] flex items-center justify-center text-[#0A0A0A] text-xs font-bold shrink-0">
              {initials(rev.name)}
            </div>

            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {rev.name}
              </p>
              <p className="text-gray-500 text-xs">
                {formatDate(rev.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex text-[#F8B400] text-sm shrink-0 gap-0.5">
            {"★".repeat(rev.rating)}
            <span className="text-white/10">
              {"★".repeat(5 - rev.rating)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          {(() => {
            const badValues = ["true", "false", "undefined", "null"];
            const hasValidService =
              rev.service &&
              !badValues.includes(
                String(rev.service).toLowerCase()
              );

            if (!hasValidService) return null;

            const label =
              rev.service === "Technology"
                ? "StudioBits Tech"
                : rev.service;

            return (
              <h3 className="text-white font-semibold text-[15px] mb-3">
                {label} 
              </h3>
            );
          })()}

          <p
            className="text-gray-400 text-sm leading-relaxed"
            style={{
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              ...(!isOpen
                ? {
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }
                : {}),
            }}
          >
            "{rev.message}"
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4">
          {isLong && (
            <button
              onClick={() => toggleExpand(rev._id)}
              className="text-[#F8B400] text-xs font-medium hover:underline"
            >
              {isOpen ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    );
  })}
</div>

      </div>
    </section>
  );
};

export default TestimonialsFeatured;
