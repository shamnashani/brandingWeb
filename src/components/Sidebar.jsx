import {
  LayoutDashboard,
  MessageSquare,
  Star,
  FolderKanban,
  Briefcase,
  Users,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
  FileText
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ newEnquiryCount = 0, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const nav = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  const menuGroups = [
    {
      label: null,
      items: [{ icon: <LayoutDashboard size={16} />, title: "Dashboard", path: "/adminhome" }],
    },
    {
      label: "Content",
      items: [
        { icon: <Home size={16} />, title: "Home", path: "/" },
        { icon: <MessageSquare size={16} />, title: "Enquiries", path: "/admin/enquiries", badge: newEnquiryCount },
        { icon: <Star size={16} />, title: "Reviews", path: "/admin/review" },
        { icon: <FolderKanban size={16} />, title: "Projects", path: "/project" },
        { icon: <Briefcase size={16} />, title: "Services", path: "/service" },
      ],
    },

    {
      label: "System",
      items: [{ icon: <Settings size={16} />, title: "Settings", path: "/settings" },
        {icon : <FileText size={16} />, title:"Policies", path: "/admin/policies"}
      ],
    },
  ];

  const handleNav = (path) => {
    nav(path);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger — shown only when drawer is closed, on small screens */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-[#111111] border border-white/10 text-gray-300 p-2 rounded-lg"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen bg-[#02141C] flex flex-col z-50
          transition-all duration-300 border-r border-white/10 overflow-hidden
          ${collapsed ? "md:w-[72px]" : "md:w-[220px]"}
          w-[240px]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo + toggles */}
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold tracking-wide text-white whitespace-nowrap">
                Studio<span className="text-[#d4af37]">Bits</span>
              </h2>
              <p className="text-[11px] text-gray-600 mt-1">Admin Panel</p>
            </div>
          )}

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block text-gray-500 hover:text-[#d4af37] transition p-1 rounded hover:bg-white/5 shrink-0"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-gray-500 hover:text-white p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
          {menuGroups.map((group, gi) => (
            <div key={gi}>
              {group.label && !collapsed && (
                <p className="px-5 pt-4 pb-1 text-[10px] uppercase tracking-widest text-gray-700 whitespace-nowrap">
                  {group.label}
                </p>
              )}

              {group.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <div
                    key={item.title}
                    onClick={() => handleNav(item.path)}
                    title={collapsed ? item.title : undefined}
                    className={`relative flex items-center gap-3 px-5 py-[10px] text-sm cursor-pointer transition-all duration-200 border-l-2
                      ${active
                        ? "border-[#d4af37] text-[#d4af37] bg-white/5"
                        : "border-transparent text-gray-500 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {item.icon}

                    {!collapsed && <span className="flex-1 whitespace-nowrap">{item.title}</span>}

                    {item.badge > 0 && !collapsed && (
                      <span className="bg-[#d4af37] text-black text-[10px] font-semibold px-2 py-[1px] rounded-full">
                        {item.badge}
                      </span>
                    )}

                    {item.badge > 0 && collapsed && (
                      <span className="absolute top-2 left-9 w-2 h-2 rounded-full bg-[#d4af37]" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Logout */}
        <div
          onClick={logout}
          title={collapsed ? "Logout" : undefined}
          className="flex items-center gap-3 px-5 py-4 text-sm text-gray-600 hover:text-red-400 cursor-pointer border-t border-white/10 transition"
        >
          <LogOut size={16} />
          {!collapsed && "Logout"}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;