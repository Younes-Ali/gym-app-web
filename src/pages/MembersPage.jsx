import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import SearchInput from "../components/ui/SearchInput";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import MemberTable from "../components/members/MemberTable";
import AddMemberModal from "../components/members/AddMemberModal";
import EditMemberModal from "../components/members/EditMemberModal";
import RenewMembershipModal from "../components/members/RenewMembershipModal";
import AttendanceHistoryModal from "../components/members/AttendanceHistoryModal";
import { useGym } from "../context/GymContext";
import { useToast } from "../context/ToastContext";
import { api } from "../api/client";

export default function MembersPage() {
  const { members, refresh } = useGym();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Name");

  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [renewing, setRenewing] = useState(null);
  const [historyFor, setHistoryFor] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    let list = members.filter((m) => {
      const kw = search.trim().toLowerCase();
      if (kw && !(m.id.toLowerCase().includes(kw) || m.name.toLowerCase().includes(kw) || m.phone.toLowerCase().includes(kw))) {
        return false;
      }
      if (filter === "Active" && m.status !== "Active") return false;
      if (filter === "Expired" && m.status !== "Expired") return false;
      if (filter === "Premium" && !["Premium", "VIP"].includes(m.membership_type)) return false;
      return true;
    });

    list = [...list];
    if (sort === "Name") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "Attendance") list.sort((a, b) => b.attendance_count - a.attendance_count);
    else if (sort === "End Date") list.sort((a, b) => a.end_date.localeCompare(b.end_date));
    else if (sort === "Membership Type") list.sort((a, b) => a.membership_type.localeCompare(b.membership_type));
    return list;
  }, [members, search, filter, sort]);

  const handleCheckIn = async (member) => {
    try {
      const res = await api.members.checkIn(member.id);
      toast(res.message, res.ok ? "success" : "warning");
      await refresh();
    } catch (err) {
      toast(err.message, "error");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.members.remove(deleting.id);
      toast("Member deleted", "success");
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
        title="Members"
        subtitle="Manage all gym members from one place"
        action={
          <Button icon={Plus} variant="success" onClick={() => setAddOpen(true)}>
            Add Member
          </Button>
        }
      />

      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, ID or phone..." />
        <Select
          value={filter}
          onChange={setFilter}
          className="sm:w-44"
          options={["All", "Active", "Expired", "Premium"].map((v) => ({ value: v, label: `Filter: ${v}` }))}
        />
        <Select
          value={sort}
          onChange={setSort}
          className="sm:w-52"
          options={["Name", "Attendance", "End Date", "Membership Type"].map((v) => ({ value: v, label: `Sort: ${v}` }))}
        />
      </div>

      <Card padded={false}>
        <MemberTable
          members={filtered}
          onEdit={setEditing}
          onDelete={setDeleting}
          onCheckIn={handleCheckIn}
          onRenew={setRenewing}
          onHistory={setHistoryFor}
        />
      </Card>

      <AddMemberModal open={addOpen} onClose={() => setAddOpen(false)} />
      <EditMemberModal member={editing} onClose={() => setEditing(null)} />
      <RenewMembershipModal member={renewing} onClose={() => setRenewing(null)} />
      <AttendanceHistoryModal member={historyFor} onClose={() => setHistoryFor(null)} />
      <ConfirmDialog
        open={!!deleting}
        title="Delete Member"
        message={`Are you sure you want to delete ${deleting?.name}? This cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
