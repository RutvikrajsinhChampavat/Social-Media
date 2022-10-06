import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";

dotenv.config();
// singleton class pattern
class Database {

  private static _instance:MongoClient

  static async getInstance():Promise<Db>{
    if(!this._instance){
      this._instance = await new MongoClient(process.env.DB_URL).connect()
    } 
    return this._instance.db(process.env.DB)
  }
}
export default Database;
