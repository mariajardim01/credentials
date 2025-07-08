import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { User } from "../generated/prisma";
import { postUserSchema, signUserSchema } from "../schemas/user-schemas";
import { authenticateToken } from "../middlewares/auth-middleware";
import { DeleteUser, PostContact, SignContact } from "../controllers/user-controllers";
const userRouter = Router()

userRouter.post("/sign-up",validateSchema(postUserSchema), PostContact)
userRouter.post("/sign-in",validateSchema(signUserSchema), SignContact)
userRouter.delete("/erase",authenticateToken, DeleteUser)
export default userRouter