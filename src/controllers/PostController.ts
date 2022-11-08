import Post from "../models/Post";
import { customResponse } from "../responses/ResponseMessage";

export default class PostController{
    public async create(req:any,res:any){
        try {
            await new Post(req.body).create()
            return res.reply(customResponse['POST_CREATE_SUCCESS'])
        } catch (error) {
            return res.reply(customResponse["POST_CREATE_ERROR"])
        }
    }
}