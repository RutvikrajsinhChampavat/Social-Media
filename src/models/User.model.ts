import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import user from "../Definitions/user.interface";
import { Db } from "mongodb";
import Database from "../Db";

dotenv.config();

export class User {
  sUserName: string;
  sName: string;
  sEmail: string;
  sMobile: number;
  sPassword: string;
  sAvatar: string;
  sToken: string;
  sGender: string;
  sBio: string;
  sStatus: string;
  sBirthDate: string;
  sConfirmationCode: string;
  db: Db;

  constructor(body: user) {
    this.sUserName = body.sUserName;
    //dcrpyt here

    this.sPassword = body.sPassword;
    this.sEmail = body.sEmail;
  }

  public async encryptPassword(password: string) {
    return await bcryptjs.hash(password, 10);
  }

  public async register() {
    const DB = await Database.getdb();

    if (this.sPassword) {
      this.sPassword = await this.encryptPassword(this.sPassword);
    }

    const existingUser = await DB.collection("user").findOne({
      $or: [{ sUserName: this.sUserName }, { sEmail: this.sEmail }],
    });

    if (!existingUser) {
      const newUser = await DB.collection("user").insertOne({
        sUserName: this.sUserName,
        sPassword: this.sPassword,
        sEmail: this.sEmail,
      });
      return newUser;
    } else {
      return "User already exists";
    }
  }

  public async singIn() {
    const DB = await Database.getdb();
    const existingUser = await DB.collection("user").findOne({
      sUserName: this.sUserName,
    });

    if (existingUser) {
      if (await bcryptjs.compare(this.sPassword, existingUser.sPassword)) {
        const token = jwt.sign({ sEmail: this.sEmail }, process.env.SECRET);

        existingUser.sToken = token;

        return existingUser;
      } else {
        return "Check password";
      }
    } else if (!existingUser) {
      return "user not found";
    } else {
      return "error";
    }
  }
}
