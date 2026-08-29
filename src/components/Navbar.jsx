import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import api from "./Api";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const lastScroll = useRef(0);  
  const closeTimer = useRef(null);

  const nav = useNavigate();
  const location = useLocation();
  const isS1=location.pathname ==='/film' || location.pathname==='/construction'
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [location.pathname]);

    useEffect(() => {
      const onScroll = () => {
        const y = window.scrollY;
        const heroHeight = window.innerHeight * 0.8;
  
        setPastHero(y > heroHeight);
  
       
        if (y > heroHeight && y > lastScroll.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastScroll.current = y;
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);



  const logout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await api.post("/user/logout", { userId });
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      nav("/login");
    }
  };

  const goToDivision = (path) => {
    if (token) {
      nav(path);
    } else {
      nav("/login", { state: { redirectTo: path } });
    }
  };

  const menu = [
    { label: "Home", path: "/" },
    {
      label: "About",
      dropdown: [
        { label: "About Us", path: "/#about" },
        { label: "Reviews", path: "/#reviews" },
      ],
    },
    {
      label: "Divisions",
      dropdown: [
        { label: "StidioBits Tech", path: "/tech" },
        { label: "Film Division", path: "/film" },
        { label: "Construction & Interior", path: "/construction" },
      ],
    },
    {
      label: "Client Service",
      dropdown: [
        { label: "Company Login", path: "/login" },
        { label: "Submit Rview", path: "/submit-review" }
      ],
    },
  ];

  const handleEnter = (label) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (path) => location.pathname === path;

return (
  <nav
    className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-black/5 transition-all duration-500 ease-out
      ${hidden ? "-translate-y-full" : "translate-y-0"}
      ${pastHero ? "shadow-md" : ""}
    `}
  >
    <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
      <div className="flex justify-between items-center h-[92px]">

        {/* Logo + tagline */}
<Link to="/" className="flex items-center shrink-0">
  {isS1 ? (
    <img
      src="/s1.avif"
      alt="S1 Creations"
      className="h-14 sm:h-16 md:h-20 w-auto object-contain"
    />
  ) : (
    <>
      {/* Mobile: Icon only */}
      <img
        src="/studiobits-icon.png"
        alt="StudioBits"
        className="h-12 w-auto sm:hidden"
      />

      {/* Tablet & Desktop: Full Logo */}
      <img
        src="/studiobits.png"
        alt="StudioBits Technology"
        className="hidden sm:block h-16 md:h-20 w-auto object-contain"
      />
    </>
  )}
</Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-9">
            {menu.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleEnter(item.label)}
                onMouseLeave={() => item.dropdown && handleLeave()}
              >
                {item.dropdown ? (
                  <button
                    className={`flex items-center gap-1 text-[15px] transition-colors duration-200 ${
                      activeDropdown === item.label
                        ? "text-[#0b0b0b] font-bold"
                        : "text-gray-700 font-medium hover:text-[#0b0b0b]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={15}
                      strokeWidth={2.5}
                      className={`text-gray-400 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-[15px] transition-colors duration-200 ${
                      isActive(item.path)
                        ? "text-[#0b0b0b] font-bold"
                        : "text-gray-700 font-medium hover:text-[#0b0b0b]"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown panel */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-60">
                    <div className="bg-white border border-black/5 rounded-xl shadow-xl overflow-hidden">
{item.dropdown.map((sub) =>
  sub.path.startsWith("/#") ? (
    <HashLink
      key={sub.label}
      smooth
      to={sub.path}
      className="block w-full px-5 py-3 text-sm text-gray-700 hover:text-[#d4af37] hover:bg-gray-50 border-b border-gray-100 last:border-none"
    >
      {sub.label}
    </HashLink>
  ) : (
    <button
      key={sub.label}
      onClick={() =>
        sub.path === "/login"
          ? nav("/login")
          : goToDivision(sub.path)
      }
      className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:text-[#d4af37] hover:bg-gray-50 border-b border-gray-100 last:border-none"
    >
      {sub.label}
    </button>
  )
)}
                    </div>
                  </div>
                )}
              </div>
            ))}

              {role === "user" && (
              <Link
                to="/getintouch"
                className={`text-[15px] transition-colors duration-200 ${
                  isActive("/getintouch")
                    ? "text-[#0b0b0b] font-bold"
                    : "text-gray-700 font-medium hover:text-[#0b0b0b]"
                }`}
              >
                Contact
              </Link>
            )}


            {role === "admin" && (
              <Link
                to="/adminhome"
                className={`text-[15px] transition-colors duration-200 ${
                  isActive("/adminhome")
                    ? "text-[#0b0b0b] font-bold"
                    : "text-gray-700 font-medium hover:text-[#0b0b0b]"
                }`}
              >
                Admin
              </Link>
            )}

            {token && (
              <button
                onClick={logout}
                className="text-[15px] font-medium text-gray-700 hover:text-red-500 transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-[#0b0b0b]"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-black/5 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col p-4">

            {menu.map((item) => (
              <div key={item.label} className="border-b border-gray-100">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileDropdown(mobileDropdown === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between py-3 text-[15px] font-medium text-gray-800"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          mobileDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileDropdown === item.label && (
                      <div className="pb-3 pl-3 flex flex-col gap-1">
                        {item.dropdown.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() =>
                              sub.path === "/login" || sub.path.startsWith("/#")
                                ? nav(sub.path)
                                : goToDivision(sub.path)
                            }
                            className="text-left py-2 text-sm text-gray-600"
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`block py-3 text-[15px] ${
                      isActive(item.path) ? "font-bold text-[#0b0b0b]" : "font-medium text-gray-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {role === "user" && (
              <Link
                to="/getintouch"
                className={`py-3 text-[15px] border-b border-gray-100 ${
                  isActive("/getintouch") ? "font-bold text-[#0b0b0b]" : "font-medium text-gray-800"
                }`}
              >
                Contact
              </Link>
            )}

            {role === "admin" && (
              <Link
                to="/adminhome"
                className={`py-3 text-[15px] border-b border-gray-100 ${
                  isActive("/adminhome") ? "font-bold text-[#0b0b0b]" : "font-medium text-gray-800"
                }`}
              >
                Admin
              </Link>
            )}

            {token && (
              <button
                onClick={logout}
                className="mt-4 text-center text-[15px] font-medium text-red-500 py-3"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
