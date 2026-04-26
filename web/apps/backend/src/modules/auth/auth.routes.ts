import { Router } from "express";
import bcrypt from "bcryptjs";
import { loginSchema } from "@project_zen/shared";
import { validateBody } from "../../middleware/validate.middleware";
import { created, ok, fail } from "../../helpers/api-response";
import { signAccessToken, signRefreshToken, sha256 } from "../../helpers/token";
import { prisma } from "../../lib/prisma";

export const authRouter = Router();

authRouter.post("/login", validateBody(loginSchema), async (req, res) => {
  const user = await prisma.user.findUnique({ where: { email: req.body.email } });
  if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
    await prisma.auditLog.create({ data: { action: "failed login attempt", targetType: "auth", metadataJson: { email: req.body.email } } });
    return fail(res, 401, "INVALID_CREDENTIALS", "Invalid email or password");
  }

  const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id });
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: sha256(refreshToken),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
  });
  await prisma.auditLog.create({ data: { userId: user.id, action: "login", targetType: "auth" } });
  return ok(res, { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role } });
});

authRouter.post("/refresh", async (_req, res) => ok(res, { accessToken: "refresh-flow-placeholder" }));
authRouter.post("/logout", async (_req, res) => created(res, { revoked: true }, "Logged out"));
authRouter.get("/me", async (_req, res) => ok(res, { email: "admin@example.com", role: "SUPERADMIN" }));
