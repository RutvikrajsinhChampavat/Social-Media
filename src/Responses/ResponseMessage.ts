import { Response } from "express";

export interface CustomResponse extends Response {
  reply(code: any, data?: any): any;
}

export const customResponseMessages = {
  loginSuccess: {
    code: 200,
    message: "Please Check your mail id for confimation code !",
  },
  registerationSuccess: {
    code: 200,
    message: "Congratulations!! You have been registered successfully !",
  },
};
