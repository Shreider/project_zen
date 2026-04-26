import type { DeviceStatus } from "../constants/device-statuses";

export type Device = {
  id: string;
  deviceUuid: string;
  name: string;
  model: string;
  manufacturer: string;
  androidVersion: string;
  appVersion: string;
  status: DeviceStatus;
  batteryLevel: number;
  charging: boolean;
  networkType: string;
  managedModeEnabled: boolean;
  lastSeenAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeviceHeartbeat = {
  id: string;
  deviceId: string;
  batteryLevel: number;
  charging: boolean;
  networkType: string;
  managedModeEnabled: boolean;
  ipAddress?: string;
  createdAt: string;
};

export type DeviceEvent = {
  id: string;
  deviceId: string;
  severity: "INFO" | "WARNING" | "ERROR" | "CRITICAL";
  eventType: string;
  message: string;
  metadataJson?: unknown;
  createdAt: string;
};
