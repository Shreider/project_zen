# Frontend

Frontend `@project_zen/frontend` to panel administracyjny dla **Realtime Android Environment Management**.

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
│   │   └── (dashboard)/
│   ├── components/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── ui/
│   └── lib/
├── Dockerfile
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Uruchomienie w Docker Compose

Z katalogu `web/`:

```bash
docker compose up --build frontend
```

Adres:

```text
http://localhost:4001
```

Główny widok dashboardu:

```text
http://localhost:4001/dashboard
```

## Uruchomienie lokalne

Z katalogu `web/`:

```bash
npm install
npm run dev -w @project_zen/frontend
```

Frontend nasłuchuje na `0.0.0.0:4001`, żeby działał poprawnie także wewnątrz kontenera.

## Skrypty

```bash
npm run dev -w @project_zen/frontend
npm run build -w @project_zen/frontend
npm run start -w @project_zen/frontend
npm run typecheck -w @project_zen/frontend
npm run lint -w @project_zen/frontend
```

## Widoki

- `/` - przekierowanie/start do panelu,
- `/dashboard` - podsumowanie środowiska,
- `/devices` - lista urządzeń,
- `/devices/[id]` - szczegóły urządzenia,
- `/commands` - komendy,
- `/policies` - polityki środowiska,
- `/audit` - audyt,
- `/settings` - ustawienia,
- `/login` - logowanie,
- `/register` - rejestracja.

## Konfiguracja

Przykład zmiennych znajduje się w `.env.example`.

Najważniejsze zmienne:

- `NEXT_PUBLIC_API_URL` - publiczny adres backendu REST,
- `NEXT_PUBLIC_WS_URL` - publiczny adres Socket.IO.

Dla Docker Compose domyślne wartości wskazują na lokalny backend:

```text
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
```

## Style

Globalne style są w `src/app/globals.css`. Projekt używa Tailwind CSS 4, więc konfiguracja tokenów projektu jest definiowana przez dyrektywę `@theme` w CSS. Nie należy przywracać składni `@tailwind base/components/utilities` bez dostosowania wersji Tailwinda, bo prowadzi to do niepełnego wygenerowania klas.

## Dane demonstracyjne

Część widoków korzysta z mocków w `src/lib/mock-data.ts`. Backend API działa równolegle i jest dostępny pod `NEXT_PUBLIC_API_URL`; pełne podłączenie wszystkich widoków do danych backendu jest kolejnym etapem rozwoju.
