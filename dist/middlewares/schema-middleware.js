"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = validateSchema;
const http_status_1 = __importDefault(require("http-status"));
function validateSchema(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            res.status(http_status_1.default.UNPROCESSABLE_ENTITY).send(validation.error.details.map(detail => detail.message));
            return;
        }
        return next();
    };
}
