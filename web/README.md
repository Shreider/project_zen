# project_zen web

Część webowa projektu `project_zen`: panel administracyjny, backend API, PostgreSQL, Prisma, WebSocket, Docker Compose i dokumentacja.

## Uruchomienie

```bash
cp .env.example .env
docker compose up --build
```

Usługi:

- frontend: `http://localhost:4001`
- backend: `http://localhost:4000`
- Swagger: `http://localhost:4000/api/docs`
- PostgreSQL: `localhost:5432`

## Lokalnie

```bash
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Domyślne konto seed:

- `admin@example.com`
- `Admin123!ChangeMe`
