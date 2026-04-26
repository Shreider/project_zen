import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { ok } from "./helpers/api-response";
import { errorMiddleware } from "./middleware/error.middleware";
import { authRouter } from "./modules/auth/auth.routes";
import { usersRouter } from "./modules/users/users.routes";
import { devicesRouter } from "./modules/devices/devices.routes";
import { commandsRouter } from "./modules/commands/commands.routes";
import { policiesRouter } from "./modules/policies/policies.routes";
import { auditRouter } from "./modules/audit/audit.routes";
import { agentRouter } from "./modules/agent/agent.routes";

const openApiDocument = {
  openapi: "3.0.0",
  info: { title: "project_zen API", version: "0.1.0" },
  paths: {
    "/api/health": { get: { summary: "Healthcheck" } },
    "/api/backend/auth/login": { post: { summary: "Login administratora" } },
    "/api/backend/devices": { get: { summary: "Lista urządzeń" }, post: { summary: "Rejestracja urządzenia z panelu" } },
    "/api/backend/devices/{id}/commands": { post: { summary: "Utworzenie komendy dla urządzenia" } },
    "/api/agent/heartbeat": { post: { summary: "Heartbeat Android Agent" } },
    "/api/agent/commands/pull": { get: { summary: "Pobranie komend przez agenta" } }
  }
};

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(cookieParser());
  app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => ok(res, { status: "ok", service: "project_zen-backend", time: new Date().toISOString() }));
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
  app.use("/api/backend/auth", authRouter);
  app.use("/api/backend/users", usersRouter);
  app.use("/api/backend/devices", devicesRouter);
  app.use("/api/backend/commands", commandsRouter);
  app.use("/api/backend/policies", policiesRouter);
  app.use("/api/backend/audit", auditRouter);
  app.use("/api/backend/stats", async (_req, res) => ok(res, { totalDevices: 3, online: 2, offline: 1, pendingCommands: 1, failedCommands: 0 }));
  app.use("/api/agent", agentRouter);
  app.use(errorMiddleware);
  return app;
}
