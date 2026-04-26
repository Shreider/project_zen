# Frontend

Frontend `@project_zen/frontend` jest panelem administracyjnym dla **Realtime Android Environment Management**. Aplikacja używa Next.js App Router i renderuje widoki dashboardu, urządzeń, komend, polityk, audytu, ustawień oraz auth.

## Spis Treści

- [Stack](#stack)
- [Struktura](#struktura)
- [Start](#start)
- [Skrypty](#skrypty)
- [Routing](#routing)
- [Layout i komponenty](#layout-i-komponenty)
- [Konfiguracja](#konfiguracja)
- [Style](#style)
- [Dane](#dane)
- [Integracja z backendem](#integracja-z-backendem)
- [Walidacja](#walidacja)
- [Znane ograniczenia](#znane-ograniczenia)

## Stack

- Next.js App Router,
- React,
- TypeScript,
- Tailwind CSS 4,
- Framer Motion,
- TanStack Query,
- Socket.IO Client,
- Lucide React.

## Struktura

```text
apps/frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── ui/
│   └── lib/
│       └── mock-data.ts
├── Dockerfile
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Start

Przez Docker Compose z katalogu `web/`:

```bash
docker compose up --build frontend
```

Lokalnie z katalogu `web/`:

```bash
npm install
npm run dev -w @project_zen/frontend
```

Adresy:

- aplikacja: `http://localhost:4001`
- dashboard: `http://localhost:4001/dashboard`

Frontend nasłuchuje na `0.0.0.0:4001`, żeby działał także wewnątrz kontenera.

## Skrypty

| Skrypt | Opis |
| --- | --- |
| `npm run dev -w @project_zen/frontend` | Next dev server na porcie `4001` |
| `npm run build -w @project_zen/frontend` | produkcyjny build Next.js |
| `npm run start -w @project_zen/frontend` | start produkcyjny na porcie `4001` |
| `npm run typecheck -w @project_zen/frontend` | TypeScript bez emitowania |
| `npm run lint -w @project_zen/frontend` | lint Next.js |

## Routing

| Ścieżka | Plik | Opis |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | start aplikacji |
| `/login` | `src/app/(auth)/login/page.tsx` | logowanie |
| `/register` | `src/app/(auth)/register/page.tsx` | rejestracja |
| `/dashboard` | `src/app/(dashboard)/dashboard/page.tsx` | alias dashboardu |
| `/devices` | `src/app/(dashboard)/devices/page.tsx` | lista urządzeń |
| `/devices/[id]` | `src/app/(dashboard)/devices/[id]/page.tsx` | szczegóły urządzenia |
| `/commands` | `src/app/(dashboard)/commands/page.tsx` | komendy |
| `/policies` | `src/app/(dashboard)/policies/page.tsx` | polityki środowiska |
| `/audit` | `src/app/(dashboard)/audit/page.tsx` | audyt |
| `/settings` | `src/app/(dashboard)/settings/page.tsx` | ustawienia |

Każdy główny widok dashboardu ma też `loading.tsx`.

## Layout I Komponenty

Layout:

- `DashboardShell` - główny shell panelu,
- `Sidebar` - menu boczne,
- `Topbar` - pasek górny.

Komponenty shared:

- `PageHeader`,
- `LoadingState`.

Komponenty UI:

- `Badge`,
- `Button`,
- `Card`,
- `Input`,
- `Skeleton`,
- `Spinner`,
- `StatusDot`.

## Konfiguracja

Plik przykładowy:

```text
apps/frontend/.env.example
```

Zmienne:

| Zmienna | Opis |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | publiczny URL backendu REST |
| `NEXT_PUBLIC_WS_URL` | publiczny URL Socket.IO |

Domyślnie dla Docker Compose:

```text
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
```

## Style

Globalne style są w:

```text
src/app/globals.css
```

Projekt używa Tailwind CSS 4. Tokeny projektu są definiowane przez `@theme` w CSS:

- `--color-background`,
- `--color-foreground`,
- `--color-muted`,
- `--color-card`,
- `--color-border`,
- `--color-primary`,
- `--color-secondary`,
- `--shadow-glow`.

Ważne: nie przywracaj składni `@tailwind base`, `@tailwind components`, `@tailwind utilities` bez dostosowania konfiguracji Tailwind 4. W tej konfiguracji prowadzi to do niepełnego wygenerowania utility classes.

## Dane

Aktualnie część widoków korzysta z:

```text
src/lib/mock-data.ts
```

Mocki zawierają:

- urządzenia,
- heartbeaty,
- komendy,
- polityki,
- wpisy audytu.

Wspólne typy są importowane z `@project_zen/shared`.

## Integracja Z Backendem

Backend jest dostępny pod `NEXT_PUBLIC_API_URL`.

Najważniejsze przyszłe integracje UI:

- dashboard ze `/api/backend/stats`,
- urządzenia ze `/api/backend/devices`,
- komendy ze `/api/backend/commands`,
- polityki ze `/api/backend/policies`,
- audyt ze `/api/backend/audit`,
- realtime przez Socket.IO z `NEXT_PUBLIC_WS_URL`.

## Walidacja

Z katalogu `web/`:

```bash
npm run typecheck -w @project_zen/frontend
npm run build -w @project_zen/frontend
```

Smoke test po uruchomieniu:

```bash
curl -I http://localhost:4001/dashboard
```

## Znane Ograniczenia

- Widoki są w większości oparte o dane mockowane.
- Brakuje pełnego flow auth na froncie.
- Nie ma jeszcze globalnego clienta API ani obsługi błędów API.
- Integracja Socket.IO w UI jest przygotowana zależnościowo, ale nie jest jeszcze pełnym źródłem danych widoków.
- Testy frontendowe nie są jeszcze dodane.
