# Baza danych

Prisma schema definiuje modele:

- `User`
- `Device`
- `DeviceHeartbeat`
- `Command`
- `Policy`
- `DeviceEvent`
- `AuditLog`
- `AgentToken`
- `RefreshToken`

Status online/offline jest wyliczany z `lastSeenAt` i progu `DEVICE_ONLINE_THRESHOLD_SECONDS`.
