import type { CommandStatus } from "../constants/command-statuses";
import type { CommandType } from "../constants/command-types";

export type Command = {
  id: string;
  deviceId: string;
  type: CommandType;
  payloadJson?: unknown;
  status: CommandStatus;
  resultJson?: unknown;
  errorMessage?: string | null;
  createdByUserId?: string | null;
  createdAt: string;
  pickedAt?: string | null;
  executedAt?: string | null;
};
