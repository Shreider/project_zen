export type ApiSuccess<T> = { success: true; data: T; message?: string };
export type ApiFailure = { success: false; error: { code: string; message: string; details?: unknown } };
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
export type Pagination = { page: number; limit: number; total: number; totalPages: number };
export type PaginatedResponse<T> = ApiSuccess<T[]> & { pagination: Pagination };
