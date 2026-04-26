import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { commands, devices, heartbeats } from "@/lib/mock-data";

export default function DeviceDetailsPage({ params }: { params: { id: string } }) {
  const device = devices.find((item) => item.id === params.id);
  if (!device) notFound();

  return (
    <>
      <PageHeader title={`Urządzenie: ${device.name}`} description="Szczegóły statusu, bateria, sieć, tryb zarządzany, historia heartbeatów i komend." />
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            <Info label="Status" value={device.status} />
            <Info label="Bateria" value={`${device.batteryLevel}%`} />
            <Info label="Android" value={device.androidVersion} />
            <Info label="Aplikacja agenta" value={device.appVersion} />
            <Info label="Sieć" value={device.networkType} />
            <Info label="Tryb zarządzany" value={device.managedModeEnabled ? "enabled" : "disabled"} />
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Akcje administracyjne</h2>
          <div className="grid gap-2">
            {["ENABLE_MANAGED_MODE", "DISABLE_MANAGED_MODE", "REQUEST_HEARTBEAT", "SHOW_ADMIN_MESSAGE", "LOCK_DEVICE", "CHANGE_TARGET_URL"].map((action) => <Button className="justify-start bg-white/10" key={action}>{action}</Button>)}
            <Button className="justify-start bg-red-500/20 text-red-100" disabled>WIPE_DEVICE demo disabled</Button>
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Heartbeaty</h2>
          {heartbeats.filter((item) => item.deviceId === device.id).map((heartbeat) => <div className="text-sm text-muted" key={heartbeat.id}>{heartbeat.batteryLevel}% / {heartbeat.networkType}</div>)}
        </Card>
        <Card className="xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Historia komend</h2>
          <div className="space-y-2">{commands.filter((item) => item.deviceId === device.id).map((command) => <div className="flex justify-between rounded-md border border-border p-3" key={command.id}><span>{command.type}</span><Badge>{command.status}</Badge></div>)}</div>
        </Card>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-border p-4"><div className="text-xs text-muted">{label}</div><div className="mt-1 font-semibold">{value}</div></div>;
}
