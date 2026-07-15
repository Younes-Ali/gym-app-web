import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Field, { TextInput } from "../ui/Field";
import Button from "../ui/Button";
import { api } from "../../api/client";
import { useGym } from "../../context/GymContext";
import { useToast } from "../../context/ToastContext";

export default function EditMemberModal({ member, onClose }) {
  const { refresh } = useGym();
  const toast = useToast();
  const [form, setForm] = useState({ name: "", age: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (member) setForm({ name: member.name, age: member.age, phone: member.phone });
  }, [member]);

  if (!member) return null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.members.update(member.id, { name: form.name, age: Number(form.age), phone: form.phone });
      toast("Member updated", "success");
      await refresh();
      onClose();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={!!member} onClose={onClose} title="Edit Member">
      <form onSubmit={handleSubmit}>
        <Field label="Name">
          <TextInput value={form.name} onChange={set("name")} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Age">
            <TextInput type="number" value={form.age} onChange={set("age")} />
          </Field>
          <Field label="Phone">
            <TextInput value={form.phone} onChange={set("phone")} />
          </Field>
        </div>
        <div className="flex gap-3 mt-6">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1" disabled={submitting}>
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
