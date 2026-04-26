import { Activity, BatteryCharging, Clock, Server, ShieldCheck, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { auditLogs, commands, devices, heartbeats } from "@/lib/mock-data";

const stats = [
  { label: "Total devices", value: devices.length, icon: Smartphone },
  { label: "Online", value: devices.filter((device) => device.status === "ONLINE").length, icon: Activity },
  { label: "Offline", value: devices.filter((device) => device.status === "OFFLINE").length, icon: Server },
  { label: "Pending commands", value: commands.filter((command) => command.status === "PENDING").length, icon: Clock },
  { label: "Failed commands", value: commands.filter((command) => command.status === "FAILED").length, icon: ShieldCheck },
  { label: "Last heartbeat", value: "01:36", icon: BatteryCharging }
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard realtime" description="Operacyjny podgląd środowiska Android, heartbeatów, komend i audytu administratorów." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => <Card key={stat.label}><div className="flex items-center justify-between"><div><p className="text-sm text-muted">{stat.label}</p><p className="mt-2 text-3xl font-semibold">{stat.value}</p></div><stat.icon className="size-7 text-primary" /></div></Card>)}
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Ostatnie heartbeaty</h2>
          <div className="space-y-3">
            {heartbeats.map((heartbeat) => {
              const device = devices.find((item) => item.id === heartbeat.deviceId);
              return <div className="flex items-center justify-between rounded-md border border-border p-3" key={heartbeat.id}><span>{device?.name}</span><span className="text-sm text-muted">{heartbeat.batteryLevel}% / {heartbeat.networkType}</span></div>;
            })}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Stan API</h2>
          <Badge tone="success">online</Badge>
          <p className="mt-4 text-sm leading-6 text-muted">Backend emituje eventy WebSocket po heartbeat, komendach i audycie.</p>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Ostatnie komendy</h2>
          <div className="space-y-3">{commands.map((command) => <div className="text-sm" key={command.id}>{command.type} <span className="text-muted">{command.status}</span></div>)}</div>
        </Card>
        <Card className="xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Audit preview</h2>
          <div className="space-y-3">{auditLogs.map((log) => <div className="text-sm" key={log.id}>{log.action} <span className="text-muted">{log.userEmail}</span></div>)}</div>
        </Card>
      </div>
    </>
  );
}
