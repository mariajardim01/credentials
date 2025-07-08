import { error } from "console";
import httpStatus from "http-status";
import prisma from "../database";
import { PostCredentialsType } from "../protocols/credentials-protocols";
import bcrypt from "bcrypt" 
import { encryptPassword } from "../services/crypto";
import { Request } from "express";
export async function findCredentialByTitle(title: string) {
  const credential = prisma.credentials.findUnique({
    where:{
        title: title
    }
  })

  return credential
}

export async function RegisterCredential(credential:PostCredentialsType, userId: number){
    const hashedPassword = encryptPassword(credential.password)
    const credentialOnDB =  prisma.credentials.create({data:{
        password: hashedPassword,
        title: credential.title,
        url: credential.url,
        username: credential.username,
        userId: userId
    }})

    return credentialOnDB

}

export async function GetAllCredentials(userId: number) {
    
    
    const credentials = await prisma.credentials.findMany({where: {
        userId: userId
    }})

    return credentials
}

export async function GetCredentialsById(id: number) {
    
    const credential = await prisma.credentials.findUnique({where: {id: id}})

    return credential
}


export async function UpdateCredentials(credential: PostCredentialsType, id: number) {
  const credentialOnDB = await findCredentialByTitle(credential.title);

 
  if (credentialOnDB && credentialOnDB.id !== id) {
    throw {
      status: httpStatus.CONFLICT,
      message: "this title already been chosen"
    };
  }

  const credentialOnDB2 = await GetCredentialsById(id); 

  if (!credentialOnDB2) {
    throw {
      status: httpStatus.NOT_FOUND,
      message: "Credential doesn't exist"
    };
  }

  const encryptedPassword = encryptPassword(credential.password);

  const result = await prisma.credentials.update({
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


export async function DeleteCredentialById(id:number) {
    
    const credentialOnDB = await GetCredentialsById(id)

    if (!credentialOnDB){
        throw({
            status: httpStatus.NOT_FOUND,
            message: "credential do not exist"
        })
    }

    await prisma.credentials.delete({where:{id}})

    return 

}