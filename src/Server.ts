import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes";
import { Response } from "express";
import Database from './db/Database'

type status = {
  code:number
  message:string
}
export interface CustomResponse extends Response {
  reply(status: status, data?: any,header?:any): any;
}
// import { CustomResponse } from "./responses/ResponseMessage";

const app = express();
dotenv.config();
Database.init()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use('/',async (req,res)=>{
//   console.log( await Database.db.collection('users').insertOne({name:'tarak'}))
// })
app.use((_req, res: CustomResponse, next) => {
  res.reply = ({ code, message }, data = {}, header = undefined) => {
    res.status(code).header(header).json({ message, data });
  };
  next();
});
app.use((req,res,next)=>{
  console.log(`${req.method} url::${req.url}`)
  next()
})
app.use("/api/v1/auth", authRoutes);
//  app.use((err,req,res,next)=>{
//   res.reply({code:500,message:err.message})
//  })

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
