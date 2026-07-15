const STYLES = {
  active: "bg-moss-light text-moss-dark",
  expired: "bg-brick-light text-brick-dark",
  neutral: "bg-surface-alt text-ink-soft border border-border",
  brand: "bg-brand-light text-brand-dark",
  gold: "bg-gold-light text-gold-dark",
};

export default function Badge({ children, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
        ${STYLES[tone] ?? STYLES.neutral}`}
    >
      {children}
    </span>
  );
}
