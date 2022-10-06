import Database from "../db/Database";
import { NextFunction, Request } from "express";
import * as Joi from '@hapi/joi'
import jwt from "jsonwebtoken";



import {
    CustomResponse,
    customResponse,
  } from "../responses/ResponseMessage";
 export const userExists= async(req:Request,res:CustomResponse,next:NextFunction)=>{
    try {
        const query = {$or:[]}
        if(req.body?.userName) query.$or.push({userName:req.body.userName})
        if(req.body?.email) query.$or.push({email:req.body.email})
        const db = await Database.getInstance()
        const user  = await db.collection('users').findOne(query)
        console.log(user)
        if(user) return res.reply({
                code: 409,
                message: "User already exists",
              })
        return next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const validator = (schema) =>{
    return (req:Request,res:CustomResponse,next:NextFunction)=>{
        try {
            const {error,value} = schema.validate(req.body)
            if(error===undefined) return next()
            throw new Error(error.details.map(err=>err.message))
        } catch (error) {
            next(error)  
        }
    }
}

export const isAuthenticated = async(req:Request,res:CustomResponse,next:NextFunction)=>{
    try {
        const token = req.header('Authorization')?.replace('Bearer ','')
        if(!token) res.reply(customResponse["SERVER_ERROR"])
        if(!jwt.verify(token,process.env.SECRET)) return
        const db = await Database.getInstance()
        const user = await db.collection('users').findOne({token})
        // if(user) req.user = user  need to create custom respose also
        next()
    } catch (error) {
        next(error)
    }
}