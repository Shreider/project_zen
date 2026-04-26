import { z } from "zod";

export const heartbeatSchema = z.object({
  deviceUuid: z.string().min(3),
  batteryLevel: z.number().int().min(0).max(100),
  charging: z.boolean(),
  networkType: z.string().min(1),
  managedModeEnabled: z.boolean(),
  androidVersion: z.string().optional(),
  appVersion: z.string().optional()
});
