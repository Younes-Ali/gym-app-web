import Card from "../ui/Card";

export default function ChartCard({ title, children }) {
  return (
    <Card>
      <h3 className="font-display font-semibold text-sm text-ink mb-2">{title}</h3>
      {children}
    </Card>
  );
}
