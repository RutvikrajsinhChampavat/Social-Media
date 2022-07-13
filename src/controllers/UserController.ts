import { Response, Request } from "express";
import { UserModel } from "../models/UserModel";

export default class UserController {
  public async userList(req: Request, res: Response): Promise<any> {
    try {
      const user = new UserModel(req.body);
      const userList = await user.singIn();

      return res
        .status(200)
        .send({ message: "Fetched users ", data: userList });
    } catch (error) {
      res.status(400).send({ message: "Error" });
    }
  }
}
