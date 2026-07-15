import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Dumbbell, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import AddMemberModal from "../members/AddMemberModal";
import AddTrainerModal from "../trainers/AddTrainerModal";
import useSidebarStore from "../../store/menuStore";

export default function AppShell() {
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [addTrainerOpen, setAddTrainerOpen] = useState(false);
 const isOpen = useSidebarStore((state) => state.isOpen);
const close = useSidebarStore((state) => state.close);
const toggle = useSidebarStore((state) => state.toggle);

  return (
    <div className="flex min-h-screen bg-paper">
      {isOpen && (
      <div
        onClick={close}
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
      />
    )}
      <Sidebar onAddMember={() => setAddMemberOpen(true)} onAddTrainer={() => setAddTrainerOpen(true)} />
      <main className="flex-1 min-w-0 p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 px-6 pt-7 pb-8">
            <div className="w-9 h-9 rounded-lg bg-clay flex items-center justify-center shrink-0">
              <Dumbbell size={19} strokeWidth={2.25} className="text-white" />
            </div>
            <div>
              <p className="font-display font-extrabold text-lg leading-none tracking-tight">Ironwood</p>
              <p className="text-[11px] text-black/50 mt-1">Gym Management</p>
            </div>
          </div>
          <div className="p-2 bg-brand-dark rounded-2xl md:hidden"
              onClick={toggle}
          >
            <Menu className="text-white"/>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      <AddMemberModal open={addMemberOpen} onClose={() => setAddMemberOpen(false)} />
      <AddTrainerModal open={addTrainerOpen} onClose={() => setAddTrainerOpen(false)} />
    </div>
  );
}
