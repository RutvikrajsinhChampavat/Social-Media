import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { Helper } from "../Helper";
import { Common } from "./Common";
import Database from "../db/Database";
import Collection from "../db/Collection";

export default class User extends Common{
    private userName:string|null|undefined
    private name:string
    private avatar:string
    private token:string
    private status:string
    private email:string
    private password: string
    private posts!:Array<any>
    constructor(obj:any){
        super()
        this._id = obj._id
        this.email = obj.email 
        this.userName = obj.userName 
        this.password = obj.password
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }
    public async login(){
        try {
            this.token = jwt.sign({ sub:this.email},'secret',{expiresIn:'24h'})
            await Collection.users.updateOne({_id:this._id},{$set:{token:this.token}})
            return this
        } catch (error) {
            throw new Error('Login error.')
        }
    }
    public async logout(){
        try {
            this.token = ''
            await Collection.users.updateOne({_id:this._id},{$set:{token:this.token}})
            return this
        } catch (error) {
            throw new Error('Logout error.')
        }
    }
}