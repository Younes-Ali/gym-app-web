import { Pencil, Trash2, CheckCircle, RefreshCw, History } from "lucide-react";
import Badge from "../ui/Badge";

export default function MemberTable({ members, onEdit, onDelete, onCheckIn, onRenew, onHistory }) {
  if (members.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-muted">No members match your search.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Membership</Th>
            <Th>Trainer</Th>
            <Th>Attendance</Th>
            <Th>Status</Th>
            <Th className="text-right">Actions</Th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-b border-border-soft last:border-0 hover:bg-surface-alt/60 transition-colors">
              <Td className="text-muted">{m.id}</Td>
              <Td className="font-medium text-ink">{m.name}</Td>
              <Td>{m.membership_type}</Td>
              <Td className="text-ink-soft">{m.trainer_name || "—"}</Td>
              <Td>{m.attendance_count}</Td>
              <Td>
                <Badge tone={m.status === "Active" ? "active" : "expired"}>{m.status}</Badge>
              </Td>
              <Td>
                <div className="flex items-center justify-end gap-1">
                  <IconBtn title="Check In" onClick={() => onCheckIn(m)}>
                    <CheckCircle size={15} className="text-moss" />
                  </IconBtn>
                  <IconBtn title="Renew" onClick={() => onRenew(m)}>
                    <RefreshCw size={15} className="text-gold" />
                  </IconBtn>
                  <IconBtn title="Attendance History" onClick={() => onHistory(m)}>
                    <History size={15} className="text-brand" />
                  </IconBtn>
                  <IconBtn title="Edit" onClick={() => onEdit(m)}>
                    <Pencil size={15} className="text-ink-soft" />
                  </IconBtn>
                  <IconBtn title="Delete" onClick={() => onDelete(m)}>
                    <Trash2 size={15} className="text-brick" />
                  </IconBtn>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, className = "" }) {
  return <th className={`py-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted ${className}`}>{children}</th>;
}

function Td({ children, className = "" }) {
  return <td className={`py-3 px-3 ${className}`}>{children}</td>;
}

function IconBtn({ children, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-alt transition-colors"
    >
      {children}
    </button>
  );
}
