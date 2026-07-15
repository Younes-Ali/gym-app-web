import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AttendanceTrendChart({ data }) {
  const total = data?.reduce((sum, d) => sum + d.count, 0) ?? 0;

  if (total === 0) {
    return <div className="h-[260px] flex items-center justify-center text-sm text-muted">Not enough data yet</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e5c56" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#0e5c56" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke="#e7e0d2" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#8a8175" }} axisLine={{ stroke: "#e7e0d2" }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#8a8175" }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e7e0d2", fontSize: 13 }} />
        <Area type="monotone" dataKey="count" stroke="#0e5c56" strokeWidth={2.5} fill="url(#attendanceFill)" dot={{ r: 3, fill: "#0e5c56" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
