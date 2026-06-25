interface Props {
  value: number;
  onChange: (v: number) => void;
  label: string;
  description?: string;
  min?: number;
  max?: number;
}

export default function Slider({
  value,
  onChange,
  label,
  description,
  min = 0,
  max = 100,
}: Props) {
  return (
    <div className="flex items-center gap-4 py-3 px-1 border-b border-white/5">
      <div className="shrink-0">
        <p className="text-sm text-neutral-200">{label}</p>
        {description && (
          <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3 ml-auto shrink-0">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-40 h-1.5 bg-neutral-700 rounded-full appearance-none cursor-pointer accent-primary"
        />
        <span className="text-xs text-neutral-400 tabular-nums w-8 text-right">
          {value}%
        </span>
      </div>
    </div>
  );
}
