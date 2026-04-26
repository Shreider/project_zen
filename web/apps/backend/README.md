# Backend

Backend `@project_zen/backend` udostępnia REST API, Swagger UI, endpointy dla przyszłego Android Agent, Socket.IO dla odświeżania realtime oraz integrację z PostgreSQL przez Prisma ORM.

## Stack

- Node.js,
- Express,
- TypeScript,
- Prisma `6.19.0`,
- PostgreSQL,
- Socket.IO,
- Zod,
- JWT,
- Swagger UI,
- Biome.

## Struktura

```text
apps/backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── config/
│   ├── helpers/
│   ├── lib/
│   ├── middleware/
│   ├── modules/
│   │   ├── agent/
│   │   ├── audit/
│   │   ├── auth/
│   │   ├── commands/
│   │   ├── devices/
│   │   ├── policies/
│   │   ├── realtime/
│   │   └── users/
│   ├── app.ts
│   └── server.ts
├── Dockerfile
├── package.json
└── tsconfig.json
```

## Uruchomienie w Docker Compose

Z katalogu `web/`:

```bash
docker compose up --build backend
```

Backend startuje na porcie `4000`.

Adresy:

- healthcheck: `http://localhost:4000/api/health`
- Swagger UI: `http://localhost:4000/api/docs`

## Uruchomienie lokalne

Z katalogu `web/`:

```bash
npm install
npm run db:generate
npm run dev -w @project_zen/backend
```

Wymagany jest działający PostgreSQL oraz `DATABASE_URL`.

## Skrypty

```bash
npm run dev -w @project_zen/backend
npm run build -w @project_zen/backend
npm run start -w @project_zen/backend
npm run typecheck -w @project_zen/backend
npm run lint -w @project_zen/backend
npm run db:generate -w @project_zen/backend
npm run db:push -w @project_zen/backend
npm run db:dev -w @project_zen/backend
npm run db:migrate -w @project_zen/backend
npm run db:seed -w @project_zen/backend
```

## Główne endpointy

- `GET /api/health` - status backendu,
- `POST /api/auth/login` - logowanie,
- `POST /api/auth/refresh` - odświeżenie tokenu,
- `GET /api/backend/devices` - lista urządzeń,
- `POST /api/backend/devices` - dodanie urządzenia,
- `GET /api/backend/devices/:id` - szczegóły urządzenia,
- `POST /api/backend/devices/:id/commands` - utworzenie komendy,
- `GET /api/backend/commands` - lista komend,
- `GET /api/backend/policies` - polityki środowiska,
- `GET /api/backend/audit` - audyt,
- `POST /api/agent/enroll` - przygotowanie enrollment agenta,
- `POST /api/agent/heartbeat` - heartbeat urządzenia,
- `GET /api/agent/commands/pull` - pobieranie komend przez agenta,
- `POST /api/agent/commands/:id/result` - wynik komendy.

## Prisma

Schemat znajduje się w `prisma/schema.prisma`.

Najczęstsze komendy:

```bash
npm run db:generate -w @project_zen/backend
npm run db:push -w @project_zen/backend
npm run db:seed -w @project_zen/backend
```

Docker Compose uruchamia backend z `db:generate`, `db:push` i `dev`, żeby lokalna baza była zsynchronizowana ze schematem.

## Realtime

Backend emituje zdarzenia Socket.IO po operacjach takich jak:

- heartbeat urządzenia,
- utworzenie komendy,
- zakończenie komendy,
- utworzenie lub aktualizacja urządzenia.

Definicje nazw zdarzeń znajdują się w `packages/shared/src/constants/websocket-events.ts`.

## Konfiguracja

Przykładowe zmienne są w `.env.example` oraz w głównym `web/.env.example`.

Wartości demonstracyjne nie powinny być używane poza lokalnym developmentem. W szczególności zmień `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, hasło PostgreSQL i konfigurację CORS.
