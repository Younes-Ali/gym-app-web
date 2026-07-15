export default function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-ink-soft mb-1.5">{label}</span>
      {children}
    </label>
  );
}

export function TextInput(props) {
  return (
    <input
      {...props}
      className="w-full bg-surface border border-border rounded-xl px-3.5 py-2.5 text-sm
        text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
    />
  );
}
