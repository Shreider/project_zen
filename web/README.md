# project_zen Web

Moduł `web/` jest główną, aktualnie zaimplementowaną częścią projektu `project_zen`. Zawiera panel administracyjny, backend API, PostgreSQL, Prisma, Socket.IO, wspólne typy oraz dokumentację techniczną.

## Spis Treści

- [Zakres](#zakres)
- [Stack](#stack)
- [Struktura katalogów](#struktura-katalogów)
- [Szybki start Docker Compose](#szybki-start-docker-compose)
- [Praca lokalna bez Dockera](#praca-lokalna-bez-dockera)
- [Skrypty](#skrypty)
- [Zmienne środowiskowe](#zmienne-środowiskowe)
- [Baza danych](#baza-danych)
- [API](#api)
- [Frontend](#frontend)
- [Realtime](#realtime)
- [Dane demonstracyjne](#dane-demonstracyjne)
- [Walidacja i troubleshooting](#walidacja-i-troubleshooting)
- [Dokumentacja](#dokumentacja)

## Zakres

`web/` realizuje web MVP dla **Realtime Android Environment Management**:

- dashboard administratora,
- widoki urządzeń, komend, polityk, audytu i ustawień,
- API administratora,
- API przyszłego Android Agent,
- modele danych Prisma,
- eventy realtime,
- seed danych demonstracyjnych,
- uruchomienie lokalne przez Docker Compose.

## Stack

Frontend:

- Next.js App Router,
- React,
- TypeScript,
- Tailwind CSS 4,
- Framer Motion,
- TanStack Query,
- Socket.IO Client,
- Lucide React.

Backend:

- Node.js,
- Express,
- TypeScript,
- Prisma `6.19.0`,
- PostgreSQL,
- Socket.IO,
- Zod,
- JWT,
- bcrypt,
- Swagger UI,
- Biome.

Monorepo:

- npm workspaces,
- shared package `@project_zen/shared`,
- wspólny `tsconfig.base.json`.

## Struktura Katalogów

```text
web/
├── apps/
│   ├── backend/
│   │   ├── prisma/
│   │   ├── src/
│   │   └── README.md
│   └── frontend/
│       ├── src/
│       └── README.md
├── packages/
│   └── shared/
│       ├── src/
│       └── README.md
├── docker/
│   └── postgres/
│       └── init.sql
├── docs/
├── .env.example
├── docker-compose.yml
├── package.json
└── tsconfig.base.json
```

## Szybki Start Docker Compose

```bash
cd web
cp .env.example .env
docker compose up --build
```

Adresy:

- frontend: `http://localhost:4001`
- dashboard: `http://localhost:4001/dashboard`
- backend: `http://localhost:4000`
- healthcheck: `http://localhost:4000/api/health`
- Swagger UI: `http://localhost:4000/api/docs`
- PostgreSQL: `localhost:5432`

Zatrzymanie usług:

```bash
docker compose down
```

Podgląd kontenerów:

```bash
docker compose ps
```

Logi:

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres
```

## Praca Lokalna Bez Dockera

Wymagania:

- Node.js `>=20.11.0`,
- npm,
- PostgreSQL,
- poprawny `DATABASE_URL`.

Instalacja i start:

```bash
cd web
npm install
npm run db:generate
npm run db:seed
npm run dev
```

Jeżeli korzystasz z lokalnego PostgreSQL, ustaw `DATABASE_URL` w `.env`.

## Skrypty

Skrypty root workspace:

| Skrypt | Opis |
| --- | --- |
| `npm run dev` | uruchamia backend i frontend developersko |
| `npm run build` | buduje shared, backend i frontend |
| `npm run lint` | uruchamia lint dla frontendu i backendu |
| `npm run typecheck` | sprawdza TypeScript dla shared, backendu i frontendu |
| `npm run db:generate` | generuje Prisma Client |
| `npm run db:migrate` | uruchamia `prisma migrate deploy` |
| `npm run db:seed` | ładuje dane demonstracyjne |

Skrypty workspace można uruchamiać bezpośrednio:

```bash
npm run build -w @project_zen/backend
npm run build -w @project_zen/frontend
npm run typecheck -w @project_zen/shared
```

## Zmienne Środowiskowe

Główny przykład:

```text
web/.env.example
```

Zmienne:

| Zmienna | Domyślna wartość lokalna | Opis |
| --- | --- | --- |
| `POSTGRES_USER` | `mdm` | użytkownik PostgreSQL |
| `POSTGRES_PASSWORD` | `mdm_dev_password` | hasło PostgreSQL |
| `POSTGRES_DB` | `mdm_lite` | nazwa bazy |
| `DATABASE_URL` | `postgresql://mdm:mdm_dev_password@postgres:5432/mdm_lite?schema=public` | URL Prisma w Docker Compose |
| `JWT_ACCESS_SECRET` | `change_me_access_secret` | sekret access tokenów |
| `JWT_REFRESH_SECRET` | `change_me_refresh_secret` | sekret refresh tokenów |
| `DEVICE_ONLINE_THRESHOLD_SECONDS` | `60` | próg online dla urządzeń |
| `BACKEND_PORT` | `4000` | port backendu |
| `FRONTEND_PORT` | `4001` | port frontendu |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` | URL API widoczny dla browsera |
| `NEXT_PUBLIC_WS_URL` | `ws://localhost:4000` | URL Socket.IO widoczny dla browsera |

Wartości demonstracyjne są poprawne tylko lokalnie.

## Baza Danych

Prisma schema definiuje:

- `User`,
- `Device`,
- `DeviceHeartbeat`,
- `Command`,
- `Policy`,
- `DeviceEvent`,
- `AuditLog`,
- `AgentToken`,
- `RefreshToken`.

Najważniejsze enumy:

- `UserRole`: `SUPERADMIN`, `ADMIN`, `VIEWER`,
- `DeviceStatus`: `ONLINE`, `OFFLINE`, `UNKNOWN`,
- `CommandType`: `ENABLE_MANAGED_MODE`, `DISABLE_MANAGED_MODE`, `CHANGE_TARGET_URL`, `REQUEST_HEARTBEAT`, `SHOW_ADMIN_MESSAGE`, `LOCK_DEVICE`, `REBOOT_DEVICE`, `WIPE_DEVICE`,
- `CommandStatus`: `PENDING`, `PICKED`, `SUCCESS`, `FAILED`, `CANCELLED`.

Komendy Prisma:

```bash
npm run db:generate -w @project_zen/backend
npm run db:push -w @project_zen/backend
npm run db:dev -w @project_zen/backend
npm run db:migrate -w @project_zen/backend
npm run db:seed -w @project_zen/backend
```

W Docker Compose backend startuje z `db:generate` i `db:push`, żeby lokalna baza była zsynchronizowana.

## API

Backend działa pod `http://localhost:4000`.

Namespace administratora:

- `/api/backend/auth/*`,
- `/api/backend/users/*`,
- `/api/backend/devices/*`,
- `/api/backend/commands/*`,
- `/api/backend/policies/*`,
- `/api/backend/audit`,
- `/api/backend/stats`.

Namespace przyszłego Android Agent:

- `/api/agent/enroll`,
- `/api/agent/heartbeat`,
- `/api/agent/commands/pull`,
- `/api/agent/commands/:id/result`,
- `/api/agent/events`,
- `/api/agent/screenshots/upload`.

Format sukcesu:

```json
{
  "success": true,
  "data": {},
  "message": "OK"
}
```

Format błędu:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data"
  }
}
```

Szczegółowy opis backendu jest w [apps/backend/README.md](apps/backend/README.md).

## Frontend

Frontend działa pod `http://localhost:4001`.

Widoki:

- `/dashboard`,
- `/devices`,
- `/devices/[id]`,
- `/commands`,
- `/policies`,
- `/audit`,
- `/settings`,
- `/login`,
- `/register`.

Część widoków nadal korzysta z danych mockowanych w `apps/frontend/src/lib/mock-data.ts`. Backend API jest już dostępny, ale pełne spięcie wszystkich widoków z API jest kolejnym etapem.

Szczegółowy opis frontendu jest w [apps/frontend/README.md](apps/frontend/README.md).

## Realtime

Backend używa Socket.IO i emituje envelope:

```ts
{
  event: string;
  payload: unknown;
  emittedAt: string;
}
```

Główne eventy:

- `device.created`,
- `device.updated`,
- `device.heartbeat.received`,
- `device.command.created`,
- `device.command.finished`,
- `api.health.changed`.

## Dane Demonstracyjne

Seed tworzy:

- konto `admin@example.com` / `Admin123!ChangeMe`,
- przykładowe urządzenia,
- heartbeaty,
- politykę środowiska,
- komendy,
- wpisy audytu.

Uruchomienie seedu:

```bash
npm run db:seed -w @project_zen/backend
```

## Walidacja I Troubleshooting

Sprawdzenie Compose:

```bash
docker compose config
docker compose ps
```

Sprawdzenie backendu:

```bash
curl -i http://localhost:4000/api/health
```

Sprawdzenie frontendu:

```bash
curl -I http://localhost:4001/dashboard
```

Typowe problemy:

- `DATABASE_URL` wskazuje na zły host - w Docker Compose używaj hosta `postgres`, lokalnie zwykle `localhost`.
- Zmiana enumów Prisma może wymagać migracji istniejącej bazy albo kontrolowanego `db push`.
- Stary CSS w przeglądarce może wymagać twardego odświeżenia `Ctrl+F5`.
- Port `4000`, `4001` albo `5432` może być zajęty przez inny proces.

## Dokumentacja

- [apps/backend/README.md](apps/backend/README.md),
- [apps/frontend/README.md](apps/frontend/README.md),
- [packages/shared/README.md](packages/shared/README.md),
- [docs/README.md](docs/README.md),
- [docs/api.md](docs/api.md),
- [docs/architecture.md](docs/architecture.md),
- [docs/database.md](docs/database.md),
- [docs/security.md](docs/security.md),
- [docs/testing.md](docs/testing.md).
