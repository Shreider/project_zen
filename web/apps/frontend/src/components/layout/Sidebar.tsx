import Link from "next/link";
import { Activity, Command, LayoutDashboard, MonitorSmartphone, ScrollText, Settings, ShieldCheck } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/devices", label: "Devices", icon: MonitorSmartphone },
  { href: "/commands", label: "Commands", icon: Command },
  { href: "/policies", label: "Policies", icon: ShieldCheck },
  { href: "/audit", label: "Audit", icon: ScrollText },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-border bg-background/70 p-5 backdrop-blur lg:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary"><Activity className="size-5" /></div>
        <div><div className="font-semibold">project_zen</div><div className="text-xs text-muted">project_zen Console</div></div>
      </div>
      <nav className="space-y-1">
        {items.map((item) => <Link className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-foreground" href={item.href} key={item.href}><item.icon className="size-4" />{item.label}</Link>)}
      </nav>
    </aside>
  );
}
