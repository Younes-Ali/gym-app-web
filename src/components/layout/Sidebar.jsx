import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserCog, CalendarCheck, BarChart3, Dumbbell, Plus } from "lucide-react";
import useSidebarStore from "../../store/menuStore";

const NAV = [
  { to: "/", label: "Summary", icon: LayoutDashboard, end: true },
  { to: "/members", label: "Members", icon: Users },
  { to: "/trainers", label: "Trainers", icon: UserCog },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

export default function Sidebar({ onAddMember, onAddTrainer }) {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggle = useSidebarStore((state) => state.toggle);
  const close = useSidebarStore((state) => state.close);

  return (
    <aside className={`
    fixed md:sticky
    top-0 left-0
    z-50
    h-screen
    w-64
    bg-brand-dark
    transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    md:flex
    flex-col
  `}>
      <div className="flex items-center gap-2.5 px-6 pt-7 pb-8">
        <div className="w-9 h-9 rounded-lg bg-clay flex items-center justify-center shrink-0">
          <Dumbbell size={19} strokeWidth={2.25} className="text-white" />
        </div>
        <div>
          <p className="font-display font-extrabold text-lg leading-none tracking-tight">Ironwood</p>
          <p className="text-[11px] text-white/50 mt-1">Gym Management</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => {
                if (window.innerWidth < 768)
                    close();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors
              ${isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white/90"}`
            }
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6 pt-3 space-y-2 border-t border-white/10 mt-3">
        <button
          onClick={onAddMember}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium
            bg-clay hover:bg-clay-dark text-white transition-colors"
        >
          <Plus size={16} /> Add Member
        </button>
        <button
          onClick={onAddTrainer}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium
            bg-white/10 hover:bg-white/15 text-white transition-colors"
        >
          <Plus size={16} /> Add Trainer
        </button>
      </div>
    </aside>
  );
}
