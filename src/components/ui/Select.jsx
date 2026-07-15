import { ChevronDown } from "lucide-react";

export default function Select({ value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-surface border border-border rounded-xl pl-3.5 pr-9 py-2.5
          text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={15} strokeWidth={2} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
    </div>
  );
}
