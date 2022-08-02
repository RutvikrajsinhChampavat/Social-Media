import bcryptjs, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { Collection, Document, ObjectId, Db } from "mongodb";
import Database from "../db/Database";
import { User } from "../definitions/UserInterface";

dotenv.config();

class UserModel {
  private id: ObjectId;
  private userName: string;
  private email: string;
  private password: string;
  private avatar: string;
  private token: string;
  private gender: string;
  private bio: string;
  private status: string;
  private birthDate: string;

  constructor() {}

  public static encryptPassword(password: string) {
    return bcryptjs.hashSync(password, 10);
  }
  public async findOneByEmail(email: string) {
    const Db = await Database.getDb();
    return (await Db.collection("users").findOne({ email: email })) || null;
  }
  public async save() {
    const Db = await Database.getDb();
    if (this?.id) {
      let data = Object.keys(this)
        .filter((key) => {
          if (key != "id") return true;
        })
        .reduce((acc, key) => {
          return { ...acc, [key]: this[key] };
        }, {});
      return await Db.collection("users").updateOne(
        { _id: this.id },
        { $set: data }
      );
    }
    return await Db.collection("users").insertOne({
      ...this,
    });
  }
  public async loadByEmail(email: string) {
    const userData = await this.findOneByEmail(email);
    Object.keys(userData).map((key) => {
      if (key == "_id") return (this["id"] = userData[key]);
      this[key] = userData[key];
    });
  }

  public async register(obj: User) {
    this.userName = obj.userName;
    const existingUser = await this.findOneByEmail(obj.email);
    if (existingUser) throw new Error("User already exists !");
    this.email = obj.email;
    this.password = UserModel.encryptPassword(obj.password);
    const newUser = await this.save();
    return newUser;
  }

  public async singIn(obj: User) {
    await this.loadByEmail(obj.email);
    if (!Object.keys(this).length) throw new Error("user not found");
    if (!(await bcryptjs.compare(obj.password, this.password)))
      throw new Error("Incorrect login details");

    const token = jwt.sign({ email: this.email }, process.env.SECRET);
    this.token = token;
    await this.save();
    return token;
  }
}

export default UserModel;
