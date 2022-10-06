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
import User from "../models/UserModel";
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
      const register = await User.register(req.body)
      if(!register) throw new Error()
      return res.reply(customResponse['REGISTER_SUCCESS']);
    } catch (error) {
      console.log(error)
      res.reply(customResponse[error.message]||customResponse['SERVER_ERROR'])
    }
  }

  public async login(req: ValidatedRequest<userLoginRequestSchema>, res: CustomResponse): Promise<any> {
    try {
      const loginRes = await User.login(req.body)
      res.reply(customResponse['LOGIN_SUCCESS'],loginRes)
    } catch (error) {
      console.log(error)
      res.reply(customResponse[error.message]||customResponse['SERVER_ERROR'])
    }
  } 

  public async welcome(req:Request,res:CustomResponse):Promise<any>{
    res.reply({code:200,message:`Welcome you have successfully logged in `})
  }
}
