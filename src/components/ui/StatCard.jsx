import Card from "./Card";

const STYLES = {
  brand: { bar: "bg-brand", iconBg: "bg-brand-light", iconText: "text-brand" },
  clay: { bar: "bg-clay", iconBg: "bg-clay-light", iconText: "text-clay" },
  moss: { bar: "bg-moss", iconBg: "bg-moss-light", iconText: "text-moss" },
  brick: { bar: "bg-brick", iconBg: "bg-brick-light", iconText: "text-brick" },
  gold: { bar: "bg-gold", iconBg: "bg-gold-light", iconText: "text-gold" },
};

export default function StatCard({ icon: Icon, label, value, accent = "brand" }) {
  const style = STYLES[accent] ?? STYLES.brand;
  return (
    <Card padded={false} className="flex overflow-hidden">
      <div className={`w-1.5 shrink-0 ${style.bar}`} />
      <div className="flex-1 p-5 min-w-0">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${style.iconBg} mb-3`}>
          <Icon size={18} strokeWidth={2} className={style.iconText} />
        </div>
        <p className="font-display text-2xl font-bold text-ink leading-none mb-1.5 truncate">{value}</p>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </Card>
  );
}
