import { useState } from "react";
import Modal from "../ui/Modal";
import Field, { TextInput } from "../ui/Field";
import Button from "../ui/Button";
import { api } from "../../api/client";
import { useGym } from "../../context/GymContext";
import { useToast } from "../../context/ToastContext";

const EMPTY = { name: "", age: "", phone: "", specialization: "", salary: "", experience: "" };

export default function AddTrainerModal({ open, onClose }) {
  const { refresh } = useGym();
  const toast = useToast();
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleClose = () => {
    setForm(EMPTY);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.phone) {
      toast("Please fill in the required fields", "error");
      return;
    }
    const salary = Number(form.salary || 0);
    if (salary < 0) {
      toast("Salary cannot be negative", "error");
      return;
    }
    setSubmitting(true);
    try {
      await api.trainers.create({
        name: form.name,
        age: Number(form.age),
        phone: form.phone,
        specialization: form.specialization || "General",
        salary,
        experience: Number(form.experience || 0),
      });
      toast("Trainer added successfully", "success");
      await refresh();
      handleClose();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add New Trainer">
      <form onSubmit={handleSubmit}>
        <Field label="Name">
          <TextInput value={form.name} onChange={set("name")} placeholder="Full name" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Age">
            <TextInput type="number" value={form.age} onChange={set("age")} placeholder="30" />
          </Field>
          <Field label="Phone">
            <TextInput value={form.phone} onChange={set("phone")} placeholder="01xxxxxxxxx" />
          </Field>
        </div>
        <Field label="Specialization">
          <TextInput value={form.specialization} onChange={set("specialization")} placeholder="Weightlifting, Yoga..." />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Salary">
            <TextInput type="number" value={form.salary} onChange={set("salary")} placeholder="5000" />
          </Field>
          <Field label="Experience (years)">
            <TextInput type="number" value={form.experience} onChange={set("experience")} placeholder="3" />
          </Field>
        </div>
        <div className="flex gap-3 mt-6">
          <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1" disabled={submitting}>
            {submitting ? "Adding..." : "Add Trainer"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
