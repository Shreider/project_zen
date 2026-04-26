import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/Card";
import { auditLogs } from "@/lib/mock-data";

export default function AuditPage() {
  return (
    <>
      <PageHeader title="Audit log" description="Rejestr działań administratorów: logowania, komendy, polityki, użytkownicy i błędy walidacji." />
      <Card>
        <div className="space-y-3">{auditLogs.map((log) => <div className="grid gap-2 rounded-md border border-border p-4 md:grid-cols-4" key={log.id}><span>{log.action}</span><span className="text-muted">{log.userEmail}</span><span>{log.targetType}</span><span className="text-muted">{log.createdAt}</span></div>)}</div>
      </Card>
    </>
  );
}
