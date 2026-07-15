import { useState } from "react";
import Modal from "../ui/Modal";
import Field, { TextInput } from "../ui/Field";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { api } from "../../api/client";
import { useGym } from "../../context/GymContext";
import { useToast } from "../../context/ToastContext";

const EMPTY = { name: "", age: "", phone: "", membership_type: "Basic", trainer_id: "" };

export default function AddMemberModal({ open, onClose }) {
  const { trainers, refresh } = useGym();
  const toast = useToast();
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const handleClose = () => {
    setForm(EMPTY);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.phone) {
      toast("Please fill in all fields", "error");
      return;
    }
    setSubmitting(true);
    try {
      await api.members.create({
        name: form.name,
        age: Number(form.age),
        phone: form.phone,
        membership_type: form.membership_type,
        trainer_id: form.trainer_id || null,
      });
      toast("Member added successfully", "success");
      await refresh();
      handleClose();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add New Member">
      <form onSubmit={handleSubmit}>
        <Field label="Name">
          <TextInput value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Full name" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Age">
            <TextInput type="number" value={form.age} onChange={(e) => set("age")(e.target.value)} placeholder="24" />
          </Field>
          <Field label="Phone">
            <TextInput value={form.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="01xxxxxxxxx" />
          </Field>
        </div>
        <Field label="Membership Type">
          <Select
            value={form.membership_type}
            onChange={set("membership_type")}
            options={[
              { value: "Basic", label: "Basic" },
              { value: "Premium", label: "Premium" },
              { value: "VIP", label: "VIP" },
            ]}
          />
        </Field>
        <Field label="Trainer (optional)">
          <Select
            value={form.trainer_id}
            onChange={set("trainer_id")}
            options={[
              { value: "", label: "No trainer assigned" },
              ...trainers.map((t) => ({ value: t.id, label: t.name })),
            ]}
          />
        </Field>
        <div className="flex gap-3 mt-6">
          <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="success" className="flex-1" disabled={submitting}>
            {submitting ? "Adding..." : "Add Member"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
