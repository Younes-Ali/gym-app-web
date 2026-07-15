import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function TopTrainersChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="h-[260px] flex items-center justify-center text-sm text-muted">Not enough data yet</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ left: 8 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="#e7e0d2" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: "#8a8175" }} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#4a453d" }} axisLine={false} tickLine={false} width={100} />
        <Tooltip cursor={{ fill: "#f6f2ea" }} contentStyle={{ borderRadius: 12, border: "1px solid #e7e0d2", fontSize: 13 }} />
        <Bar dataKey="members" fill="#c1592f" radius={[0, 8, 8, 0]} barSize={22} />
      </BarChart>
    </ResponsiveContainer>
  );
}
