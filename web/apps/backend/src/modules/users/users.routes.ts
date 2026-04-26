import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { created, ok } from "../../helpers/api-response";
import { validateBody } from "../../middleware/validate.middleware";
import { prisma } from "../../lib/prisma";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).optional(),
  role: z.enum(["SUPERADMIN", "ADMIN", "VIEWER"])
});

export const usersRouter = Router();
usersRouter.get("/", async (_req, res) => ok(res, await prisma.user.findMany({ select: { id: true, email: true, role: true, createdAt: true, updatedAt: true } })));
usersRouter.post("/", validateBody(userSchema.extend({ password: z.string().min(8) })), async (req, res) => created(res, await prisma.user.create({ data: { email: req.body.email, role: req.body.role, passwordHash: await bcrypt.hash(req.body.password, 12) } })));
usersRouter.get("/:id", async (req, res) => ok(res, await prisma.user.findUnique({ where: { id: String(req.params.id) }, select: { id: true, email: true, role: true, createdAt: true, updatedAt: true } })));
usersRouter.put("/:id", validateBody(userSchema.partial()), async (req, res) => ok(res, await prisma.user.update({ where: { id: String(req.params.id) }, data: { email: req.body.email, role: req.body.role, ...(req.body.password ? { passwordHash: await bcrypt.hash(req.body.password, 12) } : {}) } })));
usersRouter.delete("/:id", async (req, res) => ok(res, await prisma.user.delete({ where: { id: String(req.params.id) } })));
