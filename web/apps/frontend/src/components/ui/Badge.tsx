export function Badge({ children, tone = "neutral" }: { children: string; tone?: "neutral" | "success" | "warning" | "danger" }) {
  const tones = {
    neutral: "border-border text-muted",
    success: "border-emerald-400/30 text-emerald-300",
    warning: "border-yellow-400/30 text-yellow-300",
    danger: "border-red-400/30 text-red-300"
  };
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}
