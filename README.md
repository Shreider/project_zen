# project_zen

`project_zen` to demonstracyjny system **Realtime Android Environment Management**. Repozytorium jest podzielone na część webową oraz przyszły komponent Android Agent.

Projekt służy do zarządzania urządzeniami Android w kontrolowanym środowisku organizacji. Nie jest przeznaczony do ukrywania aplikacji, obchodzenia zabezpieczeń Androida ani przejmowania prywatnych telefonów.

## Struktura

```text
.
├── android/
│   └── README.md
├── web/
│   ├── apps/
│   │   ├── backend/
│   │   └── frontend/
│   ├── packages/
│   │   └── shared/
│   ├── docker/
│   ├── docs/
│   ├── docker-compose.yml
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
```

## Moduły

- `web/` - panel administracyjny, backend API, PostgreSQL, Prisma, Socket.IO, Docker Compose i dokumentacja techniczna.
- `android/` - miejsce na przyszły Android Agent oparty o oficjalne mechanizmy Android Enterprise, Device Owner i managed mode.

## Szybki start

Najprostsza ścieżka uruchomienia projektu webowego:

```bash
cd web
cp .env.example .env
docker compose up --build
```

Adresy lokalne:

- frontend: `http://localhost:4001`
- backend healthcheck: `http://localhost:4000/api/health`
- Swagger UI: `http://localhost:4000/api/docs`
- PostgreSQL: `localhost:5432`

## Dokumentacja

- [web/README.md](web/README.md) - uruchamianie całego modułu web.
- [web/apps/backend/README.md](web/apps/backend/README.md) - backend API, Prisma, endpointy i skrypty.
- [web/apps/frontend/README.md](web/apps/frontend/README.md) - frontend Next.js i widoki panelu.
- [android/README.md](android/README.md) - planowany moduł Android Agent.
- [web/docs/](web/docs/) - dodatkowe notatki architektury, API, bazy danych, wdrożenia, bezpieczeństwa i testowania.

## Status

Aktualnie zaimplementowany jest web MVP. Moduł Android jest przygotowany strukturalnie i opisany koncepcyjnie, ale nie zawiera jeszcze projektu Gradle ani kodu agenta.

## Bezpieczeństwo

Pliki `.env.example` zawierają wartości demonstracyjne. Do środowisk innych niż lokalne należy ustawić własne sekrety JWT, hasła bazy danych i konfigurację CORS. Nie commituj prawdziwych tokenów, haseł ani prywatnych plików konfiguracyjnych.
