# project_zen

`project_zen` is a demonstracyjny system **Realtime Android Environment Management**. Projekt pokazuje architekturę panelu administracyjnego, backendu API, bazy danych i przyszłego Android Agent dla zarządzanych urządzeń Android w kontrolowanym środowisku organizacji.

Projekt nie służy do ukrywania aplikacji, obchodzenia zabezpieczeń Androida, przejmowania prywatnych telefonów ani działania poza oficjalnym modelem Android Enterprise.

## Spis Treści

- [Cel projektu](#cel-projektu)
- [Aktualny status](#aktualny-status)
- [Architektura](#architektura)
- [Struktura repozytorium](#struktura-repozytorium)
- [Szybki start](#szybki-start)
- [Moduły](#moduły)
- [Porty i adresy](#porty-i-adresy)
- [Konfiguracja](#konfiguracja)
- [Dane testowe](#dane-testowe)
- [Workflow developerski](#workflow-developerski)
- [Walidacja](#walidacja)
- [Dokumentacja modułów](#dokumentacja-modułów)
- [Bezpieczeństwo](#bezpieczeństwo)
- [Znane ograniczenia MVP](#znane-ograniczenia-mvp)
- [Roadmap](#roadmap)

## Cel Projektu

Celem `project_zen` jest przygotowanie kompletnej podstawy pod system zarządzania środowiskiem urządzeń Android:

- panel webowy dla administratorów,
- backend REST API,
- realtime przez Socket.IO,
- kolejka komend dla urządzeń,
- rejestr urządzeń i heartbeatów,
- audyt działań administracyjnych,
- polityki środowiska,
- przyszły Android Agent działający jako Device Owner / Device Policy Controller.

## Aktualny Status

Zaimplementowany jest moduł `web/`:

- frontend Next.js,
- backend Express/TypeScript,
- PostgreSQL,
- Prisma ORM,
- Socket.IO,
- Docker Compose,
- seed danych demonstracyjnych,
- dokumentacja techniczna.

Moduł `android/` jest na razie katalogiem koncepcyjnym i dokumentacyjnym. Nie ma jeszcze projektu Gradle ani kodu agenta.

## Architektura

```text
┌──────────────┐      REST / Socket.IO      ┌──────────────┐      Prisma      ┌──────────────┐
│  Frontend    │ <────────────────────────> │   Backend    │ <──────────────> │ PostgreSQL   │
│  Next.js     │                            │ Express API  │                  │              │
└──────────────┘                            └──────┬───────┘                  └──────────────┘
                                                   │
                                                   │ REST / future device token auth
                                                   ▼
                                            ┌──────────────┐
                                            │ Android      │
                                            │ Agent        │
                                            │ future       │
                                            └──────────────┘
```

Główne przepływy:

- Administrator korzysta z panelu webowego.
- Frontend komunikuje się z backendem przez REST i docelowo Socket.IO.
- Backend zapisuje stan w PostgreSQL przez Prisma.
- Android Agent będzie wysyłał heartbeaty i odbierał komendy przez namespace `/api/agent`.
- Backend emituje zdarzenia realtime po zmianach stanu urządzeń i komend.

## Struktura Repozytorium

```text
.
├── android/
│   └── README.md
├── web/
│   ├── apps/
│   │   ├── backend/
│   │   │   ├── prisma/
│   │   │   ├── src/
│   │   │   └── README.md
│   │   └── frontend/
│   │       ├── src/
│   │       └── README.md
│   ├── packages/
│   │   └── shared/
│   │       ├── src/
│   │       └── README.md
│   ├── docker/
│   ├── docs/
│   │   └── README.md
│   ├── docker-compose.yml
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
```

## Szybki Start

Rekomendowana ścieżka uruchomienia używa Docker Compose:

```bash
cd web
cp .env.example .env
docker compose up --build
```

Po starcie sprawdź:

```bash
curl -i http://localhost:4000/api/health
```

Główne adresy:

- frontend: `http://localhost:4001`
- dashboard: `http://localhost:4001/dashboard`
- backend: `http://localhost:4000`
- Swagger UI: `http://localhost:4000/api/docs`
- PostgreSQL: `localhost:5432`

Zatrzymanie:

```bash
cd web
docker compose down
```

## Moduły

### `web/`

Główny moduł aplikacji. Zawiera:

- `apps/frontend` - panel administratora,
- `apps/backend` - REST API, Prisma, Socket.IO,
- `packages/shared` - współdzielone typy, stałe i schematy Zod,
- `docs` - dokumentacja techniczna,
- `docker-compose.yml` - lokalna orkiestracja usług.

### `android/`

Planowany moduł Android Agent. Ma docelowo odpowiadać za:

- enrollment urządzenia,
- heartbeat,
- pobieranie komend,
- raportowanie wyników,
- integrację z oficjalnymi mechanizmami Android Enterprise.

## Porty I Adresy

| Usługa | Adres | Opis |
| --- | --- | --- |
| Frontend | `http://localhost:4001` | Panel administracyjny |
| Backend | `http://localhost:4000` | REST API i Socket.IO |
| Swagger | `http://localhost:4000/api/docs` | Podgląd API |
| Healthcheck | `http://localhost:4000/api/health` | Status backendu |
| PostgreSQL | `localhost:5432` | Baza danych lokalna |

Kontenery Docker Compose:

- `project_zen-frontend`,
- `project_zen-backend`,
- `project_zen-postgres`.

## Konfiguracja

Główny przykład konfiguracji znajduje się w:

```text
web/.env.example
```

Najważniejsze zmienne:

- `DATABASE_URL` - URL połączenia Prisma z PostgreSQL,
- `POSTGRES_USER` - użytkownik bazy,
- `POSTGRES_PASSWORD` - hasło bazy,
- `POSTGRES_DB` - nazwa bazy,
- `JWT_ACCESS_SECRET` - sekret access tokenów,
- `JWT_REFRESH_SECRET` - sekret refresh tokenów,
- `DEVICE_ONLINE_THRESHOLD_SECONDS` - próg uznania urządzenia za online,
- `NEXT_PUBLIC_API_URL` - publiczny adres REST API dla frontendu,
- `NEXT_PUBLIC_WS_URL` - publiczny adres Socket.IO dla frontendu.

Wartości w `.env.example` są tylko lokalne. Do środowisk innych niż lokalne ustaw własne hasła, sekrety i origin CORS.

## Dane Testowe

Seed backendu tworzy konto:

- email: `admin@example.com`
- hasło: `Admin123!ChangeMe`
- rola: `SUPERADMIN`

Seed dodaje również przykładowe urządzenia, heartbeaty, politykę środowiska, komendy i logi audytu.

## Workflow Developerski

Typowy workflow:

```bash
cd web
docker compose up --build
```

Alternatywnie lokalnie bez Dockera:

```bash
cd web
npm install
npm run db:generate
npm run db:seed
npm run dev
```

Najważniejsze skrypty z `web/package.json`:

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Walidacja

Minimalna walidacja po zmianach:

```bash
cd web
docker compose config
docker compose up --build
curl -i http://localhost:4000/api/health
curl -I http://localhost:4001/dashboard
```

Dla kodu TypeScript:

```bash
cd web
npm run typecheck
npm run build
```

## Dokumentacja Modułów

- [web/README.md](web/README.md) - kompletna dokumentacja modułu web.
- [web/apps/backend/README.md](web/apps/backend/README.md) - backend, API, Prisma, realtime.
- [web/apps/frontend/README.md](web/apps/frontend/README.md) - frontend, routing, UI, style.
- [web/packages/shared/README.md](web/packages/shared/README.md) - typy, stałe i walidatory współdzielone.
- [android/README.md](android/README.md) - plan Android Agent.
- [web/docs/README.md](web/docs/README.md) - indeks dokumentów technicznych.

## Bezpieczeństwo

Zasady projektu:

- nie commitować prawdziwych sekretów,
- trzymać wartości produkcyjne poza repozytorium,
- używać HTTPS poza localhost,
- rotować tokeny i hasła,
- walidować payloady przez Zod,
- trzymać działania administratorów w audycie,
- implementować Android Agent wyłącznie przez oficjalne API Android Enterprise.

## Znane Ograniczenia MVP

- Android Agent nie jest jeszcze zaimplementowany.
- Część widoków frontendu korzysta z danych mockowanych.
- `POST /api/backend/auth/refresh` jest placeholderem.
- `GET /api/agent/commands/pull` jest placeholderem i zwraca pustą listę.
- Swagger zawiera podstawowy opis endpointów, nie pełny kontrakt OpenAPI.
- Produkcyjna autoryzacja ról i middleware auth są do rozbudowy.

## Roadmap

Najbliższe logiczne kroki:

1. Podłączyć wszystkie widoki frontendu do realnego API.
2. Dodać middleware autoryzacji i kontroli ról.
3. Uzupełnić pełny OpenAPI schema.
4. Dodać testy backendu i frontendu.
5. Rozpocząć implementację Android Agent.
6. Dodać provisioning urządzeń i bezpieczny enrollment token flow.
