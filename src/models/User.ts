import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { Helper } from "../Helper";
import { Common } from "./Common";
import Database from "../db/Database";
import { response } from "express";

export default class User extends Common{
    public userName: string | null | undefined = undefined;
    public name: string | null | undefined = undefined;
    public email: string | null | undefined = undefined;
    public mobile: number | null | undefined = undefined;
    public password: string | null | undefined = undefined;
    public avatar: string | null | undefined = undefined;
    public token: string | null | undefined = undefined;
    public gender: string | null | undefined = undefined;
    public bio: string | null | undefined = undefined;
    public status: string | null | undefined = undefined;
    public birthDate: string | null | undefined = undefined;
    public collection: any = Database.db?.collection('users')

    constructor(userObj?:any){
        super()
        if(userObj){
            Helper.shalowCopy(userObj,this)
        }
    }

    public static createToken(user:User):string{
        try {
            delete user.collection
            return  jwt.sign({ sub:user.userName, user},process.env.SECRET,{ expiresIn:process.env.EXPIRESIN})
        } catch (error) {
            console.log(error)
        }
    }

    public static verifyToken(token:any){
        try {
            const varifiedToken = jwt.verify(token,process.env.SECRET)
            return Helper.responseWrap(true,0,'',varifiedToken)
        } catch (error) {
            return Helper.responseWrap(false,400)
        }
    }
    
    public async register(){
        try {
            let {userName,email,password} = this
            this.createdAt = new Date()
            password = Helper.hashPassword(password)
            const user = await this.collection.findOne({email:this.email})
            if(user) return Helper.responseWrap(false,403,'User already exists with this email.')
            const registeredUser = await this.collection.insertOne({userName,email,password,createdAt:this.createdAt})
            if(!registeredUser) throw new Error()
            return Helper.responseWrap(true,200,'Registered Successfully.')
        } catch (error) {
            return Helper.responseWrap(false,400,'Server Error.')
        }
    }

    public async login(){
        try {
           const {email,password} = this
            const userRes = await this.collection.findOne({email})
            if(!userRes) return Helper.responseWrap(false,404,"Sorry, we didn't find any account with that Email id")
            if(!Helper.comparePassword(password,userRes.password)) return Helper.responseWrap(false,401,'Incorrect login details.')
            delete userRes.token
            const user = Helper.getUser(userRes)
            const token = User.createToken(user)
            const updatedUser = await this.collection.updateOne({_id:user._id},{$set:{token}})
            if(!updatedUser) throw new Error()
            return Helper.responseWrap(true,200,'Logged in Successfully.',{token})

        } catch (error) {
            return Helper.responseWrap(false,400,'Server Error.')
        }
    }
}