import { Pencil, Trash2 } from "lucide-react";

export default function TrainerTable({ trainers, onEdit, onDelete }) {
  if (trainers.length === 0) {
    return <div className="py-16 text-center text-sm text-muted">No trainers match your search.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Specialization</Th>
            <Th>Experience</Th>
            <Th>Members</Th>
            <Th>Salary</Th>
            <Th className="text-right">Actions</Th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((t) => (
            <tr key={t.id} className="border-b border-border-soft last:border-0 hover:bg-surface-alt/60 transition-colors">
              <Td className="text-muted">{t.id}</Td>
              <Td className="font-medium text-ink">{t.name}</Td>
              <Td>{t.specialization}</Td>
              <Td>{t.experience}y</Td>
              <Td>{t.members_count}</Td>
              <Td className="text-ink-soft">${Number(t.salary).toLocaleString()}</Td>
              <Td>
                <div className="flex items-center justify-end gap-1">
                  <IconBtn title="Edit" onClick={() => onEdit(t)}>
                    <Pencil size={15} className="text-ink-soft" />
                  </IconBtn>
                  <IconBtn title="Delete" onClick={() => onDelete(t)}>
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
