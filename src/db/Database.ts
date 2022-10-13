import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";

dotenv.config();
class Database {

  public static db:Db
  public static count:number = 0

  static async init(){
      MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
        console.log('error',err)
        this.count = this.count +1
        console.log(this.count)
        this.db = database?.db(process.env.DB)
      })
  }
}
export default Database;
