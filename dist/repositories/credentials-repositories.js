"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCredentialByTitle = findCredentialByTitle;
exports.RegisterCredential = RegisterCredential;
exports.GetAllCredentials = GetAllCredentials;
exports.GetCredentialsById = GetCredentialsById;
exports.UpdateCredentials = UpdateCredentials;
exports.DeleteCredentialById = DeleteCredentialById;
const http_status_1 = __importDefault(require("http-status"));
const database_1 = __importDefault(require("../database"));
const crypto_1 = require("../services/crypto");
async function findCredentialByTitle(title) {
    const credential = database_1.default.credentials.findUnique({
        where: {
            title: title
        }
    });
    return credential;
}
async function RegisterCredential(credential, userId) {
    const hashedPassword = (0, crypto_1.encryptPassword)(credential.password);
    const credentialOnDB = database_1.default.credentials.create({ data: {
            password: hashedPassword,
            title: credential.title,
            url: credential.url,
            username: credential.username,
            userId: userId
        } });
    return credentialOnDB;
}
async function GetAllCredentials(userId) {
    const credentials = await database_1.default.credentials.findMany({ where: {
            userId: userId
        } });
    return credentials;
}
async function GetCredentialsById(id) {
    const credential = await database_1.default.credentials.findUnique({ where: { id: id } });
    return credential;
}
async function UpdateCredentials(credential, id) {
    const credentialOnDB = await findCredentialByTitle(credential.title);
    if (credentialOnDB && credentialOnDB.id !== id) {
        throw {
            status: http_status_1.default.CONFLICT,
            message: "this title already been chosen"
        };
    }
    const credentialOnDB2 = await GetCredentialsById(id);
    if (!credentialOnDB2) {
        throw {
            status: http_status_1.default.NOT_FOUND,
            message: "Credential doesn't exist"
        };
    }
    const encryptedPassword = (0, crypto_1.encryptPassword)(credential.password);
    const result = await database_1.default.credentials.update({
        data: {
            password: encryptedPassword,
            title: credential.title,
            username: credential.username,
            url: credential.url
        },
        where: { id }
    });
    return result;
}
async function DeleteCredentialById(id) {
    const credentialOnDB = await GetCredentialsById(id);
    if (!credentialOnDB) {
        throw ({
            status: http_status_1.default.NOT_FOUND,
            message: "credential do not exist"
        });
    }
    await database_1.default.credentials.delete({ where: { id } });
    return;
}
