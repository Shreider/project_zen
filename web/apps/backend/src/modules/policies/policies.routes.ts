import { Router } from "express";
import { z } from "zod";
import { created, ok } from "../../helpers/api-response";
import { validateBody } from "../../middleware/validate.middleware";
import { prisma } from "../../lib/prisma";

const policySchema = z.object({
  name: z.string().min(2),
  description: z.string().default(""),
  configJson: z.record(z.string(), z.unknown())
});

export const policiesRouter = Router();

policiesRouter.get("/", async (_req, res) => ok(res, await prisma.policy.findMany({ orderBy: { updatedAt: "desc" } })));
policiesRouter.post("/", validateBody(policySchema), async (req, res) => created(res, await prisma.policy.create({ data: req.body })));
policiesRouter.get("/:id", async (req, res) => ok(res, await prisma.policy.findUnique({ where: { id: String(req.params.id) } })));
policiesRouter.put("/:id", validateBody(policySchema.partial()), async (req, res) => ok(res, await prisma.policy.update({ where: { id: String(req.params.id) }, data: req.body })));
policiesRouter.delete("/:id", async (req, res) => ok(res, await prisma.policy.delete({ where: { id: String(req.params.id) } })));
