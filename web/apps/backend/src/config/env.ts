import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(16).default("change_me_access_secret"),
  JWT_REFRESH_SECRET: z.string().min(16).default("change_me_refresh_secret"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN_DAYS: z.coerce.number().default(30),
  DEVICE_ONLINE_THRESHOLD_SECONDS: z.coerce.number().default(60),
  CORS_ORIGIN: z.string().default("http://localhost:4001")
});

export const env = envSchema.parse(process.env);
