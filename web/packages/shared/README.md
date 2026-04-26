# Shared Package

`@project_zen/shared` zawiera współdzielone typy TypeScript, stałe domenowe oraz schematy walidacji Zod używane przez frontend i backend.

## Cel

Pakiet istnieje po to, żeby kontrakty domenowe były definiowane w jednym miejscu:

- typy urządzeń,
- typy komend,
- typy polityk,
- typy użytkowników,
- typy audytu,
- format odpowiedzi API,
- nazwy eventów Socket.IO,
- walidatory request body.

## Struktura

```text
packages/shared/
├── src/
│   ├── constants/
│   ├── types/
│   ├── validators/
│   └── index.ts
├── package.json
└── tsconfig.json
```

## Eksporty

Główny entrypoint:

```ts
export * from "./constants/roles";
export * from "./constants/device-statuses";
export * from "./constants/command-types";
export * from "./constants/command-statuses";
export * from "./constants/websocket-events";
export * from "./types/api";
export * from "./types/user";
export * from "./types/device";
export * from "./types/command";
export * from "./types/policy";
export * from "./types/audit";
export * from "./types/websocket";
export * from "./validators/auth.schema";
export * from "./validators/device.schema";
export * from "./validators/heartbeat.schema";
export * from "./validators/command.schema";
```

## Stałe Domenowe

Role:

- `SUPERADMIN`,
- `ADMIN`,
- `VIEWER`.

Statusy urządzeń:

- `ONLINE`,
- `OFFLINE`,
- `UNKNOWN`.

Typy komend:

- `ENABLE_MANAGED_MODE`,
- `DISABLE_MANAGED_MODE`,
- `CHANGE_TARGET_URL`,
- `REQUEST_HEARTBEAT`,
- `SHOW_ADMIN_MESSAGE`,
- `LOCK_DEVICE`,
- `REBOOT_DEVICE`,
- `WIPE_DEVICE`.

Statusy komend:

- `PENDING`,
- `PICKED`,
- `SUCCESS`,
- `FAILED`,
- `CANCELLED`.

Eventy realtime:

- `device.created`,
- `device.updated`,
- `device.status.changed`,
- `device.heartbeat.received`,
- `device.command.created`,
- `device.command.picked`,
- `device.command.finished`,
- `device.event.created`,
- `api.health.changed`,
- `audit.created`.

## Walidatory

Walidatory są oparte o Zod:

- `loginSchema`,
- `refreshTokenSchema`,
- `deviceSchema`,
- `heartbeatSchema`,
- `createCommandSchema`,
- `commandResultSchema`.

Przykład heartbeat:

```ts
heartbeatSchema.parse({
  deviceUuid: "tablet-01-demo",
  batteryLevel: 84,
  charging: false,
  networkType: "Wi-Fi",
  managedModeEnabled: true,
  androidVersion: "13",
  appVersion: "1.0.0"
});
```

## Skrypty

Z katalogu `web/`:

```bash
npm run build -w @project_zen/shared
npm run typecheck -w @project_zen/shared
```

## Zasady Zmian

- Zmiana typu w `shared` może wpływać jednocześnie na frontend i backend.
- Zmiana enumów komend lub statusów powinna być zsynchronizowana z Prisma schema.
- Walidatory requestów powinny odpowiadać temu, co backend faktycznie akceptuje.
- Publiczne typy powinny pozostać serializowalne do JSON.
