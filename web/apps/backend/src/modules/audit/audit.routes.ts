import { Router } from "express";
import { ok } from "../../helpers/api-response";
import { prisma } from "../../lib/prisma";

export const auditRouter = Router();

auditRouter.get("/", async (_req, res) => ok(res, await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, include: { user: true }, take: 100 })));
