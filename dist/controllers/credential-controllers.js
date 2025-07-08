"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCredentials = postCredentials;
exports.getCredentials = getCredentials;
exports.putCredentials = putCredentials;
exports.deleteCredential = deleteCredential;
const credentials_repositories_1 = require("../repositories/credentials-repositories");
const http_status_1 = __importDefault(require("http-status"));
const password_validation_1 = require("../services/password-validation");
const crypto_1 = require("../services/crypto");
async function postCredentials(req, res) {
    const body = req.body;
    const userId = req.user_id;
    const credentialOnDB = await (0, credentials_repositories_1.findCredentialByTitle)(body.title);
    if (credentialOnDB) {
        throw ({
            status: http_status_1.default.CONFLICT,
            message: "title already in use"
        });
    }
    (0, password_validation_1.passwordValidation)(body.password);
    await (0, credentials_repositories_1.RegisterCredential)(body, userId);
    res.status(http_status_1.default.CREATED).send("Credential created");
    return;
}
async function getCredentials(req, res) {
    const userId = req.user_id;
    const credentials = await (0, credentials_repositories_1.GetAllCredentials)(userId);
    const credentialsWithPass = credentials.map(credential => ({
        ...credential,
        password: (0, crypto_1.decryptPassword)(credential.password)
    }));
    res.send(credentialsWithPass).status(http_status_1.default.OK);
}
async function putCredentials(req, res) {
    const id = Number(req.params.id);
    const body = req.body;
    await (0, credentials_repositories_1.UpdateCredentials)(body, id);
    res.send("Credential updated").status(http_status_1.default.NO_CONTENT);
}
async function deleteCredential(req, res) {
    const id = Number(req.params.id);
    await (0, credentials_repositories_1.DeleteCredentialById)(id);
    res.send("credential deleted").status(http_status_1.default.NO_CONTENT);
}
