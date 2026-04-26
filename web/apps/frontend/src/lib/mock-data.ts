import type { AuditLog, Command, Device, DeviceHeartbeat, Policy } from "@project_zen/shared";

export const devices: Device[] = [
  {
    id: "dev-1",
    deviceUuid: "tablet-01-demo",
    name: "Tablet-01",
    model: "Tab Active 4 Pro",
    manufacturer: "Samsung",
    androidVersion: "13",
    appVersion: "1.0.0",
    status: "ONLINE",
    batteryLevel: 84,
    charging: false,
    networkType: "Wi-Fi",
    managedModeEnabled: true,
    lastSeenAt: "2026-04-26T01:35:00.000Z",
    createdAt: "2026-04-26T00:00:00.000Z",
    updatedAt: "2026-04-26T01:35:00.000Z"
  },
  {
    id: "dev-2",
    deviceUuid: "tablet-02-demo",
    name: "Tablet-02",
    model: "Lenovo Tab M10",
    manufacturer: "Lenovo",
    androidVersion: "12",
    appVersion: "1.0.0",
    status: "OFFLINE",
    batteryLevel: 32,
    charging: false,
    networkType: "LTE",
    managedModeEnabled: false,
    lastSeenAt: "2026-04-26T01:06:00.000Z",
    createdAt: "2026-04-26T00:00:00.000Z",
    updatedAt: "2026-04-26T01:06:00.000Z"
  },
  {
    id: "dev-3",
    deviceUuid: "environment-frontdesk-demo",
    name: "FrontDesk-Tablet",
    model: "Pixel Tablet",
    manufacturer: "Google",
    androidVersion: "14",
    appVersion: "1.0.0",
    status: "ONLINE",
    batteryLevel: 100,
    charging: true,
    networkType: "Ethernet",
    managedModeEnabled: true,
    lastSeenAt: "2026-04-26T01:36:00.000Z",
    createdAt: "2026-04-26T00:00:00.000Z",
    updatedAt: "2026-04-26T01:36:00.000Z"
  }
];

export const heartbeats: DeviceHeartbeat[] = devices.map((device, index) => ({
  id: `hb-${index + 1}`,
  deviceId: device.id,
  batteryLevel: device.batteryLevel,
  charging: device.charging,
  networkType: device.networkType,
  managedModeEnabled: device.managedModeEnabled,
  ipAddress: `192.168.1.${20 + index}`,
  createdAt: device.lastSeenAt ?? device.updatedAt
}));

export const commands: Command[] = [
  { id: "cmd-1", deviceId: "dev-1", type: "REQUEST_HEARTBEAT", status: "SUCCESS", createdAt: "2026-04-26T01:20:00.000Z", executedAt: "2026-04-26T01:20:03.000Z" },
  { id: "cmd-2", deviceId: "dev-2", type: "ENABLE_MANAGED_MODE", status: "PENDING", payloadJson: { targetUrl: "https://example.com/environment" }, createdAt: "2026-04-26T01:30:00.000Z" },
  { id: "cmd-3", deviceId: "dev-3", type: "SHOW_ADMIN_MESSAGE", status: "PICKED", payloadJson: { message: "Przerwa serwisowa o 22:00" }, createdAt: "2026-04-26T01:31:00.000Z", pickedAt: "2026-04-26T01:31:05.000Z" }
];

export const policies: Policy[] = [
  {
    id: "pol-1",
    name: "Profil podstawowy",
    description: "Lock task mode, docelowy URL i lista dozwolonych aplikacji.",
    configJson: { managedModeEnabled: true, targetUrl: "https://example.com/environment", allowedApps: ["com.android.chrome", "pl.project_zen.agent"], lockTaskEnabled: true },
    createdAt: "2026-04-26T00:00:00.000Z",
    updatedAt: "2026-04-26T00:00:00.000Z"
  }
];

export const auditLogs: AuditLog[] = [
  { id: "aud-1", userId: "usr-1", userEmail: "admin@example.com", action: "login", targetType: "auth", createdAt: "2026-04-26T01:00:00.000Z" },
  { id: "aud-2", userId: "usr-1", userEmail: "admin@example.com", action: "create command", targetType: "command", targetId: "cmd-2", createdAt: "2026-04-26T01:30:00.000Z" }
];
