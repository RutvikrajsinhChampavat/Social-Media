import { Response, Request } from "express";
import { User } from "../models/User.model";

export default class AuthController {
  public async register(req: Request, res: Response): Promise<any> {
    try {
      const user = new User(req.body);

      const newUser = await user.register();

      if (typeof newUser === "object") {
        return res.status(200).send({ data: newUser });
      } else {
        return res.status(400).send({ error: newUser });
      }
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }

  public async signIn(req: Request, res: Response): Promise<any> {
    try {
      const user = new User(req.body);

      const loginUser = await user.singIn();

      if (typeof loginUser === "object") {
        return res
          .status(200)
          .send({ message: "Successful login", data: loginUser });
      } else if (loginUser === "user not found") {
        return res.status(404).send({ error: loginUser });
      } else if (loginUser === "error") {
        return res.status(500).send({ error: loginUser });
      } else if (loginUser === "Check password") {
        return res.status(500).send({ error: loginUser });
      }
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
}
