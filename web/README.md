# project_zen Web

Moduł `web/` zawiera web MVP dla **Realtime Android Environment Management**:

- frontend Next.js,
- backend Express/TypeScript,
- PostgreSQL,
- Prisma ORM,
- Socket.IO,
- współdzielone typy i walidatory w `packages/shared`,
- Docker Compose,
- dokumentację techniczną w `docs/`.

## Struktura

```text
web/
├── apps/
│   ├── backend/
│   └── frontend/
├── packages/
│   └── shared/
├── docker/
│   └── postgres/
├── docs/
├── .env.example
├── docker-compose.yml
├── package.json
└── tsconfig.base.json
```

## Wymagania

Rekomendowana ścieżka lokalna używa Dockera:

- Docker,
- Docker Compose v2.

Do pracy bez Dockera wymagane są:

- Node.js `>=20.11.0`,
- npm,
- lokalny PostgreSQL,
- zmienne środowiskowe zgodne z `.env.example`.

## Uruchomienie przez Docker Compose

```bash
cd web
cp .env.example .env
docker compose up --build
```

Usługi:

- frontend: `http://localhost:4001`
- backend: `http://localhost:4000`
- Swagger UI: `http://localhost:4000/api/docs`
- healthcheck: `http://localhost:4000/api/health`
- PostgreSQL: `localhost:5432`

Kontenery:

- `project_zen-frontend`
- `project_zen-backend`
- `project_zen-postgres`

Zatrzymanie:

```bash
docker compose down
```

## Uruchomienie lokalne bez Dockera

```bash
cd web
npm install
npm run db:generate
npm run db:seed
npm run dev
```

Przy lokalnym uruchomieniu backend potrzebuje działającego PostgreSQL i poprawnego `DATABASE_URL`.

## Skrypty

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run db:generate
npm run db:migrate
npm run db:seed
```

Uwaga: `npm run db:migrate` używa `prisma migrate deploy`. W lokalnym development można używać skryptu backendu `db:dev`.

## Zmienne środowiskowe

Główny przykład znajduje się w `.env.example`.

Najważniejsze zmienne:

- `DATABASE_URL` - połączenie Prisma do PostgreSQL,
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` - konfiguracja kontenera bazy,
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` - sekrety JWT,
- `BACKEND_PORT`, `FRONTEND_PORT` - porty aplikacji,
- `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WS_URL` - publiczne adresy API i WebSocket dla frontendu.

Wartości w `.env.example` są lokalne i demonstracyjne.

## Dane testowe

Seed backendu tworzy przykładowe konto:

- email: `admin@example.com`
- hasło: `Admin123!ChangeMe`

Seed dodaje także przykładowe urządzenia, heartbeaty, politykę środowiska, komendy i logi audytu.

## Dokumentacja

- `docs/architecture.md` - architektura systemu,
- `docs/api.md` - API,
- `docs/database.md` - model danych,
- `docs/websocket-events.md` - zdarzenia realtime,
- `docs/android-agent.md` - plan agenta Android,
- `docs/android-provisioning.md` - provisioning Android,
- `docs/security.md` - założenia bezpieczeństwa,
- `docs/deployment.md` - wdrożenie,
- `docs/testing.md` - testowanie.
