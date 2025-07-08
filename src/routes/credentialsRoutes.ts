import { Router } from "express";
import { validateSchema } from "../middlewares/schema-middleware";
import { User } from "../generated/prisma";


import { postCredentialsSchema } from "../schemas/credentials-schemas";
import { authenticateToken } from "../middlewares/auth-middleware";
import { deleteCredential, getCredentials, postCredentials, putCredentials } from "../controllers/credential-controllers";
import { GetAllCredentials } from "../repositories/credentials-repositories";
const credentialsRouter = Router()

credentialsRouter.post("/credentials",authenticateToken,validateSchema(postCredentialsSchema), postCredentials)
credentialsRouter.get("/credentials",authenticateToken, getCredentials)
credentialsRouter.put("/credentials/:id",authenticateToken,validateSchema(postCredentialsSchema), putCredentials)
credentialsRouter.delete("/credentials/:id",authenticateToken, deleteCredential)
export default credentialsRouter