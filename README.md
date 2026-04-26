# project_zen

Repozytorium projektu **project_zen / Realtime Android Environment Management**.

Docelowy podział katalogów:

- `web/` - część webowa: panel administracyjny, backend API, PostgreSQL/Prisma, WebSocket, Docker Compose, dokumentacja web/backend.
- `android/` - część Android: przyszły Android Agent Device Owner / managed mode.

## Aktualny cel

Zgodnie z `.TASK` obecnie wykonywana jest część web. Android nie jest jeszcze implementowany poza utrzymaniem właściwego katalogu `android/` i dokumentacji startowej.

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
│   ├── docker-compose.yml
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
```

## Zakres web

W katalogu `web/` powstaje demonstracyjny system project_zen:

- frontend Next.js App Router,
- backend Node.js/TypeScript,
- PostgreSQL,
- Prisma ORM,
- WebSocket realtime,
- JWT i role użytkowników,
- audyt,
- kolejka komend,
- seed danych testowych,
- Docker Compose,
- dokumentacja po polsku.

## Zakres Android

Katalog `android/` jest przeznaczony na przyszły moduł Android Agent korzystający z oficjalnych mechanizmów Android Enterprise:

- Device Owner,
- DevicePolicyManager,
- DeviceAdminReceiver,
- Lock Task Mode,
- Dedicated Device / managed mode.

Projekt nie służy do ukrywania aplikacji, obchodzenia zabezpieczeń Androida ani przejmowania prywatnych telefonów.
