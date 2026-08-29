import { useState } from "react"
import { MessageCircle,  Send, Check } from "lucide-react"
import api from "./Api"

const DIVISION_CONTENT = {
  tech: {
    label: "Have a project in mind?",
    text: "Fullstack development, ecommerce platforms, and brand identity — we build the complete digital foundation your business needs to grow.",  },
  film: {
    label: "Have a story to tell?",
    text: "Whether it's a short film, brand commercial, documentary, or full production, our team brings the vision, crew, and post-production expertise to bring your story to the screen.",
  },
  construction: {
    label: "Have a space in mind?",
text: "We shape spaces with intention — from architectural construction to refined interiors — blending craftsmanship and design to create environments that feel considered in every detail." },
}

const ContactCTA = ({ division = "tech" }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [status, setStatus] = useState("idle") 

  const content = DIVISION_CONTENT[division] || DIVISION_CONTENT.tech

  const whatsappMessage = encodeURIComponent(
    `Hello, I visited your website and would like to discuss a ${division} project. Please share more details about your services.`
  )

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhoneChange = (value) => {
    const digitsOnly = value.replace(/\D/g, "")
    setForm((prev) => ({ ...prev, phone: digitsOnly }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return

    setStatus("sending")
    try {
      await api.post("/enquiry/submit", { ...form, service: division })
      setStatus("sent")
      setForm({ name: "", email: "", phone: "", message: "" })
      setTimeout(() => setStatus("idle"), 4000)
    } catch (err) {
      console.error(err)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden bg-[#111111] px-6 py-16 lg:px-12 lg:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#111111] to-[#0d0d0d]" />
      <div className="absolute left-1/2 top-0 h-px w-full max-w-3xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="text-center lg:text-left">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
            {content.label}
          </p>

          <h2 className="mt-4 text-3xl font-light leading-tight text-white md:text-5xl">
            Let's build it
            <span className="block text-[#d4af37]">together</span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-xs leading-6 text-gray-400 md:text-sm lg:mx-0">
            {content.text}
          </p>

     <div className="mt-8 flex flex-col items-center justify-start gap-3 sm:flex-row sm:items-start">
    <a
    href={`https://wa.me/919962058118?text=${whatsappMessage}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 border border-green-500/60 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-green-400 transition-all duration-300 hover:bg-green-500 hover:text-white"
  >
    <MessageCircle size={16} />
    WhatsApp
  </a>
</div>
        </div>

        {/* RIGHT — inline enquiry form */}
        <div className="border border-white/10 bg-[#0b0b0b] p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
            Or send us a message
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your name *"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="bg-transparent border-b border-white/15 px-1 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d4af37] transition"
            />
            
            <input
              type="email"
              placeholder="Your email *"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              className="bg-transparent border-b border-white/15 px-1 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d4af37] transition"
            />
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Phone number *"
              value={form.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              maxLength={15}
              className="bg-transparent border-b border-white/15 px-1 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d4af37] transition"
              required
            />
            <textarea
              placeholder="Tell us about your project"
              rows={3}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="bg-transparent border-b border-white/15 px-1 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d4af37] transition resize-none"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex items-center justify-center gap-2 border border-[#d4af37] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black disabled:opacity-50"
            >
              {status === "sending" ? (
                "Sending..."
              ) : status === "sent" ? (
                <>
                  <Check size={16} /> Sent
                </>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>

            {status === "error" && (
              <p className="text-[11px] text-red-400">
                Something went wrong. Try WhatsApp instead.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA