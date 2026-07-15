import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Field, { TextInput } from "../ui/Field";
import Button from "../ui/Button";
import { api } from "../../api/client";
import { useGym } from "../../context/GymContext";
import { useToast } from "../../context/ToastContext";

export default function EditTrainerModal({ trainer, onClose }) {
  const { refresh } = useGym();
  const toast = useToast();
  const [form, setForm] = useState({ name: "", specialization: "", salary: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (trainer) setForm({ name: trainer.name, specialization: trainer.specialization, salary: trainer.salary });
  }, [trainer]);

  if (!trainer) return null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const salary = Number(form.salary);
    if (salary < 0) {
      toast("Salary cannot be negative", "error");
      return;
    }
    setSubmitting(true);
    try {
      await api.trainers.update(trainer.id, { name: form.name, specialization: form.specialization, salary });
      toast("Trainer updated", "success");
      await refresh();
      onClose();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={!!trainer} onClose={onClose} title="Edit Trainer">
      <form onSubmit={handleSubmit}>
        <Field label="Name">
          <TextInput value={form.name} onChange={set("name")} />
        </Field>
        <Field label="Specialization">
          <TextInput value={form.specialization} onChange={set("specialization")} />
        </Field>
        <Field label="Salary">
          <TextInput type="number" value={form.salary} onChange={set("salary")} />
        </Field>
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
