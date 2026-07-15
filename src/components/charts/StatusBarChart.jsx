import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

export default function StatusBarChart({ active, expired }) {
  const data = [
    { name: "Active", value: active, fill: "#3f7a57" },
    { name: "Expired", value: expired, fill: "#ac4038" },
  ];

  if (active === 0 && expired === 0) {
    return <div className="h-[260px] flex items-center justify-center text-sm text-muted">Not enough data yet</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} barSize={64}>
        <CartesianGrid strokeDasharray="4 4" stroke="#e7e0d2" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#8a8175" }} axisLine={{ stroke: "#e7e0d2" }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#8a8175" }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          cursor={{ fill: "#f6f2ea" }}
          contentStyle={{ borderRadius: 12, border: "1px solid #e7e0d2", fontSize: 13 }}
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
