import { Router } from "express";
import { commandResultSchema, heartbeatSchema } from "@project_zen/shared";
import { created, ok } from "../../helpers/api-response";
import { validateBody } from "../../middleware/validate.middleware";
import { prisma } from "../../lib/prisma";
import { emitRealtime } from "../realtime/realtime.service";

export const agentRouter = Router();

agentRouter.post("/enroll", async (_req, res) => created(res, { enrollment: "prepared", note: "Device Owner provisioning required before production use." }));

agentRouter.post("/heartbeat", validateBody(heartbeatSchema), async (req, res) => {
  const device = await prisma.device.update({
    where: { deviceUuid: req.body.deviceUuid },
    data: {
      batteryLevel: req.body.batteryLevel,
      charging: req.body.charging,
      networkType: req.body.networkType,
      managedModeEnabled: req.body.managedModeEnabled,
      status: "ONLINE",
      lastSeenAt: new Date()
    }
  });
  const heartbeat = await prisma.deviceHeartbeat.create({
    data: {
      deviceId: device.id,
      batteryLevel: req.body.batteryLevel,
      charging: req.body.charging,
      networkType: req.body.networkType,
      managedModeEnabled: req.body.managedModeEnabled,
      ipAddress: req.ip
    }
  });
  emitRealtime("device.heartbeat.received", { device, heartbeat });
  return created(res, { device, heartbeat });
});

agentRouter.get("/commands/pull", async (_req, res) => ok(res, []));
agentRouter.post("/commands/:id/result", validateBody(commandResultSchema), async (req, res) => {
  const commandId = String(req.params.id);
  const command = await prisma.command.update({
    where: { id: commandId },
    data: {
      status: req.body.success ? "SUCCESS" : "FAILED",
      resultJson: req.body.resultJson ?? {},
      errorMessage: req.body.errorMessage,
      executedAt: new Date()
    }
  });
  emitRealtime("device.command.finished", command);
  return ok(res, command);
});
agentRouter.post("/events", async (req, res) => created(res, { received: true, payload: req.body }));
agentRouter.post("/screenshots/upload", async (_req, res) => created(res, { placeholder: true, note: "Feature reserved for future controlled diagnostics." }));
