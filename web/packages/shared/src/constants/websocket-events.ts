export const WEBSOCKET_EVENTS = {
  DEVICE_CREATED: "device.created",
  DEVICE_UPDATED: "device.updated",
  DEVICE_STATUS_CHANGED: "device.status.changed",
  DEVICE_HEARTBEAT_RECEIVED: "device.heartbeat.received",
  DEVICE_COMMAND_CREATED: "device.command.created",
  DEVICE_COMMAND_PICKED: "device.command.picked",
  DEVICE_COMMAND_FINISHED: "device.command.finished",
  DEVICE_EVENT_CREATED: "device.event.created",
  API_HEALTH_CHANGED: "api.health.changed",
  AUDIT_CREATED: "audit.created"
} as const;
export type WebSocketEventName = (typeof WEBSOCKET_EVENTS)[keyof typeof WEBSOCKET_EVENTS];
