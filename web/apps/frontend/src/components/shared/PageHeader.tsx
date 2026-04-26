export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="mb-6">
      <p className="text-sm font-medium text-primary">project_zen</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-normal text-foreground">{title}</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{description}</p>
    </header>
  );
}
