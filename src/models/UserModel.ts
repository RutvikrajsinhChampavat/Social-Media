import { Collection, Db, ObjectId, WithId } from "mongodb";
import Database from "../db/Database";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { Collection } from "mongoose";
import User from "../definitions/UserInterface"


type UserLogin={
  email:string,
  password:string
}
class UserModelImpl {
  private db:typeof Database
  constructor(db:typeof Database){
    this.db = db
  }
  public async register(user:User):Promise<any>{
      const db = await this.db.getInstance()
      user.password = bcryptjs.hashSync(user.password, 10)
      return await db.collection('users').insertOne(user)
  }
  public async login(body:UserLogin):Promise<{token:string}|Error>{     
      const db = await this.db.getInstance()
      const user = await db.collection('users').findOne({email:body.email})
      if(!user) throw new Error("USER_NOT_FOUND")
      if (!(await bcryptjs.compare(body.password, user.password))) throw new Error("INVALID_LOGIN_DETAILS");
      const token = jwt.sign({email:body.email}, process.env.SECRET);
      const updatedUser = await db.collection('users').updateOne({ _id: user._id },
        { $set: { token } })
      if(!updatedUser) throw new Error('unable to update user')
      return {token}
  }
}

export default new UserModelImpl(Database)
