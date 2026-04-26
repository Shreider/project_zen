import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { policies } from "@/lib/mock-data";

export default function PoliciesPage() {
  return (
    <>
      <PageHeader title="Polityki środowiska" description="Konfiguracja trybu zarządzanego, target URL, allowed apps i ustawień dedykowanego urządzenia." />
      <div className="grid gap-4 lg:grid-cols-2">
        {policies.map((policy) => <Card key={policy.id}><h2 className="text-xl font-semibold">{policy.name}</h2><p className="mt-2 text-sm text-muted">{policy.description}</p><dl className="mt-4 space-y-2 text-sm"><div>Target URL: {policy.configJson.targetUrl}</div><div>Lock task: {String(policy.configJson.lockTaskEnabled)}</div><div>Allowed apps: {policy.configJson.allowedApps.join(", ")}</div></dl><Button className="mt-5">Edytuj politykę</Button></Card>)}
      </div>
    </>
  );
}
