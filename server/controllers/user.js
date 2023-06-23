
import bcrypt from "bcrypt"
import {User} from "../models/user.js";

export const register = async(req,res,next)=>{
    try{
        const {username,email,password} = req.body;
        const checkEmail = await User.findOne({email});
        if(checkEmail) return res.json({msg:"email already used",status:false});
        const hsp = await bcrypt.hash(password,10);
        const user = await User.create({username,email,password:hsp,})
        delete user.password;
        return res.json({status:true,user});
    } catch(e){next(e)}
      
}


export const login =  async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            console.log("user nhi mila")
            return res.json({msg:"email doesnot exist",status:false})     
        } 
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.json({msg:"password incorrect",status:false});
        } 
        delete user.password;
        return res.json({status:true,user});
    } catch(e){next(e);} 
}
export const success = (req, res) => { 
     
console.log("hogya")
    res.json({
        message:"success"
    })
  };     