import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section
      id="contact-cta"
      className="bg-gradient-to-b from-[#02141C] to-[#0A0A0A] md:py-15 px-6"
    >
      <div
        className="max-w-5xl mx-auto text-center"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <span className="text-[#F8B400] uppercase tracking-[4px] text-sm font-semibold">
          Get In Touch
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mt-6 mb-6 leading-tight">
          Tell us what you're
          <br className="hidden sm:block" />
          dreaming up.
        </h2>

        <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Every great project starts with a simple conversation. Reach out,
          share what's on your mind, and let's figure out the rest together
          — one step at a time.
        </p>

        <div className="flex justify-center mt-10">
          <Link to="/getintouch">
            <button className="bg-[#F8B400] text-black px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition duration-300 mb-20 md:mb-32">
              Let's Talk
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
