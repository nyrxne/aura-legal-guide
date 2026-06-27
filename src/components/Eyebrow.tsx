export function Eyebrow({
  number,
  label,
  className = "",
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase ${className}`}>
      <span className="text-muted-foreground">(AURA<sup>®</sup> — {number})</span>
      <span className="text-accent">©</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
