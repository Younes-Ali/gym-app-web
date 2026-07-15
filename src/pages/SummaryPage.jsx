import { useEffect, useState } from "react";
import { Users, CheckCircle2, XCircle, UserCog, CalendarCheck, TrendingUp, Trophy, Star, Clock } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { useGym } from "../context/GymContext";
import { api } from "../api/client";

export default function SummaryPage() {
  const { members, statistics, loading } = useGym();
  const [expiring, setExpiring] = useState([]);

  useEffect(() => {
    api.expiringSoon(7).then(setExpiring).catch(() => {});
  }, [members]);

  const mostActive = [...members].sort((a, b) => b.attendance_count - a.attendance_count).slice(0, 6);

  if (loading || !statistics) {
    return <div className="text-sm text-muted">Loading...</div>;
  }

  return (
    <div>
      <PageHeader title="Summary" subtitle="A quick, complete overview of the gym right now" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard icon={Users} label="Total Members" value={statistics.total_members} accent="brand" />
        <StatCard icon={CheckCircle2} label="Active Members" value={statistics.active_members} accent="moss" />
        <StatCard icon={XCircle} label="Expired Members" value={statistics.expired_members} accent="brick" />
        <StatCard icon={UserCog} label="Total Trainers" value={statistics.total_trainers} accent="gold" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={CalendarCheck} label="Today's Attendance" value={statistics.today_attendance} accent="brand" />
        <StatCard icon={TrendingUp} label="Average Attendance" value={statistics.average_attendance} accent="moss" />
        <StatCard icon={Trophy} label="Member of the Month" value={statistics.most_active_member} accent="clay" />
        <StatCard icon={Star} label="Top Trainer" value={statistics.trainer_with_most_members} accent="gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-gold" />
            <h3 className="font-display font-semibold text-sm text-ink">Expiring Soon (7 days)</h3>
          </div>
          {expiring.length === 0 ? (
            <p className="text-sm text-muted py-4">No memberships expiring soon</p>
          ) : (
            <ul className="space-y-2.5">
              {expiring.slice(0, 6).map((m) => (
                <li key={m.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{m.name}</span>
                  <Badge tone="gold">ends {m.end_date}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-clay" />
            <h3 className="font-display font-semibold text-sm text-ink">Most Active Members</h3>
          </div>
          {mostActive.length === 0 || mostActive[0].attendance_count === 0 ? (
            <p className="text-sm text-muted py-4">No attendance data yet</p>
          ) : (
            <ul className="space-y-2.5">
              {mostActive
                .filter((m) => m.attendance_count > 0)
                .map((m) => (
                  <li key={m.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{m.name}</span>
                    <span className="text-brand font-semibold">{m.attendance_count} visits</span>
                  </li>
                ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
