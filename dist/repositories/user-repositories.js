"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInDB = userInDB;
exports.registerUserDB = registerUserDB;
exports.deleteUserById = deleteUserById;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
async function userInDB(email) {
    const user = await database_1.default.user.findFirst({ where: {
            email: email
        } });
    return user;
}
async function registerUserDB(user) {
    const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
    await database_1.default.user.create({
        data: {
            email: user.email,
            name: user.name,
            password: hashedPassword
        }
    });
}
async function deleteUserById(id) {
    const userInDB = await database_1.default.user.findUnique({ where: { id } });
    if (!userInDB) {
        throw ({
            status: http_status_1.default.NOT_FOUND,
            message: "user do not exist"
        });
    }
    await database_1.default.user.delete({
        where: { id: id }
    });
}
