import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";

dotenv.config();

class Database {
  client: any;
  constructor() {
    this.client = new MongoClient(process.env.DB_URLi);
  }

  async getdb() {
    const dbClient: MongoClient = await this.client.connect();
    const db: Db = dbClient.db("userData");
    return db;
  }
}
export default new Database();
