import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center p-8"><div><h1 className="text-3xl font-semibold">Nie znaleziono widoku</h1><Link className="mt-4 block text-primary" href="/dashboard">Wróć do dashboardu</Link></div></main>;
}
