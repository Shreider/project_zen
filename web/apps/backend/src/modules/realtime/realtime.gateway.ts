import { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { env } from "../../config/env";
import { bindRealtime } from "./realtime.service";

export function createRealtimeGateway(server: HttpServer) {
  const io = new Server(server, {
    cors: { origin: env.CORS_ORIGIN, credentials: true }
  });

  io.on("connection", (socket) => {
    socket.emit("api.health.changed", { event: "api.health.changed", payload: { status: "ok" }, emittedAt: new Date().toISOString() });
  });

  bindRealtime(io);
  return io;
}
