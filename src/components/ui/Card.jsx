export default function Card({ children, className = "", padded = true, ...props }) {
  return (
    <div
      className={`bg-surface border border-border rounded-2xl shadow-[0_1px_2px_rgba(28,26,23,0.04)]
        ${padded ? "p-5" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
