import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../Definitions/UserInterface";
import { Db } from "mongodb";
import Database from "../Db/Db";

dotenv.config();

export class UserModel {
  //Check here
  userName: string;
  name: string;
  email: string;
  mobile: number;
  password: string;
  avatar: string;
  token: string;
  gender: string;
  bio: string;
  status: string;
  birthData: string;
  confirmationCode: string;
  db: Db;

  constructor(body: User) {
    this.userName = body.userName;
    this.password = body.password;
    this.email = body.email;
  }

  public async encryptPassword(password: string) {
    return await bcryptjs.hash(password, 10);
  }

  public async register() {
    const DB = await Database.getdb();

    if (this.password) {
      this.password = await this.encryptPassword(this.password);
    }

    const existingUser = await DB.collection("user").findOne({
      $or: [{ userName: this.userName }, { email: this.email }],
    });

    if (existingUser) throw new Error("User already exists !");

    const newUser = await DB.collection("user").insertOne({
      userName: this.userName,
      password: this.password,
      email: this.email,
    });
    return newUser;
  }

  public async singIn() {
    const DB = await Database.getdb();
    const existingUser = await DB.collection("user").findOne({
      $or: [{ userName: this.userName }, { email: this.email }],
    });

    if (existingUser) {
      if (await bcryptjs.compare(this.password, existingUser.password)) {
        const token = jwt.sign({ email: this.email }, process.env.SECRET);

        existingUser.sToken = token;

        return existingUser;
      } else {
        throw new Error("Incorrect  password !");
      }
    } else if (!existingUser) {
      throw new Error(
        "Sorry, we didn't find any account with that Email id/User Name !"
      );
    } else {
      throw new Error("Something went wrong while signing-in !");
    }
  }
}
