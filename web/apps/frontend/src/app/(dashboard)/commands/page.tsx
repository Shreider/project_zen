import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { commands, devices } from "@/lib/mock-data";

export default function CommandsPage() {
  return (
    <>
      <PageHeader title="Komendy" description="Kolejka komend PENDING, PICKED, SUCCESS i FAILED wysyłanych do agentów Android Device Owner." />
      <Card>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">Command queue</h2><Button>Nowa komenda</Button></div>
        <div className="space-y-3">
          {commands.map((command) => <div className="grid gap-2 rounded-md border border-border p-4 md:grid-cols-4" key={command.id}><span>{command.type}</span><span className="text-muted">{devices.find((device) => device.id === command.deviceId)?.name}</span><Badge>{command.status}</Badge><span className="text-sm text-muted">{command.createdAt}</span></div>)}
        </div>
      </Card>
      <p className="mt-4 text-sm text-muted">WIPE_DEVICE jest oznaczone jako ryzykowne i w MVP pozostaje wyłączone jako zwykła akcja panelu.</p>
    </>
  );
}
