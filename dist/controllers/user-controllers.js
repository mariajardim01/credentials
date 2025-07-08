"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostContact = PostContact;
exports.SignContact = SignContact;
exports.DeleteUser = DeleteUser;
const http_status_1 = __importDefault(require("http-status"));
const user_repositories_1 = require("../repositories/user-repositories");
const email_validation_1 = require("../services/email-validation");
const password_validation_1 = require("../services/password-validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../services/generateToken");
async function PostContact(req, res) {
    const user = req.body;
    console.log(user);
    (0, email_validation_1.emailValidation)(user.email);
    (0, password_validation_1.passwordValidation)(user.password);
    const userOnDB = await (0, user_repositories_1.userInDB)(user.email);
    if (userOnDB) {
        throw ({
            status: http_status_1.default.CONFLICT,
            message: "email already in use",
        });
    }
    (0, user_repositories_1.registerUserDB)(user);
    res.status(http_status_1.default.CREATED).send("created");
    return;
}
async function SignContact(req, res) {
    const body = req.body;
    const user = await (0, user_repositories_1.userInDB)(body.email);
    if (!user) {
        throw ({
            status: http_status_1.default.NOT_FOUND,
            message: "email not found"
        });
    }
    const isPasswordCorrect = await bcrypt_1.default.compare(body.password, user.password);
    if (!isPasswordCorrect) {
        throw ({
            status: http_status_1.default.UNAUTHORIZED,
            message: "wrong password"
        });
    }
    const token = (0, generateToken_1.generateToken)(user.id);
    res.status(http_status_1.default.OK).send(token);
}
async function DeleteUser(req, res) {
    const userId = req.user_id;
    await (0, user_repositories_1.deleteUserById)(userId);
    res.status(200).send("Usuário e credenciais apagados");
    return;
}
