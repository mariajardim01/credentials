import express, { Request, Response, json } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error-middleware";

import router from "./routes/routes";

dotenv.config()
const app = express();
app.use(express.json())
app.use(router)
app.use(errorHandler);


app.get("/health",(req: Request,res: Response) => {res.send("I’m OK!").status(200)});



const port = process.env.PORT
app.listen(port , ()=> console.log("Server is up, on:", port))