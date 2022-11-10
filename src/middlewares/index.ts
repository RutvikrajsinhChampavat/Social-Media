import Database from "../db/Database";
import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import {
    customResponse,
  } from "../responses/ResponseMessage";
import User from "../models/User";



export const validator = (schema) =>{
    return (req:Request,res:any,next:NextFunction)=>{
        try {
            const {error,value} = schema.validate(req.body)
            if(error===undefined) return next()
            throw new Error(error.details.map(err=>err.message))
        } catch (error) {
            next(error)  
        }
    }
}

export const isAuthenticated = async(req:Request,res:any,next:NextFunction)=>{
    try {
        const token = req.header('Authorization')?.replace('Bearer ','')
        if(!token) return res.reply(customResponse['TOKEN_REQUIRED'])
        let payload = jwt.verify(token,process.env.SECRET)
        if(!payload) return res.reply({})
        const user = await Database.db.collection('users').findOne({$and:[{email:payload.sub},{token}]})
        if(!user) return res.reply({}) 
        req.user = new User(user)
        next()
    } catch (error) {
        next(error)
    }
}