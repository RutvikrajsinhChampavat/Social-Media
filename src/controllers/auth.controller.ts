import { Response, Request } from "express";
import { User } from "../models/User.model";
import { CustomResponse } from "../Responses/Response.message";

export default class AuthController {
  public async register(req: Request, res: CustomResponse): Promise<any> {
    try {
      const user = new User(req.body);

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
      const user = new User(req.body);

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
