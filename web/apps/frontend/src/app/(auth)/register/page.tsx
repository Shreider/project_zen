import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  return <Card className="w-full max-w-md"><h1 className="text-2xl font-semibold">Rejestracja</h1><p className="mt-3 text-sm leading-6 text-muted">W MVP użytkowników tworzy SUPERADMIN z poziomu panelu lub seed danych. Publiczna rejestracja jest wyłączona.</p><Link className="mt-4 block text-primary" href="/login">Wróć do logowania</Link></Card>;
}
