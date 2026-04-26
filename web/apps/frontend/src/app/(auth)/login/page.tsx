import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <h1 className="text-2xl font-semibold">project_zen login</h1>
      <p className="mt-2 text-sm text-muted">Konto demonstracyjne: admin@example.com / Admin123!ChangeMe</p>
      <form className="mt-6 space-y-4">
        <Input defaultValue="admin@example.com" type="email" />
        <Input defaultValue="Admin123!ChangeMe" type="password" />
        <Button className="w-full">Zaloguj</Button>
      </form>
      <Link className="mt-4 block text-sm text-primary" href="/register">Informacja o rejestracji</Link>
    </Card>
  );
}
