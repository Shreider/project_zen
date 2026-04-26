# Architektura

`project_zen` składa się z panelu Next.js, backendu Node/Express, PostgreSQL oraz przyszłego agenta Android Device Owner.

```text
Frontend -> REST/WebSocket -> Backend -> Prisma -> PostgreSQL
Android Agent -> /api/agent/* -> Backend -> WebSocket -> Frontend
```

## Heartbeat

1. Agent wysyła `POST /api/agent/heartbeat`.
2. Backend waliduje payload.
3. Backend zapisuje heartbeat.
4. Backend aktualizuje status urządzenia.
5. Backend emituje `device.heartbeat.received`.

## Komendy

1. Admin tworzy komendę w panelu.
2. Backend zapisuje `PENDING`.
3. Agent pobiera komendę.
4. Agent odsyła wynik.
5. Backend emituje `device.command.finished`.
