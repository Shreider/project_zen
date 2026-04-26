export function StatusDot({ status }: { status: "ONLINE" | "OFFLINE" | "UNKNOWN" }) {
  const color = status === "ONLINE" ? "bg-emerald-400" : status === "OFFLINE" ? "bg-red-400" : "bg-yellow-300";
  return <span className={`inline-block size-2 rounded-full ${color}`} />;
}
