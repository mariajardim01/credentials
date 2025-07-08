"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidation = passwordValidation;
const http_status_1 = __importDefault(require("http-status"));
function passwordValidation(password) {
    if (password.length < 6) {
        throw ({
            error: http_status_1.default.UNPROCESSABLE_ENTITY,
            message: "this password need to have at least 6 characters"
        });
    }
}
