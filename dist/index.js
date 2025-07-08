"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_middleware_1 = require("./middlewares/error-middleware");
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(error_middleware_1.errorHandler);
app.get("/health", (req, res) => { res.send("I’m OK!").status(200); });
const port = process.env.PORT;
app.listen(port, () => console.log("Server is up, on:", port));
