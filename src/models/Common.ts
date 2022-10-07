import { Collection, Db, ObjectId } from "mongodb"
import Database from "../db/Database"
import { Helper } from "../Helper"

export abstract class Common{

    public _id:ObjectId | null | undefined = undefined
    public createdAt : Date | null | undefined = undefined
    public updatedAt : Date | null | undefined = undefined
}

