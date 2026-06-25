interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

export default function Toggle({
  checked,
  onChange,
  label,
  description,
}: Props) {
  return (
    <div className="flex items-center justify-between py-3 px-1 border-b border-white/5">
      <div>
        <p className="text-sm text-neutral-200">{label}</p>
        {description && (
          <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-neutral-700"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
