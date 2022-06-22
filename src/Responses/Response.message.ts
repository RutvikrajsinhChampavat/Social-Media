import { Response } from "express";

export interface CustomResponse extends Response {
  reply(code: any, data: any): any;
}
