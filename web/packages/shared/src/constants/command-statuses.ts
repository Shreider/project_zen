export const COMMAND_STATUSES = ["PENDING", "PICKED", "SUCCESS", "FAILED", "CANCELLED"] as const;
export type CommandStatus = (typeof COMMAND_STATUSES)[number];
