import { Request,Response } from "express";
import { ObjectId } from "mongodb";
import Comment from "../models/Comment";
import { customResponse } from "../responses/ResponseMessage";
export default class CommentController{
    public async add(req:Request,res:Response){
        try {
            const {parentId,message} = req.body
            const userId = req.user.Id
            const commentObj = {
                parentId:new ObjectId(parentId),
                message,
                userId
            }
            const insertedId = await new Comment(commentObj).add()
            if(!insertedId) throw new Error()
            return res.reply(customResponse['COMMENT_ADD_SUCCESS'])
        } catch (error) {
            return res.reply(customResponse["COMMENT_ADD_ERROR"])
        }
    }
    public async delete(req:Request,res:Response){
        try {
            const {commentId} = req.params
            await new Comment().setId(new ObjectId(commentId)).delete()
            return res.reply(customResponse["COMMENT_DELETE_SUCCESS"])
        } catch (error) {
            return res.reply(customResponse["COMMENT_DELETE_ERROR"])
        }
    }
}