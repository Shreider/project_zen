export const DEVICE_STATUSES = ["ONLINE", "OFFLINE", "UNKNOWN"] as const;
export type DeviceStatus = (typeof DEVICE_STATUSES)[number];
