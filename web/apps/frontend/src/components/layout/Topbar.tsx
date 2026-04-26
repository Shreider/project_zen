import { Wifi } from "lucide-react";

export function Topbar() {
  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/70 px-5 backdrop-blur">
      <div className="text-sm text-muted">Realtime Android Environment Management</div>
      <div className="flex items-center gap-2 text-sm text-emerald-300"><Wifi className="size-4" /> API online</div>
    </div>
  );
}
