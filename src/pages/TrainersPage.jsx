import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import SearchInput from "../components/ui/SearchInput";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import TrainerTable from "../components/trainers/TrainerTable";
import AddTrainerModal from "../components/trainers/AddTrainerModal";
import EditTrainerModal from "../components/trainers/EditTrainerModal";
import { useGym } from "../context/GymContext";
import { useToast } from "../context/ToastContext";
import { api } from "../api/client";

export default function TrainersPage() {
  const { trainers, refresh } = useGym();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    const kw = search.trim().toLowerCase();
    if (!kw) return trainers;
    return trainers.filter(
      (t) => t.id.toLowerCase().includes(kw) || t.name.toLowerCase().includes(kw) || t.phone.toLowerCase().includes(kw)
    );
  }, [trainers, search]);

  const handleDeleteConfirm = async () => {
    try {
      await api.trainers.remove(deleting.id);
      toast("Trainer deleted", "success");
      await refresh();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Trainers"
        subtitle="Manage trainer details and assignments"
        action={
          <Button icon={Plus} variant="primary" onClick={() => setAddOpen(true)}>
            Add Trainer
          </Button>
        }
      />

      <div className="mb-4 max-w-md">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, ID or phone..." />
      </div>

      <Card padded={false}>
        <TrainerTable trainers={filtered} onEdit={setEditing} onDelete={setDeleting} />
      </Card>

      <AddTrainerModal open={addOpen} onClose={() => setAddOpen(false)} />
      <EditTrainerModal trainer={editing} onClose={() => setEditing(null)} />
      <ConfirmDialog
        open={!!deleting}
        title="Delete Trainer"
        message={`Are you sure you want to delete ${deleting?.name}? This cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
