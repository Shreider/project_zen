import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="w-full rounded-md border border-border bg-background/70 px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary" {...props} />;
}
