import {
  MessageSquare,
  Star,
  FolderKanban,
  Briefcase,
  Users,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    title: "Enquiries",
    icon: MessageSquare,
    desc: "View all messages",
    path: "/admin/enquiries",
  },
  {
    title: "Reviews",
    icon: Star,
    desc: "View all Reviews",
    path: "/admin/review",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    desc: "Add or edit projects",
    path: "/adminviewproject",
  },
  {
    title: "Services",
    icon: Briefcase,
    desc: "Manage services",
    path: "/adminviewservice",
  },
  
  {
    title: "Team",
    icon: Users,
    desc: "Manage members",
    path: "/admin/team",
  },
  {
    title: "Users",
    icon: User,
    desc: "Block or remove",
    path: "/admin/users",
  },
  
];

function ModulesGrid() {
  const nav = useNavigate();

  return (
    <div>
      <h3 className="text-sm font-medium text-white mb-3">Manage modules</h3>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.title}
              onClick={() => nav(mod.path)}
              className="bg-[#111111] border border-white/10 rounded-xl p-5 cursor-pointer
                hover:border-[#d4af37]/30 transition-all duration-200 group"
            >
              <Icon
                size={22}
                className="text-[#d4af37] group-hover:scale-110 transition-transform duration-200"
              />
              <h4 className="text-sm font-medium text-white mt-3">
                {mod.title}
              </h4>
              <p className="text-[11px] text-gray-600 mt-1">{mod.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ModulesGrid;