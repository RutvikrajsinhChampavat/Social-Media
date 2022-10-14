import bcryptjs from 'bcryptjs'
import User from './models/User'
export class Helper{
    public static shalowCopy(source:any,target:any){
        Object.keys(target).forEach((key)=>{
            if(source[key]!== undefined){
                target[key] = source[key]
            }
        })
        return target
    }
    public static hashPassword(password:string):string{
        return bcryptjs.hashSync(password,10)
    } 
    public static responseWrap(success:boolean,code:number=0,message:string='',data:any={}){
        return{ success:success,code:code,message:message,data:data }
    }
    public static getUser(user){
        //user type User model
        const _user = new User()
        Helper.shalowCopy(user,_user)
        return _user
    }
    public static comparePassword(password:string,hashPassword:string){
        return bcryptjs.compareSync(password,hashPassword)
    }
} 