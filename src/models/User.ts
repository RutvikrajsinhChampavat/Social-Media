import bcryptjs, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { Collection, Document, ObjectId, Db } from "mongodb";
import Database from "../db/Database";
import { User } from "../definitions/UserInterface";
import { textChangeRangeIsUnchanged } from "typescript";

dotenv.config();

interface register {
  password: string;
  userName: string;
  email: string;
}
class UserModel {
  private _id: ObjectId;
  private userName: string;
  private email: string;
  private password: string;
  private avatar: string = "";
  private token: string = "";
  private gender: string = "";
  private bio: string = "";
  private status: string = "";
  private birthDate: string = "";
  private createdAt: Date = null;
  private updatedAt: Date = null;
  constructor() {}

  public static encryptPassword(password: string) {
    return bcryptjs.hashSync(password, 10);
  }
  public static async findOneByEmail(email: string) {
    const Db = await Database.getDb();
    return (await Db.collection("users").findOne({ email: email })) || null;
  }
  public static getToken(input: object) {
    return jwt.sign(input, process.env.SECRET);
  }

  public async register(obj: register) {
    const Db = await Database.getDb();
    const createdAt = new Date();
    delete this._id;
    const insertObj = {
      ...this,
      userName: obj.userName,
      email: obj.email,
      password: obj.password,
      createdAt,
    };
    try {
      const { insertedId, acknowledged } = await Db.collection(
        "users"
      ).insertOne(insertObj);
      if (!acknowledged) return false;
      this._id = insertedId;
      this.email = obj.email;
      this.password = obj.password;
      this.userName = obj.userName;
      this.createdAt = createdAt;
    } catch (error) {
      return false;
    }
    return true;
  }

  public static async singIn(user: any, token: string) {
    try {
      const Db = await Database.getDb();
      const {
        acknowledged,
        modifiedCount,
        upsertedCount,
        upsertedId,
        matchedCount,
      } = await Db.collection("users").updateOne(
        { _id: user._id },
        { $set: { token: token } }
      );
      if (!acknowledged) return false;
    } catch (error) {
      return false;
    }
    return true;
  }
}

export default UserModel;
