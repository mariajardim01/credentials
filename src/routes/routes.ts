import { Router } from "express";
import credentialsRouter from "./credentialsRoutes";
import userRouter from "./userRoutes";

const router = Router()

router.use(credentialsRouter)
router.use(userRouter)

export default router