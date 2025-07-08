import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import prisma from "../database";
import httpStatus from "http-status";

export const authenticateToken: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token mal formatado" });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET || "sua_chave_secreta";
    const decoded = jwt.verify(token, secretKey) as { user_id: string };

    
    const userInDB = await prisma.user.findUnique({
      where: { id: parseInt(decoded.user_id) }
    });

    if (!userInDB) {
      res.status(httpStatus.UNAUTHORIZED).json({ 
        error: "Token não pertence a um usuário válido" 
      });
      return;
    }

    (req as any).user_id = decoded.user_id;

    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido ou expirado" });
    return;
  }
};