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
  CustomResponse,
  customResponse,
} from "../responses/ResponseMessage";
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

  public async register(req: ValidatedRequest<userRegisterRequestSchema>, res: CustomResponse): Promise<any> {
    try {
      const {success,code,message,data} = await new User(req.body).register()
      if(!success) return res.reply({code,message},data)
      return res.reply(customResponse['REGISTER_SUCCESS'])
    } catch (error) {
      console.log(error)
      res.reply(customResponse[error.message]||customResponse['SERVER_ERROR'])
    }
  }

  public async login(req: ValidatedRequest<userLoginRequestSchema>, res: CustomResponse): Promise<any> {
    try {

     const {email,password} = req.body
      const {success,code,message,data} = await new User(req.body).login()
      if(!success) console.log('erre') //error
      return res.reply(customResponse['LOGIN_SUCCESS'],data)
    } catch (error) {
      console.log(error)
      res.reply(customResponse[error.message]||customResponse['SERVER_ERROR'])
    }
  } 

  public async welcome(req:Request,res:CustomResponse):Promise<any>{
    res.reply({code:200,message:`Welcome you have successfully logged in `})
  }
}
