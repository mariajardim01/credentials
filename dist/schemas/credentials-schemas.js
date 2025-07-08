"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCredentialsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.postCredentialsSchema = joi_1.default.object({
    password: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    url: joi_1.default.string().required(),
    username: joi_1.default.string().required()
});
