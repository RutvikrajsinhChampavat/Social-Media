import { Db } from "mongodb";

class Collection{
    private db:Db
    private collectionName
    constructor(name){
        this.collectionName = name
    }
    public async findOne(){
        await this.db.collection(this.collectionName).findOne()
    }
    public async insertOne(doc,options?){
        let createdAt = new Date()
        doc = {...doc,createdAt}
        return await this.db.collection(this.collectionName).insertOne(doc,options)
    }   

}