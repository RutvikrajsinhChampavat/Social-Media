import { Common } from "./Common";
import { Collection, Db, ObjectId } from "mongodb"
import { Helper } from "../Helper";
import Collections from "../db/Collections";
import RedisProvider from "../db/Redis";

export default class Post extends Common{
    private title:string|null|undefined
    private slug:string
    private body:string
    private userId:ObjectId|null|undefined
    private company:string
    private tags:[string]
    private userName:string

    constructor();
    constructor(obj:any);
    constructor(obj?:any){
        super()
        this._id = obj?._id
        this.body = obj?.title 
        this.title = obj?.body
        this.userId = obj?.userId
        this.company = obj?.company
        this.tags = obj?.tags
        this.userName = obj?.userName
    }

    setId(id:ObjectId){
        this._id = id
        return this
    }
    setUserId(id:ObjectId){
        this.userId = id
        return this
    }

    async create(){
        let slug = Helper.slugify(this.title)
        let insetObj ={
            body:this.body,
            title:this.title,
            userId:this.userId,
            userName:this.userName,
            company:this.company,
            tags:this.tags ,
            slug
        }
        try {
            const {insertedId} = await Collections.post.insertOne(insetObj)
            await RedisProvider.client.zadd("likes",0,insertedId)
            await RedisProvider.client.zadd("comments",0,insertedId)
        } catch (error) {
            throw new Error('Post create error.')
        }
    }
    

    async edit(obj:any){
        let updatedAt = new Date()
        obj = {
            ...obj,
            updatedAt
        }
        try {
            await Collections.post.updateOne({_id:this._id},obj)
        } catch (error) {
            throw new Error()
        }
    }

    async delete(){
        try {
            console.log(this.userId,this._id)
            await Collections.post.deleteOne({_id:this._id,userId:this.userId})
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

}
