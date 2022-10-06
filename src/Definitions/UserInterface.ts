import { Document, ObjectId, WithId } from "mongodb";

export default interface User {
  _id?:ObjectId
  userName: string;
  name?: string;
  email: string;
  mobile?: number;
  password: string;
  avatar?: string;
  token?: string;
  gender?: string;
  bio?: string;
  status?: string;
  birthData?: string;
  confirmationCode?: string;
}
