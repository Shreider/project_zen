import { z } from "zod";

export const deviceSchema = z.object({
  deviceUuid: z.string().min(3),
  name: z.string().min(2),
  model: z.string().min(1),
  manufacturer: z.string().min(1),
  androidVersion: z.string().min(1),
  appVersion: z.string().min(1)
});
