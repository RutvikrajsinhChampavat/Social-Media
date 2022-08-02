import { Request } from "express";

import User from "../models/User";
import {
  CustomResponse,
  customResponseMessages,
} from "../responses/ResponseMessage";

export default class AuthController {
  public async register(req: Request, res: CustomResponse): Promise<any> {
    try {
      const user = new User();
      const newUser = await user.register(req.body);
      return res.reply(customResponseMessages["registerationSuccess"], newUser);
    } catch (error) {
      return res.reply({ code: 400, message: error.message }, {});
    }
  }

  public async signIn(req: Request, res: CustomResponse): Promise<any> {
    try {
      const user = new User();
      const token = await user.singIn(req.body);

      return res.reply(customResponseMessages["loginSuccess"], { token });
    } catch (error) {
      return res.reply({ code: 400, message: error.message }, {});
    }
  }
}
