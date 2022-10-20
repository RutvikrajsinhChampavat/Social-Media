import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";
import Collection from './Collection'

dotenv.config();
class Database {

  public static db:Db
  public static count:number = 0

  static async init(){
      MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
        // this.count = this.count +1 //single connection
        // console.log(this.count)
        this.db = database?.db(process.env.DB)
        Collection.init(this.db)
      })
  }
}
export default Database;
