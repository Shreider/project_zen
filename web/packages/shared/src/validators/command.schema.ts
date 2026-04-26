import { z } from "zod";
import { COMMAND_TYPES } from "../constants/command-types";

export const createCommandSchema = z.object({
  type: z.enum(COMMAND_TYPES),
  payloadJson: z.record(z.string(), z.unknown()).optional()
});

export const commandResultSchema = z.object({
  success: z.boolean(),
  resultJson: z.record(z.string(), z.unknown()).optional(),
  errorMessage: z.string().optional()
});
