import React from "react";

import {
  Award,
  Lightbulb,
  Users,
  Briefcase,
  ShieldCheck,
  Layers,
} from "lucide-react";

function WhyChooseUs() {
const features = [
  {
    icon: Users,
    title: "Built Around You",
    desc: "We take time to understand your needs and expectations.",
  },
  {
    icon: Lightbulb,
    title: "Every Project Matters",
    desc: "We give every project the attention and care it deserves.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Comes First",
    desc: "We focus on quality in every detail of our work.",
  },
  {
    icon: Briefcase,
    title: "Experience You Can Trust",
    desc: "Our team brings knowledge and experience to every project.",
  },
  {
    icon: Layers,
    title: "With You Throughout",
    desc: "We stay connected from the first step to the final delivery.",
  },
  {
    icon: Award,
    title: "Built on Trust",
    desc: "We believe in clear communication and lasting relationships.",
  },
];

  return (
    <section
      className="
        bg-gradient-to-b
        from-[#0A0A0A]
        via-[#061A24]
        to-[#02141C]
        py-16
        px-6
        sm:py-20
        lg:py-24
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div
          className="mb-12 sm:mb-16 lg:mb-20"
          data-aos="fade-up"
        >
          <div className="flex items-center justify-center gap-3 mb-5">

            <span className="h-px w-8 bg-[#F8B400]" />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#F8B400]
              "
            >
              Why Choose Us
            </span>

            <span className="h-px w-8 bg-[#F8B400]" />

          </div>

          <h2
            className="
              text-center
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
              leading-tight
              text-white
            "
          >
            Excellence Across
            <span className="block text-[#F8B400]">
              Every Division
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-center
              text-sm
              leading-7
              text-gray-400
              sm:text-base
            "
          >
            Delivering creativity, craftsmanship, and innovation through a
            commitment to quality, reliability, and customer success.
          </p>
        </div>

        {/* ================= FEATURES ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className={`
                  group
                  relative
                  flex
                  gap-5
                  border-white/10
                  py-8
                  sm:gap-7
                  sm:py-9

                  ${
                    index < 4
                      ? "border-b"
                      : ""
                  }

                  ${
                    index % 2 === 0
                      ? "md:border-r md:pr-10"
                      : "md:pl-10"
                  }

                  ${
                    index >= 4
                      ? "md:border-b-0"
                      : ""
                  }
                `}
              >

                {/* NUMBER */}

                <div className="shrink-0">

                  <span
                    className="
                      text-xs
                      font-semibold
                      tracking-[0.2em]
                      text-[#F8B400]/70
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                {/* ICON */}

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-[#F8B400]
                    transition-all
                    duration-500
                    group-hover:border-[#F8B400]/50
                    group-hover:bg-[#F8B400]/10
                    group-hover:scale-105
                  "
                >
                  <Icon
                    size={21}
                    strokeWidth={1.5}
                  />
                </div>

                {/* CONTENT */}

                <div className="flex-1">

                  <h3
                    className="
                      text-lg
                      font-semibold
                      text-white
                      sm:text-xl
                    "
                  >
                    {item.title}
                  </h3>

                  <div
                    className="
                      mt-3
                      h-px
                      w-7
                      bg-[#F8B400]
                      transition-all
                      duration-500
                      group-hover:w-14
                    "
                  />

                  <p
                    className="
                      mt-4
                      max-w-lg
                      text-sm
                      leading-7
                      text-gray-400
                    "
                  >
                    {item.desc}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

        {/* ================= BOTTOM LINE ================= */}

        <div
          className="
            mt-10
            border-t
            border-white/10
            pt-7
            text-center
          "
          data-aos="fade-up"
        >
          <p className="text-xs tracking-wide text-gray-500 sm:text-sm">
            One vision. Multiple capabilities.
            <span className="mx-2 text-[#F8B400]">•</span>
            Excellence without compromise.
          </p>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;