"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
const http_status_1 = __importDefault(require("http-status"));
const authenticateToken = async (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        const userInDB = await database_1.default.user.findUnique({
            where: { id: parseInt(decoded.user_id) }
        });
        if (!userInDB) {
            res.status(http_status_1.default.UNAUTHORIZED).json({
                error: "Token não pertence a um usuário válido"
            });
            return;
        }
        req.user_id = decoded.user_id;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Token inválido ou expirado" });
        return;
    }
};
exports.authenticateToken = authenticateToken;
