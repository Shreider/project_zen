import type { Server } from "socket.io";

let io: Server | null = null;

export function bindRealtime(server: Server) {
  io = server;
}

export function emitRealtime(event: string, payload: unknown) {
  io?.emit(event, { event, payload, emittedAt: new Date().toISOString() });
}
