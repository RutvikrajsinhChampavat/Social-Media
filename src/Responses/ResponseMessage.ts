import { Response } from "express";
type status = {
  code:number
  message:string
}
export interface CustomResponse extends Response {
  reply(status: status, data?: any,header?:any): any;
}

export const customResponse = {
  ['LOGIN_SUCCESS']: {
    code: 200,
    message: "Logged in successfully !",
  },
  ['REGISTER_SUCCESS']: {
    code: 200,
    message: "Congratulations!! You have been registered successfully !",
  },
  ['INVALID_LOGIN_DETAILS']:{
    code: 403,
    message: "Invalid login details"
  },
  ['USER_NOT_FOUND']:{
    code:409,
    message: "User not found"
  },
  ['SERVER_ERROR']:{ code: 500, message: "Server error" }
};
