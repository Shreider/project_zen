# API

Backend dzieli endpointy na dwa namespace.

## Panel administratora

- `POST /api/backend/auth/login`
- `POST /api/backend/auth/refresh`
- `POST /api/backend/auth/logout`
- `GET /api/backend/auth/me`
- `GET /api/backend/users`
- `POST /api/backend/users`
- `GET /api/backend/devices`
- `POST /api/backend/devices`
- `GET /api/backend/devices/:id`
- `PUT /api/backend/devices/:id`
- `GET /api/backend/devices/:id/events`
- `GET /api/backend/devices/:id/heartbeats`
- `GET /api/backend/devices/:id/commands`
- `POST /api/backend/devices/:id/commands`
- `GET /api/backend/commands`
- `GET /api/backend/policies`
- `POST /api/backend/policies`
- `GET /api/backend/audit`
- `GET /api/backend/stats`

## Android Agent

- `POST /api/agent/enroll`
- `POST /api/agent/heartbeat`
- `GET /api/agent/commands/pull`
- `POST /api/agent/commands/:id/result`
- `POST /api/agent/events`
- `POST /api/agent/screenshots/upload`

Format sukcesu:

```json
{ "success": true, "data": {}, "message": "OK" }
```

Format błędu:

```json
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Invalid request data" } }
```
