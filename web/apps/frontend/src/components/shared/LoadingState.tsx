import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { Spinner } from "../ui/Spinner";

export function LoadingState({ label }: { label: string }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3 text-muted"><Spinner /> {label}</div>
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-28 w-full" />
    </Card>
  );
}
