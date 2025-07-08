"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidation = emailValidation;
const http_status_1 = __importDefault(require("http-status"));
function emailValidation(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw ({
            error: http_status_1.default.UNPROCESSABLE_ENTITY,
            message: "Formato de e-mail inválido",
        });
    }
}
