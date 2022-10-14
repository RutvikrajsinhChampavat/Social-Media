import User from '../models/User'

export interface CustomRequest extends Request{
    user:User
}
type status = {
    code:number
    message:string
  }
  export interface CustomResponse extends Response {
    reply(status: status, data?: any,header?:any): any;
  }