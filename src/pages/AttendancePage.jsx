import { useMemo } from "react";
import { CheckCircle2, Users, Clock, CheckCircle } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { useGym } from "../context/GymContext";
import { useToast } from "../context/ToastContext";
import { api } from "../api/client";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function AttendancePage() {
  const { members, refresh } = useGym();
  const toast = useToast();
  const t = today();

  const attendedToday = members.filter((m) => m.attendance.includes(t)).length;

  const sorted = useMemo(
    () => [...members].sort((a, b) => a.name.localeCompare(b.name)),
    [members]
  );

  const handleCheckIn = async (member) => {
    try {
      const res = await api.members.checkIn(member.id);
      toast(res.message, res.ok ? "success" : "warning");
      await refresh();
    } catch (err) {
      toast(err.message, "error");
    }
  };

  return (
    <div>
      <PageHeader title="Attendance" subtitle="Record and track member attendance daily" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon={CheckCircle2} label="Attended Today" value={attendedToday} accent="moss" />
        <StatCard icon={Users} label="Total Members" value={members.length} accent="brand" />
        <StatCard icon={Clock} label="Not Attended Today" value={members.length - attendedToday} accent="gold" />
      </div>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted">ID</th>
                <th className="py-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted">Name</th>
                <th className="py-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted">Status</th>
                <th className="py-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted">Attended Today</th>
                <th className="py-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted">Total Attendance</th>
                <th className="py-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m) => {
                const attended = m.attendance.includes(t);
                return (
                  <tr key={m.id} className="border-b border-border-soft last:border-0 hover:bg-surface-alt/60 transition-colors">
                    <td className="py-3 px-3 text-muted">{m.id}</td>
                    <td className="py-3 px-3 font-medium text-ink">{m.name}</td>
                    <td className="py-3 px-3">
                      <Badge tone={m.status === "Active" ? "active" : "expired"}>{m.status}</Badge>
                    </td>
                    <td className="py-3 px-3">
                      {attended ? <Badge tone="active">Yes</Badge> : <span className="text-muted">No</span>}
                    </td>
                    <td className="py-3 px-3">{m.attendance_count}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleCheckIn(m)}
                        disabled={attended}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                          bg-moss-light text-moss-dark hover:bg-moss hover:text-white transition-colors
                          disabled:opacity-40 disabled:pointer-events-none"
                      >
                        <CheckCircle size={13} /> Check In
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
