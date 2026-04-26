# Backend

Backend `@project_zen/backend` jest aplikacją Express/TypeScript. Odpowiada za REST API, Swagger UI, integrację z PostgreSQL przez Prisma, realtime przez Socket.IO, auth administratorów, rejestr urządzeń, komendy, polityki środowiska i endpointy dla przyszłego Android Agent.

## Spis Treści

- [Stack](#stack)
- [Struktura](#struktura)
- [Start](#start)
- [Skrypty](#skrypty)
- [Konfiguracja](#konfiguracja)
- [Format odpowiedzi API](#format-odpowiedzi-api)
- [Endpointy](#endpointy)
- [Payloady](#payloady)
- [Prisma i baza danych](#prisma-i-baza-danych)
- [Realtime](#realtime)
- [Auth i tokeny](#auth-i-tokeny)
- [Walidacja i błędy](#walidacja-i-błędy)
- [Znane ograniczenia](#znane-ograniczenia)

## Stack

- Node.js,
- Express,
- TypeScript,
- Prisma `6.19.0`,
- PostgreSQL,
- Socket.IO,
- Zod,
- JWT,
- bcrypt,
- Helmet,
- CORS,
- Morgan,
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
│   │   └── env.ts
│   ├── helpers/
│   │   ├── api-response.ts
│   │   └── token.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── validate.middleware.ts
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

## Start

Przez Docker Compose z katalogu `web/`:

```bash
docker compose up --build backend
```

Lokalnie z katalogu `web/`:

```bash
npm install
npm run db:generate -w @project_zen/backend
npm run dev -w @project_zen/backend
```

Adresy:

- API: `http://localhost:4000`
- healthcheck: `http://localhost:4000/api/health`
- Swagger UI: `http://localhost:4000/api/docs`

## Skrypty

| Skrypt | Opis |
| --- | --- |
| `npm run dev -w @project_zen/backend` | start developerski przez `tsx watch` |
| `npm run build -w @project_zen/backend` | build TypeScript do `dist/` |
| `npm run start -w @project_zen/backend` | start z `dist/server.js` |
| `npm run typecheck -w @project_zen/backend` | TypeScript bez emitowania plików |
| `npm run lint -w @project_zen/backend` | Biome check dla `src` i `prisma` |
| `npm run db:generate -w @project_zen/backend` | generowanie Prisma Client |
| `npm run db:push -w @project_zen/backend` | synchronizacja schematu z bazą lokalną |
| `npm run db:dev -w @project_zen/backend` | `prisma migrate dev` |
| `npm run db:migrate -w @project_zen/backend` | `prisma migrate deploy` |
| `npm run db:seed -w @project_zen/backend` | seed danych demonstracyjnych |

## Konfiguracja

Zmienne czyta `src/config/env.ts`.

| Zmienna | Domyślna wartość | Opis |
| --- | --- | --- |
| `PORT` | `4000` | port backendu |
| `DATABASE_URL` | wymagane | URL PostgreSQL dla Prisma |
| `JWT_ACCESS_SECRET` | `change_me_access_secret` | sekret access tokenów |
| `JWT_REFRESH_SECRET` | `change_me_refresh_secret` | sekret refresh tokenów |
| `JWT_ACCESS_EXPIRES_IN` | `15m` | czas życia access tokenu |
| `JWT_REFRESH_EXPIRES_IN_DAYS` | `30` | czas życia refresh tokenu |
| `DEVICE_ONLINE_THRESHOLD_SECONDS` | `60` | próg online dla urządzeń |
| `CORS_ORIGIN` | `http://localhost:4001` | dozwolony origin frontendu |

## Format Odpowiedzi API

Sukces:

```json
{
  "success": true,
  "data": {},
  "message": "OK"
}
```

Błąd:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {}
  }
}
```

## Endpointy

### Health I Dokumentacja

| Metoda | Ścieżka | Opis |
| --- | --- | --- |
| `GET` | `/api/health` | status backendu |
| `GET` | `/api/docs` | Swagger UI |

### Auth

| Metoda | Ścieżka | Opis |
| --- | --- | --- |
| `POST` | `/api/backend/auth/login` | logowanie administratora |
| `POST` | `/api/backend/auth/refresh` | placeholder odświeżania tokenu |
| `POST` | `/api/backend/auth/logout` | placeholder wylogowania |
| `GET` | `/api/backend/auth/me` | placeholder aktualnego użytkownika |

### Users

| Metoda | Ścieżka | Opis |
| --- | --- | --- |
| `GET` | `/api/backend/users` | lista użytkowników |
| `POST` | `/api/backend/users` | utworzenie użytkownika |
| `GET` | `/api/backend/users/:id` | szczegóły użytkownika |
| `PUT` | `/api/backend/users/:id` | aktualizacja użytkownika |
| `DELETE` | `/api/backend/users/:id` | usunięcie użytkownika |

### Devices

| Metoda | Ścieżka | Opis |
| --- | --- | --- |
| `GET` | `/api/backend/devices` | lista urządzeń |
| `POST` | `/api/backend/devices` | dodanie urządzenia z panelu |
| `GET` | `/api/backend/devices/:id` | szczegóły urządzenia |
| `PUT` | `/api/backend/devices/:id` | aktualizacja urządzenia |
| `GET` | `/api/backend/devices/:id/events` | eventy urządzenia |
| `GET` | `/api/backend/devices/:id/heartbeats` | ostatnie heartbeaty |
| `GET` | `/api/backend/devices/:id/commands` | komendy urządzenia |
| `POST` | `/api/backend/devices/:id/commands` | utworzenie komendy |

### Commands

| Metoda | Ścieżka | Opis |
| --- | --- | --- |
| `GET` | `/api/backend/commands` | lista komend z urządzeniami |
| `GET` | `/api/backend/commands/:id` | szczegóły komendy |

### Policies

| Metoda | Ścieżka | Opis |
| --- | --- | --- |
| `GET` | `/api/backend/policies` | lista polityk |
| `POST` | `/api/backend/policies` | utworzenie polityki |
| `GET` | `/api/backend/policies/:id` | szczegóły polityki |
| `PUT` | `/api/backend/policies/:id` | aktualizacja polityki |
| `DELETE` | `/api/backend/policies/:id` | usunięcie polityki |

### Audit I Stats

| Metoda | Ścieżka | Opis |
| --- | --- | --- |
| `GET` | `/api/backend/audit` | ostatnie 100 wpisów audytu |
| `GET` | `/api/backend/stats` | statystyki dashboardu MVP |

### Android Agent

| Metoda | Ścieżka | Opis |
| --- | --- | --- |
| `POST` | `/api/agent/enroll` | placeholder enrollment |
| `POST` | `/api/agent/heartbeat` | heartbeat urządzenia |
| `GET` | `/api/agent/commands/pull` | placeholder pobierania komend |
| `POST` | `/api/agent/commands/:id/result` | wynik komendy |
| `POST` | `/api/agent/events` | zdarzenie diagnostyczne |
| `POST` | `/api/agent/screenshots/upload` | placeholder diagnostyki kontrolowanej |

## Payloady

### Login

```json
{
  "email": "admin@example.com",
  "password": "Admin123!ChangeMe"
}
```

### Device

```json
{
  "deviceUuid": "tablet-01-demo",
  "name": "Tablet-01",
  "model": "Tab Active 4 Pro",
  "manufacturer": "Samsung",
  "androidVersion": "13",
  "appVersion": "1.0.0"
}
```

### Heartbeat

```json
{
  "deviceUuid": "tablet-01-demo",
  "batteryLevel": 84,
  "charging": false,
  "networkType": "Wi-Fi",
  "managedModeEnabled": true,
  "androidVersion": "13",
  "appVersion": "1.0.0"
}
```

### Command

```json
{
  "type": "REQUEST_HEARTBEAT",
  "payloadJson": {}
}
```

Dostępne typy komend:

- `ENABLE_MANAGED_MODE`,
- `DISABLE_MANAGED_MODE`,
- `CHANGE_TARGET_URL`,
- `REQUEST_HEARTBEAT`,
- `SHOW_ADMIN_MESSAGE`,
- `LOCK_DEVICE`,
- `REBOOT_DEVICE`,
- `WIPE_DEVICE`.

### Command Result

```json
{
  "success": true,
  "resultJson": {
    "received": true
  }
}
```

### Policy

```json
{
  "name": "Profil podstawowy",
  "description": "Polityka demonstracyjna dla urządzenia dedykowanego.",
  "configJson": {
    "managedModeEnabled": true,
    "targetUrl": "https://example.com/environment",
    "allowedApps": ["com.android.chrome", "pl.project_zen.agent"],
    "lockTaskEnabled": true
  }
}
```

## Prisma I Baza Danych

Modele:

- `User`,
- `Device`,
- `DeviceHeartbeat`,
- `Command`,
- `Policy`,
- `DeviceEvent`,
- `AuditLog`,
- `AgentToken`,
- `RefreshToken`.

Relacje:

- `Device` ma wiele heartbeatów, komend, eventów i tokenów agenta.
- `User` ma wiele refresh tokenów, wpisów audytu i komend.
- `Command` należy do urządzenia i opcjonalnie użytkownika.
- `RefreshToken` oraz `AgentToken` przechowują hash tokenu, nie token jawny.

## Realtime

Socket.IO jest inicjalizowane w `modules/realtime/realtime.gateway.ts`.

Envelope eventu:

```ts
{
  event: string;
  payload: unknown;
  emittedAt: string;
}
```

Emitowane eventy MVP:

- `api.health.changed` po połączeniu socketu,
- `device.created`,
- `device.updated`,
- `device.heartbeat.received`,
- `device.command.created`,
- `device.command.finished`.

## Auth I Tokeny

Aktualny login:

- wyszukuje użytkownika po emailu,
- porównuje hasło przez bcrypt,
- generuje access token JWT,
- generuje refresh token JWT,
- zapisuje hash refresh tokenu,
- tworzy wpis audytu.

W MVP middleware autoryzacji ról nie jest jeszcze podłączony globalnie do tras administracyjnych.

## Walidacja I Błędy

Walidacja body używa Zod i middleware `validateBody`.

Przykładowe walidatory pochodzą z `@project_zen/shared`:

- `loginSchema`,
- `deviceSchema`,
- `heartbeatSchema`,
- `createCommandSchema`,
- `commandResultSchema`.

Centralny `errorMiddleware` zwraca spójny format błędu.

## Znane Ograniczenia

- `refresh`, `logout`, `me`, `agent enroll` i `agent commands pull` są placeholderami.
- OpenAPI w `app.ts` jest skrótowe.
- Brakuje pełnego auth middleware dla ról.
- Status online/offline wymaga dalszej logiki okresowej opartej o `lastSeenAt`.
- Testy automatyczne nie są jeszcze dodane.
