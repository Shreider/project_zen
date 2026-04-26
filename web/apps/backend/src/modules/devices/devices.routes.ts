import { Router } from "express";
import { createCommandSchema, deviceSchema } from "@project_zen/shared";
import { created, ok } from "../../helpers/api-response";
import { validateBody } from "../../middleware/validate.middleware";
import { prisma } from "../../lib/prisma";
import { emitRealtime } from "../realtime/realtime.service";

export const devicesRouter = Router();

devicesRouter.get("/", async (_req, res) => {
  const devices = await prisma.device.findMany({ orderBy: { updatedAt: "desc" } });
  return ok(res, devices);
});

devicesRouter.post("/", validateBody(deviceSchema), async (req, res) => {
  const device = await prisma.device.create({ data: req.body });
  emitRealtime("device.created", device);
  return created(res, device);
});

devicesRouter.get("/:id", async (req, res) => {
  const device = await prisma.device.findUnique({ where: { id: String(req.params.id) } });
  return ok(res, device);
});

devicesRouter.put("/:id", validateBody(deviceSchema.partial()), async (req, res) => {
  const device = await prisma.device.update({ where: { id: String(req.params.id) }, data: req.body });
  emitRealtime("device.updated", device);
  return ok(res, device);
});

devicesRouter.get("/:id/events", async (req, res) => ok(res, await prisma.deviceEvent.findMany({ where: { deviceId: String(req.params.id) }, orderBy: { createdAt: "desc" } })));
devicesRouter.get("/:id/heartbeats", async (req, res) => ok(res, await prisma.deviceHeartbeat.findMany({ where: { deviceId: String(req.params.id) }, orderBy: { createdAt: "desc" }, take: 50 })));
devicesRouter.get("/:id/commands", async (req, res) => ok(res, await prisma.command.findMany({ where: { deviceId: String(req.params.id) }, orderBy: { createdAt: "desc" } })));

devicesRouter.post("/:id/commands", validateBody(createCommandSchema), async (req, res) => {
  const deviceId = String(req.params.id);
  const command = await prisma.command.create({
    data: { deviceId, type: req.body.type, payloadJson: req.body.payloadJson ?? {} }
  });
  await prisma.auditLog.create({ data: { action: "create command", targetType: "command", targetId: command.id, metadataJson: { deviceId, type: req.body.type } } });
  emitRealtime("device.command.created", command);
  return created(res, command);
});
