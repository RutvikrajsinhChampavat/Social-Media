import { NextFunction, Request } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/User";
import Collections from "../db/Collections";
import { customResponse } from "../responses/ResponseMessage";



interface loginParams{
  email:string,
  password:string
}
interface registerParams{
  email:string,
  password:string,
  userName:string
}
type loginRequest = Request&{body:loginParams}
type registerRequest = Request&{body:registerParams}

export default class AuthController {

  public async register(req: registerRequest, res: any): Promise<any> {
    try {
      let {email,password,userName} = req.body
      const userNameExists = await Collections.users.findOne({userName}) 
      const userEmailExists = await Collections.users.findOne({email})   
      if(userNameExists) return res.reply({code:400,message:'User name taken.'})
      if(userEmailExists) return res.reply({code:400,message:'User already exists.'})
      password = bcryptjs.hashSync(password,10)
      await Collections.users.insertOne({email,userName,password,createdAt:new Date()})
      return res.reply(customResponse['REGISTER_SUCCESS'])
    } catch (error) {
      console.log(error)
      res.reply(customResponse['REGISTER_ERROR'])
    }
  }

  public async login(req:loginRequest,res:any): Promise<any> {
    try {
      const {email,password} = req.body
      const data = await Collections.users.findOne({email})
      if(!data || !bcryptjs.compareSync(password,data.password)) return res.reply(customResponse['INVALID_USER_CRED']) 
      const user = new User(data)
      await user.login()
      res.reply(customResponse['LOGIN_SUCCESS'],user)
    } catch (error) {
      res.reply(customResponse['LOGIN_ERROR'])
    }
  }
  
  public async logout(req:any,res:any):Promise<any>{
    try {
      await req.user.logout()
      res.reply({code:200,message:"Logged out successfully"})
    } catch (error) {
      res.reply()
    }
  }

}
