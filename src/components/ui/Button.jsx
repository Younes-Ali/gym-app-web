const VARIANTS = {
  primary: "bg-brand text-white hover:bg-brand-dark focus-visible:outline-brand",
  accent: "bg-clay text-white hover:bg-clay-dark focus-visible:outline-clay",
  success: "bg-moss text-white hover:bg-moss-dark focus-visible:outline-moss",
  danger: "bg-brick text-white hover:bg-brick-dark focus-visible:outline-brick",
  outline: "bg-transparent text-ink border border-border hover:bg-surface-alt focus-visible:outline-ink",
  ghost: "bg-transparent text-ink-soft hover:bg-surface-alt focus-visible:outline-ink",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-5 py-3 text-base gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl font-medium
        transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2
        disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2.25} />}
      {children}
    </button>
  );
}
