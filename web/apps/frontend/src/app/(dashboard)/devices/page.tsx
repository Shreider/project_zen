import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StatusDot } from "@/components/ui/StatusDot";
import { devices } from "@/lib/mock-data";

export default function DevicesPage() {
  return (
    <>
      <PageHeader title="Urządzenia" description="Lista zarządzanych urządzeń Android z filtrowaniem po statusie, baterii, sieci i trybie zarządzanym." />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-muted"><tr><th className="p-3">Nazwa</th><th>Model</th><th>Android</th><th>Bateria</th><th>Sieć</th><th>Tryb</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {devices.map((device) => (
                <tr className="border-t border-border" key={device.id}>
                  <td className="p-3 font-medium">{device.name}<div className="text-xs text-muted">{device.deviceUuid}</div></td>
                  <td>{device.manufacturer} {device.model}</td>
                  <td>{device.androidVersion}</td>
                  <td>{device.batteryLevel}% {device.charging ? "charging" : ""}</td>
                  <td>{device.networkType}</td>
                  <td><Badge tone={device.managedModeEnabled ? "success" : "warning"}>{device.managedModeEnabled ? "enabled" : "disabled"}</Badge></td>
                  <td><span className="inline-flex items-center gap-2"><StatusDot status={device.status} />{device.status}</span></td>
                  <td><Link className="text-primary" href={`/devices/${device.id}`}>Szczegóły</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
