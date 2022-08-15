import { Request } from "express";
import bcryptjs from "bcryptjs";

import User from "../models/User";
import {
  CustomResponse,
  customResponseMessages,
} from "../responses/ResponseMessage";

export default class AuthController {
  public async register(req: Request, res: CustomResponse): Promise<any> {
    try {
      const user = new User();
      req.body.password = User.encryptPassword(req.body.password);
      if (await User.findOneByEmail(req.body.email))
        return res.reply({
          code: 409,
          message: "User already exists with email id",
        });
      if (!(await user.register(req.body)))
        res.reply({ code: 500, messge: "User register error. Try Again" });
      return res.reply(customResponseMessages["registerationSuccess"], user);
    } catch (error) {
      console.log(error);
      return res.reply({ code: 500, message: "Server error" });
    }
  }

  public async signIn(req: Request, res: CustomResponse): Promise<any> {
    try {
      const user = await User.findOneByEmail(req.body.email);
      if (!user)
        return res.reply({
          code: 409,
          message: "User not found",
        });
      if (!(await bcryptjs.compare(req.body.password, user.password)))
        return res.reply({ code: 403, message: "Incorrect login details" });
      const token = User.getToken({ email: req.body.email });
      if (!(await User.singIn(user, token)))
        return res.reply({
          code: 500,
          message: "User signIn error. Try Again",
        });
      return res.reply(customResponseMessages["loginSuccess"], { token });
    } catch (error) {
      console.log(error);
      return res.reply({ code: 500, message: "Server error" });
    }
  }
}
