import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Ustawienia" description="Konfiguracja API, agenta, wersji systemu i parametrów Device Owner dla przyszłego modułu Android." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card><h2 className="font-semibold">API</h2><p className="mt-2 text-sm text-muted">NEXT_PUBLIC_API_URL=http://localhost:4000</p><Badge tone="success">health ok</Badge></Card>
        <Card><h2 className="font-semibold">Agent</h2><p className="mt-2 text-sm text-muted">Device Owner, heartbeat, command polling, secure storage token.</p></Card>
        <Card><h2 className="font-semibold">System</h2><p className="mt-2 text-sm text-muted">project_zen web MVP 0.1.0</p></Card>
      </div>
    </>
  );
}
