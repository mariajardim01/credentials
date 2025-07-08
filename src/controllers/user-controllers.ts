import { Request, Response  } from "express";
import prisma from "../database";
import  httpStatus  from "http-status";
import { deleteUserById, registerUserDB, userInDB } from "../repositories/user-repositories";
import { emailValidation } from "../services/email-validation";
import { postUserSchema } from "../schemas/user-schemas";
import { PostUserType, SignUserType } from "../protocols/user-protocols";
import { passwordValidation } from "../services/password-validation";
import { error } from "console";
import bcrypt from "bcrypt";
import { generateToken } from "../services/generateToken";
import { register } from "module";

export async function PostContact( req: Request, res: Response) {
    
    const user = req.body as PostUserType
    console.log(user)
    
    emailValidation(user.email)
    passwordValidation(user.password)

    
    const userOnDB= await userInDB(user.email)

        if (userOnDB){
         throw ({
                 status: httpStatus.CONFLICT,
                 message: "email already in use",
         });
        }
       
        registerUserDB(user)

        res.status(httpStatus.CREATED).send("created")
        return
    }


export async function SignContact(req: Request, res: Response) {
    const body:SignUserType = req.body

    const user = await userInDB(body.email)

    if (!user){
        throw({
            status: httpStatus.NOT_FOUND,
            message: "email not found"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password)

    if (!isPasswordCorrect){
        throw({
            status: httpStatus.UNAUTHORIZED,
            message: "wrong password"
        })
    }

    const token = generateToken(user.id)

    res.status(httpStatus.OK).send(token)

}

export async function DeleteUser(req: Request, res: Response) {
  const userId = (req as any).user_id;

  await deleteUserById(userId)

   res.status(200).send("Usuário e credenciais apagados");
    return
}