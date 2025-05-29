import express, { Request, Response, json } from "express";
import dotenv from "dotenv";
import db from "database";

dotenv.config()
const app = express();

app.use(json());
app.get("/health",(req: Request,res: Response) => {res.sendStatus(200)});

const port = process.env.PORT
app.listen(port , ()=> console.log("Server is up, on:", port))