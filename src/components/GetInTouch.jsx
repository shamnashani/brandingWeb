import React, { useState } from "react";
import { ArrowRight, Mail, MessageSquare, Clock } from "lucide-react";
import api from "./Api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import heroImage from "../assets/images/get in touch.jpg";
import SEO from './SEO'

function GetInTouch() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.phone) {
      alert("Please enter your phone number.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/enquiry/submit", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        message: form.message,
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <SEO
  title="Get in Touch | S1 Creations & StudioBits"
  description="Connect with S1 Creations and StudioBits to discuss your next creative, construction, software, or technology project."
  path="/getintouch"
/>


      <section className="bg-black pt-24 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="relative h-[50vh] min-h-[500px] rounded-[42px] overflow-hidden">

            <img
              src={heroImage}
              alt="Get in touch"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-black/55" />

            {/* Content */}

            <div className="relative z-10 h-full flex items-center justify-center text-center px-6">

              <div>
                <h1 className="text-5xl md:text-7xl font-bold text-white">
                  Get In{" "}
                  <span className="text-[#d4af37]">
                    Touch
                  </span>
                </h1>
              </div>

            </div>

          </div>

        </div>
      </section>
      <section
        id="contact-cta"
        className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 px-6 sm:px-10"
      >

        <div className="mx-auto max-w-[1200px]">

          <div className="grid lg:grid-cols-12 gap-14">

            <div className="lg:col-span-5">

              <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-[1.1]">

                Let's build
                <br />

                something{" "}

                <span className="text-[#d4af37]">
                  real.
                </span>

              </h1>

              <p className="mt-6 text-sm leading-6 text-gray-500 max-w-sm">

                Tell us what you're working on. We typically reply
                within one business day with next steps or a few
                clarifying questions.

              </p>

              <div className="mt-10 flex flex-col gap-5">

                {/* Email */}

                <a
                  href="mailto:studiobits@gmail.com"
                  className="flex items-center gap-4 group"
                >

                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#d4af37]/40 transition">

                    <Mail
                      size={16}
                      className="text-[#d4af37]"
                    />

                  </div>

                  <div>

                    <p className="text-sm text-white">
                      studiobits@gmail.com
                    </p>

                    <p className="text-xs text-gray-600">
                      General & project enquiries
                    </p>

                  </div>

                </a>

                {/* WhatsApp */}

                <a
                  href="https://wa.me/919962058118?text=Hello%20StudioBits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >

                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#d4af37]/40 transition">

                    <MessageSquare
                      size={16}
                      className="text-[#d4af37]"
                    />

                  </div>

                  <div>

                    <p className="text-sm text-white">
                      Chat on WhatsApp
                    </p>

                    <p className="text-xs text-gray-600">
                      Fastest response, business hours
                    </p>

                  </div>

                </a>

                {/* Working Hours */}

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">

                    <Clock
                      size={16}
                      className="text-[#d4af37]"
                    />

                  </div>

                  <div>

                    <p className="text-sm text-white">
                      Mon – Fri, 10am – 4pm IST
                    </p>

                    <p className="text-xs text-gray-600">
                      Average reply time: 4 hours
                    </p>

                  </div>

                </div>

              </div>

            </div>
            <div className="lg:col-span-7">

              <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-10">

                {submitted ? (
                  <div className="flex flex-col items-center text-center py-16">

                    <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-5">

                      <ArrowRight
                        size={22}
                        className="text-[#d4af37] -rotate-45"
                      />

                    </div>

                    <h3 className="text-xl font-medium text-white">
                      Message sent
                    </h3>

                    <p className="text-sm text-gray-500 mt-2 max-w-xs">

                      Thanks for reaching out — we'll get back to you
                      within one business day.

                    </p>

                    <button
                      onClick={() => {
                        setSubmitted(false);

                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          message: "",
                        });
                      }}
                      className="mt-6 text-sm text-[#d4af37] hover:underline"
                    >
                      Send another message
                    </button>

                  </div>

                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >


                    <div className="grid sm:grid-cols-2 gap-5">

                      {/* Full Name */}

                      <div>

                        <label className="text-xs text-gray-400 mb-1.5 block">

                          Full name{" "}

                          <span className="text-red-400">
                            *
                          </span>

                        </label>

                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange("name")}
                          placeholder="Enter your full name"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-gray-700 outline-none focus:border-[#d4af37]/50 transition"
                        />

                      </div>

                      {/* Email */}

                      <div>

                        <label className="text-xs text-gray-400 mb-1.5 block">
                          Work email{" "}
                          <span className="text-red-400">
                            *
                          </span>

                        </label>

                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange("email")}
                          placeholder="Enter your email address"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-gray-700 outline-none focus:border-[#d4af37]/50 transition"
                        />

                      </div>

                    </div>

                    <div>

                      <label className="text-xs text-gray-400 mb-1.5 block">
                        Phone number{" "}
                        <span className="text-red-400">
                          *
                        </span>
                      </label>

<PhoneInput
  country="in"
  enableSearch
  value={form.phone}
  onChange={(phone) =>
    setForm((prev) => ({ ...prev, phone }))
  }
   inputStyle={{
    width: "100%",
    background: "#0a0a0a",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.1)",
    height: "42px",
  }}
  buttonStyle={{
    background: "#d4af37",
    border: "1px solid rgba(212,175,55,0.4)",
  }}
/>
                    </div>

                    <div>

                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={handleChange("message")}
                        placeholder="Tell us about your project..."
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3.5 py-3 text-sm text-white placeholder:text-gray-700 outline-none focus:border-[#d4af37]/50 transition resize-none"
                      />

                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 flex items-center justify-center gap-2 bg-[#d4af37] text-black text-sm font-semibold py-3 rounded-lg hover:brightness-110 disabled:opacity-60 transition-all duration-200 w-fit px-8"
                    >

                      {loading
                        ? "Sending…"
                        : "Send message"}

                      {!loading && (
                        <ArrowRight size={15} />
                      )}

                    </button>

                  </form>

                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default GetInTouch;