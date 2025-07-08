"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(id) {
    const secretKey = process.env.JWT_SECRET || "sua_chave_secreta";
    const token = jsonwebtoken_1.default.sign({ user_id: id }, secretKey, { expiresIn: "9h" });
    return token;
}
