export const USER_ROLES = ["SUPERADMIN", "ADMIN", "VIEWER"] as const;
export type UserRole = (typeof USER_ROLES)[number];
