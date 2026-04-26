import type { Response } from "express";

export function ok<T>(res: Response, data: T, message = "OK") {
  return res.json({ success: true, data, message });
}

export function created<T>(res: Response, data: T, message = "Created") {
  return res.status(201).json({ success: true, data, message });
}

export function fail(res: Response, status: number, code: string, message: string, details?: unknown) {
  return res.status(status).json({ success: false, error: { code, message, details } });
}
