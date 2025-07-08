import prisma from "../database";
import { PostUserType } from "../protocols/user-protocols";
import bcrypt from "bcrypt" 
import httpStatus  from "http-status";

export async function userInDB(email: string) {
    const user = await prisma.user.findFirst({where: {
        email: email
    }}
    )

    return user
}

export async function registerUserDB(user: PostUserType) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
        await prisma.user.create({
            data:{
                email: user.email,
                name: user.name,
                password:   hashedPassword
                
            }
        })
}

export async function deleteUserById(id:number) {
    const userInDB = await prisma.user.findUnique({where: {id}})

    if (!userInDB){
        throw({
            status: httpStatus.NOT_FOUND,
            message: "user do not exist"
        })
    }
    
    await prisma.user.delete({
    where: { id: id }
  });
}