import { Request } from "express";

import { UserModel } from "../models/UserModel";
import { CustomResponse } from "../Responses/ResponseMessage";

export default class AuthController {
  public async register(req: Request, res: CustomResponse): Promise<any> {
    try {
      const user = new UserModel(req.body);

      const newUser = await user.register();

      return res.reply(
        {
          code: 200,
          message: "Congratulations!! You have been registered successfully !",
        },
        newUser
      );
    } catch (error) {
      return res.reply({ code: 400, message: error.message }, {});
    }
  }

  public async signIn(req: Request, res: CustomResponse): Promise<any> {
    try {
      const user = new UserModel(req.body);

      const loginUser = await user.singIn();

      return res.reply(
        {
          code: 200,
          message: "Please Check your mail id for confimation code !",
        },
        loginUser
      );
    } catch (error) {
      return res.reply({ code: 400, message: error.message }, {});
    }
  }
}
