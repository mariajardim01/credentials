import jwt from "jsonwebtoken";

export function generateToken(id: number): string {
  const secretKey = process.env.JWT_SECRET || "sua_chave_secreta";

  // Inclui o user_id no payload do token
  const token = jwt.sign({ user_id: id }, secretKey, { expiresIn: "9h" });

  return token;
}
