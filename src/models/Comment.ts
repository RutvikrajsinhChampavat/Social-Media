import { ObjectId } from "mongodb";
import Collections from "../db/Collections";
import RedisProvider from "../db/Redis";
import { Common } from "./Common";

export default class Comment extends Common{
    private parentId:ObjectId
    private message:string
    private userId:ObjectId

    constructor()
    constructor(obj:any)
    constructor(obj?:any){
        super()
        this.message = obj?.message
        this.parentId = obj?.parentId
        this.userId = obj?.userId
    }
    setId(id:ObjectId){
        this._id = id
        return this
    }
    async add(){
        try {
            const {insertedId} = await Collections.comments.insertOne({parentId:this.parentId,message:this.message,userId:this.userId,createdAt:new Date()})
            await RedisProvider.client.zincrby('comments',1,String(this.parentId))
            return insertedId
        } catch (error) {
            throw new Error(error)
        }
    }

    async delete(){
        try {
            await Collections.comments.deleteOne({_id:this._id})
            await RedisProvider.client.zincrby('comments',-1,String(this.parentId))
        } catch (error) {
            throw new Error(error)
        }
    }
}