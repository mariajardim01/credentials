import { Request, Response, NextFunction } from "express";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Erro capturado:", error);

  const status = error.status || 500;
  const message = error.message || "Erro interno do servidor";

  res.status(status).json({ error: message });
}