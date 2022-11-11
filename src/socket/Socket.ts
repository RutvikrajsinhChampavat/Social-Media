import { Server } from "socket.io"
import RedisProvider from "../db/Redis";

export default class Socket{
    public static io

    public static init(server){
        this.io = new Server(server,{cors: {
            origin: "http://localhost:3000",
            credentials: true
        }})
        this.io.on("connection",(socket)=>{
            socket.on('like',async(postId,callback)=>{
                const count = await RedisProvider.client.zincrby('likes',1,postId)
                console.log(count)
                callback(count)
            })
        })
    }
}