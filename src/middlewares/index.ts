import Database from "../db/Database";
import { NextFunction, Request } from "express";
import * as Joi from '@hapi/joi'
import jwt from "jsonwebtoken";


import {
    customResponse,
  } from "../responses/ResponseMessage";
import { Helper } from "../Helper";

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

export const isAuthenticated = async(req:any,res:any,next:NextFunction)=>{
    try {
        const token = req.header('Authorization')?.replace('Bearer ','')
        if(!token) res.reply(customResponse["SERVER_ERROR"])
        if(!jwt.verify(token,process.env.SECRET)) return
        const user = await Database.db.collection('users').findOne({token})

        let userObj = Helper.getUser(user)
        console.log(userObj)
        if(user) req.user = user
        next()
    } catch (error) {
        next(error)
    }
}