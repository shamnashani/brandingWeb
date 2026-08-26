import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import api from "./Api";

function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

useEffect(() => {
  const fetchSocial = async () => {
    try {
      const res = await api.get("/settings/social");

      console.log("WHATSAPP API RESPONSE:", res.data);
      console.log("WHATSAPP URL:", res.data.whatsapp);

      setWhatsapp(res.data.whatsapp || "");
    } catch (err) {
      console.error("WhatsApp error:", err);
    }
  };

  fetchSocial();
}, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openWhatsApp = () => {
    if (!whatsapp) return;

    window.open(
      whatsapp,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      {/* ================================
          WHATSAPP BUTTON
      ================================= */}

      {whatsapp && (
        <button
          onClick={openWhatsApp}
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          className="
            fixed
            bottom-6
            right-6
            z-[9999]
            w-14
            h-14
            rounded-full
            bg-[#25D366]
            text-white
            shadow-lg
            flex
            items-center
            justify-center
            hover:bg-[#20bd5a]
            hover:scale-110
            transition-all
            duration-300
          "
        >
          <FaWhatsapp size={30} />
        </button>
      )}

      {/* ================================
          SCROLL TO TOP BUTTON
      ================================= */}

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className={`
          fixed
          bottom-24
          right-6
          z-[9999]
          w-12
          h-12
          rounded-full
          bg-[#F8B400]
          text-black
          shadow-lg
          flex
          items-center
          justify-center
          transition-all
          duration-300

          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
      >
        <ChevronUp size={22} />
      </button>
    </>
  );
}

export default FloatingButtons;