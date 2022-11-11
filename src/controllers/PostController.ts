import Post from "../models/Post";
import { customResponse } from "../responses/ResponseMessage";
import { Response,Request } from "express";
import { ObjectId } from "mongodb";

export default class PostController{
    public async create(req:Request,res:Response){
        try {
            let userId = req.user.Id
            let userName = req.user.UserName
            let {title,body,company,tags} = req.body
            const obj = {
                title,
                body,
                company,
                tags,
                userId,
                userName
            }
            await new Post(obj).create()
            return res.reply(customResponse['POST_CREATE_SUCCESS'])
        } catch (error) {
            return res.reply(customResponse["POST_CREATE_ERROR"])
        }
    }

    public async edit(req:Request,res:Response){
        try {
            const {id} = req.params
            const post = new Post().setId(new ObjectId(id))
            await post.edit(req.body)
            return res.reply(customResponse["POST_EDIT_SUCCESS"])
        } catch (error) {
            return res.reply(customResponse["POST_EDIT_ERROR"])
        }
    }

    public async delete(req:Request,res:Response){
        try {
            const {id} = req.params
            await new Post().setId(new ObjectId(id)).setUserId(req.user.Id).delete()
            return res.reply(customResponse["POST_DELETE_SUCCESS"])
        } catch (error) {
            return res.reply(customResponse["POST_DELETE_ERROR"])
        }
    }

    public async getPost(){

    }

    public async getPosts(req:Request,res:Response){
        let {} = req.body
    }
}