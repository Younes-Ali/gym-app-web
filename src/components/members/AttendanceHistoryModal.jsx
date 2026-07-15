import Modal from "../ui/Modal";
import { CalendarDays } from "lucide-react";

export default function AttendanceHistoryModal({ member, onClose }) {
  if (!member) return null;

  const history = [...member.attendance].sort((a, b) => (a < b ? 1 : -1));

  return (
    <Modal open={!!member} onClose={onClose} title={`Attendance History — ${member.name}`} width="max-w-sm">
      {history.length === 0 ? (
        <p className="text-sm text-muted text-center py-6">No attendance records yet</p>
      ) : (
        <ul className="space-y-1.5 max-h-80 overflow-y-auto">
          {history.map((d) => (
            <li
              key={d}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-surface-alt text-sm text-ink-soft"
            >
              <CalendarDays size={15} className="text-brand" />
              {d}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
