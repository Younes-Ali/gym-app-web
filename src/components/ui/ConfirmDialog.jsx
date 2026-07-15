import Modal from "./Modal";
import Button from "./Button";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = "Delete" }) {
  if (!open) return null;
  return (
    <Modal open={open} onClose={onCancel} title={title} width="max-w-sm">
      <div className="flex gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-brick-light flex items-center justify-center shrink-0">
          <AlertTriangle size={18} className="text-brick" />
        </div>
        <p className="text-sm text-ink-soft pt-1.5">{message}</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} className="flex-1">
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
