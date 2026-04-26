import type { WebSocketEventName } from "../constants/websocket-events";

export type WebSocketEnvelope<T = unknown> = {
  event: WebSocketEventName;
  payload: T;
  emittedAt: string;
};
