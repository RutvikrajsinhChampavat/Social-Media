import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";

dotenv.config();

class Database {
  client: MongoClient | null = null;
  db: Db | null = null;

  async setDb() {
    this.client = await new MongoClient(process.env.DB_URL).connect();
    this.db = this.client.db(process.env.DB);
  }

  async getDb() {
    if (!this.db) await this.setDb();
    return this.db;
  }
}
export default new Database();
