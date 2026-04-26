export type AuditLog = {
  id: string;
  userId?: string | null;
  userEmail?: string | null;
  action: string;
  targetType: string;
  targetId?: string | null;
  metadataJson?: unknown;
  createdAt: string;
};
