import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { MapPin, Mail } from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedin,
} from "react-icons/fa";

import api from "./Api";

function Footer() {
    const location = useLocation();
    const nav = useNavigate();
  const [social, setSocial] = useState({
    instagram: "",
    facebook: "",
    linkedin:""
  });
    const isS1=location.pathname ==='/film' || location.pathname==='/construction'

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const res = await api.get("/settings/social");

        console.log("FOOTER SOCIAL RESPONSE:", res.data);

        setSocial({
          instagram: res.data.instagram || "",
          facebook: res.data.facebook || "",
          linkedin:res.data.linkedin||""
        });
      } catch (err) {
        console.error(
          "FOOTER SOCIAL ERROR:",
          err.response?.data || err.message
        );
      }
    };

    fetchSocial();
  }, []);

const socialLinks = [
  {
    key: "instagram",
    icon: FaInstagram,
    url: social.instagram,
    bg: "bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]",
  },
  {
    key: "facebook",
    icon: FaFacebookF,
    url: social.facebook,
    bg: "bg-[#1877F2]",
  },
  {
    key: "linkedin",
    icon: FaLinkedin,
    url: social.linkedin,
    bg: "bg-[#0A66C2]",
  },
];

  const handleLeaveReview = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      nav("/submit-review");
    } else {
      nav("/login", { state: { redirectTo: "/submit-review" } });
    }
  };

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-16">


        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <div>
            <Link
              to="/"
              className="block mb-5"
            >
             {isS1?(
              <>
                       <img
  src="/s1.avif"
  alt="S1 creations"
  className="h-20 sm:h-16 md:h-20 w-auto object-contain"
/>
         <p className="text-gray-400 leading-7 text-sm mb-6">
              Building Futures. Creating Stories. Delivering Excellence.
            </p>
            </>
            ):(
                            <>
           <img
  src="/studiobits.png"
  alt="StudioBits Technology"
  className="h-20 sm:h-16 md:h-20 w-auto object-contain"
/>
 <p className="text-gray-400 leading-7 text-sm mb-6">
              Creating innovative software solutions that
              help businesses grow through technology.
            </p>
            </>
            

            )
                     }
            </Link>

            {/* Legal Links */}

            <div className="flex flex-wrap gap-4 text-xs text-gray-500">

              <Link
                to="/terms-and-conditions"
                className="hover:text-white transition"
              >
                Terms
              </Link>

              <Link
                to="/privacy-policy"
                className="hover:text-white transition"
              >
                Privacy
              </Link>



            </div>
          </div>
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">

              <li>
                <HashLink
                  smooth
                  to="/#about"
                  className="hover:text-white transition"
                >
                  About Us
                </HashLink>
              </li>

              <li>
                <HashLink
                  smooth
                  to="/#divisions"
                  className="hover:text-white transition"
                >
                  Our Services
                </HashLink>
              </li>

              <li>
                <HashLink
                  smooth
                  to="/#reviews"
                  className="hover:text-white transition"
                >
                  Client Reviews
                </HashLink>
              </li>

              <li>
                <Link
                  to="/getintouch"
                  className="hover:text-white transition"
                >
                  Careers
                </Link>
              </li>

            </ul>
          </div>
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">

              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/getintouch"
                  className="hover:text-white transition"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/submit-review"
                  onClick={handleLeaveReview}
                  className="hover:text-white transition"
                >
                  Leave Review
                </Link>
              </li>

              <li>
                <Link
                  to="/getintouch"
                  className="hover:text-white transition"
                >
                  Get Started
                </Link>
              </li>

            </ul>
          </div>
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Office Location
            </h3>

            <div className="space-y-4 text-sm text-gray-400">

              <p className="flex gap-3">

                <MapPin
                  size={18}
                  className="text-[#d4af37] shrink-0"
                />

                <span>
                  Kerala, India
                </span>

              </p>

              <p className="flex gap-3">

                <Mail
                  size={18}
                  className="text-[#d4af37] shrink-0"
                />

                <span>
                  studiobits@gmail.com
                </span>

              </p>

            </div>
          </div>

          <div>

            <h3 className="text-lg font-semibold mb-5">
              Follow Us
            </h3>

            <p className="text-sm text-gray-500 leading-6 mb-5">
              Connect with StudioBits on social media.
            </p>

            <div className="flex items-center gap-3">

              {socialLinks.map((socialItem) => {

                if (!socialItem.url) {
                  return null;
                }

                const Icon = socialItem.icon;

                return (
                  <a
                    key={socialItem.key}
                    href={socialItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`StudioBits ${socialItem.key}`}
                    title={` ${socialItem.key}`}
                    className={`
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-white
                      shadow-lg
                      ${socialItem.bg}
                      hover:scale-110
                      hover:shadow-xl
                      transition-all
                      duration-300
                    `}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}

              {/* No social links */}

              {!social.instagram &&
                !social.facebook &&
                !social.linkedin && (
                  <span className="text-xs text-gray-600">
                    Social links coming soon
                  </span>
                )}

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">

            © {new Date().getFullYear()} StudioBits. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}

export default Footer;