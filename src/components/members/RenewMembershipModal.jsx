import { useState } from "react";
import Modal from "../ui/Modal";
import { api } from "../../api/client";
import { useGym } from "../../context/GymContext";
import { useToast } from "../../context/ToastContext";
import { RefreshCw } from "lucide-react";

const OPTIONS = [
  { label: "1 Month", months: 1 },
  { label: "3 Months", months: 3 },
  { label: "1 Year", months: 12 },
];

export default function RenewMembershipModal({ member, onClose }) {
  const { refresh } = useGym();
  const toast = useToast();
  const [submittingMonths, setSubmittingMonths] = useState(null);

  if (!member) return null;

  const handleRenew = async (months) => {
    setSubmittingMonths(months);
    try {
      await api.members.renew(member.id, months);
      toast("Membership renewed successfully", "success");
      await refresh();
      onClose();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setSubmittingMonths(null);
    }
  };

  return (
    <Modal open={!!member} onClose={onClose} title={`Renew Membership — ${member.name}`} width="max-w-sm">
      <p className="text-sm text-muted mb-5">Select a renewal period for this member.</p>
      <div className="space-y-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.months}
            onClick={() => handleRenew(opt.months)}
            disabled={submittingMonths !== null}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border
              hover:border-gold hover:bg-gold-light transition-colors text-sm font-medium text-ink disabled:opacity-50"
          >
            {opt.label}
            <RefreshCw size={15} className={submittingMonths === opt.months ? "animate-spin text-gold" : "text-muted"} />
          </button>
        ))}
      </div>
    </Modal>
  );
}
