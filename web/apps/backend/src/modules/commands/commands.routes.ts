import { Router } from "express";
import { ok } from "../../helpers/api-response";
import { prisma } from "../../lib/prisma";

export const commandsRouter = Router();

commandsRouter.get("/", async (_req, res) => ok(res, await prisma.command.findMany({ orderBy: { createdAt: "desc" }, include: { device: true } })));
commandsRouter.get("/:id", async (req, res) => ok(res, await prisma.command.findUnique({ where: { id: req.params.id }, include: { device: true } })));
