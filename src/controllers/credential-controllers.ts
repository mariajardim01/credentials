import { Request, Response } from "express";
import { DeleteCredentialById, findCredentialByTitle, GetAllCredentials, RegisterCredential, UpdateCredentials } from "../repositories/credentials-repositories";
import {  PostCredentialsType } from "../protocols/credentials-protocols";
import  httpStatus  from "http-status";
import { passwordValidation } from "../services/password-validation";
import { decryptPassword } from "../services/crypto";
export async function postCredentials(req: Request, res: Response) {
    const body :PostCredentialsType = req.body
     const userId = (req as any).user_id
    const  credentialOnDB = await findCredentialByTitle(body.title)

    if (credentialOnDB){
        throw({
            status: httpStatus.CONFLICT,
            message: "title already in use"
        })
    }
     
    passwordValidation(body.password)

    await RegisterCredential(body,userId)
    
    res.status(httpStatus.CREATED).send("Credential created")
    
    return




    
}

export async function getCredentials(req: Request, res: Response) {
    const userId = (req as any).user_id

    const credentials = await GetAllCredentials(userId)
     const credentialsWithPass = credentials.map(credential => ({
    ...credential,
    password: decryptPassword(credential.password)
  }));

    res.send(credentialsWithPass).status(httpStatus.OK)

}

export async function putCredentials(req: Request, res: Response) {
    const id: number = Number(req.params.id)
    const body:PostCredentialsType = req.body;

    await UpdateCredentials(body,id)

    res.send("Credential updated").status(httpStatus.NO_CONTENT)

    
    
}

export async function deleteCredential(req: Request, res: Response) {
    const id: number = Number(req.params.id)

   await DeleteCredentialById(id)

    res.send("credential deleted").status(httpStatus.NO_CONTENT)




}