import { Db } from "mongodb";

export default class Collection{
    public static users:any
    public static init(db:Db|undefined){
        this.users = db?.collection('users') 
    }
}