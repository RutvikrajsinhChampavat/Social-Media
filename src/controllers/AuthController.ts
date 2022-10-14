import { NextFunction, Request } from "express";
import bcryptjs from "bcryptjs";
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator
} from 'express-joi-validation'
import * as Joi from '@hapi/joi'
import User from "../models/User";
import {
  customResponse,
} from "../responses/ResponseMessage";
import { CustomResponse } from "../definitions/interface";
import 'joi-extract-type';



interface userRegisterRequestSchema extends ValidatedRequestSchema{
  [ContainerTypes.Body]:{
    userName:string;
    email:string;
    password:string
  }
}
interface userLoginRequestSchema extends ValidatedRequestSchema{
  [ContainerTypes.Body]:{
    email:string,
    password:string
  }
}

export default class AuthController {

  public async register(req: ValidatedRequest<userRegisterRequestSchema>, res: any): Promise<any> {
    try {
      const {success,code,message,data} = await new User(req.body).register()
      return res.reply({code,message},data)
    } catch (error) {
      console.log(error)
      res.reply(customResponse['SERVER_ERROR'])
    }
  }

  public async login(req: ValidatedRequest<userLoginRequestSchema>, res:any): Promise<any> {
    try {

     const {email,password} = req.body
      const {success,code,message,data} = await new User(req.body).login()
      return res.reply({code,message},data)
    } catch (error) {
      console.log(error)
      res.reply(customResponse['SERVER_ERROR'])
    }
  } 

  public async welcome(req:Request,res:any):Promise<any>{
    res.reply({code:200,message:`Welcome you have successfully logged in `})
  }
}
