"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="grid min-h-screen place-items-center p-8"><button className="rounded-md bg-primary px-4 py-2" onClick={reset}>Spróbuj ponownie</button></main>;
}
