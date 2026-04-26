# Deployment

Lokalnie:

```bash
cp .env.example .env
docker compose up --build
```

Produkcja wymaga:

- HTTPS,
- bezpiecznych sekretów JWT,
- zewnętrznego PostgreSQL albo trwałego volume,
- reverse proxy,
- migracji Prisma,
- rotacji tokenów.
