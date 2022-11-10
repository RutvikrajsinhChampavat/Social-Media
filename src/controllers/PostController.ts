import Post from "../models/Post";
import { customResponse } from "../responses/ResponseMessage";
import { Response,Request } from "express";
import { ObjectId } from "mongodb";

export default class PostController{
    public async create(req:any,res:any){
        try {
            let userID = req.user.id
            let {title,body,company,tags} = req.body
            const obj = {
                title,
                body,
                company,
                tags,
                userID
            }
            await new Post(req.body).create()
            return res.reply(customResponse['POST_CREATE_SUCCESS'])
        } catch (error) {
            return res.reply(customResponse["POST_CREATE_ERROR"])
        }
    }

    public async edit(req:any,res:any){
        try {
            const {id} = req.params
            const post = new Post().setId(new ObjectId(id))
            await post.edit(req.body)
            return res.reply(customResponse["POST_EDIT_SUCCESS"])
        } catch (error) {
            return res.reply(customResponse["POST_EDIT_ERROR"])
        }
    }

    public async delete(req:any,res:any){
        try {
            let {id} = req.params
            await new Post().setId(new ObjectId(id)).delete()
            return res.reply(customResponse["POST_DELETE_SUCCESS"])
        } catch (error) {
            return res.reply(customResponse["POST_DELETE_ERROR"])
        }
    }
}