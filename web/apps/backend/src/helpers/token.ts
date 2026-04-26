import crypto from "node:crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const sha256 = (value: string) => crypto.createHash("sha256").update(value).digest("hex");
export const signAccessToken = (payload: object) => jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"] });
export const signRefreshToken = (payload: object) => jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: `${env.JWT_REFRESH_EXPIRES_IN_DAYS}d` as SignOptions["expiresIn"] });
