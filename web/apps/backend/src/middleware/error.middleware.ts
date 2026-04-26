import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { fail } from "../helpers/api-response";

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return fail(res, 400, "VALIDATION_ERROR", "Invalid request data", error.flatten());
  }

  console.error(error);
  return fail(res, 500, "INTERNAL_SERVER_ERROR", "Unexpected server error");
};
