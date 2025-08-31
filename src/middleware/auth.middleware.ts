import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request{
    user?:any;
}

export const verifyToken = (req:AuthRequest,res:Response, next:NextFunction)=>{
//    console.log("Verifying token")
    const token = req.headers.authorization?.split(" ")[1];
//    console.log("Token is :"+token);
    if(!token) return res.status(403).json({message:"No token present in the header!!"});

    try{
    //    console.log("Verifying token");
        const decoded = jwt.verify(token,process.env.JWT_SECRET!);
   //     console.log("Token verified: "+decoded);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid token"});
    }
}

export const authorizeForRole = (...roles:string[])=>{
    return (req:AuthRequest,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Forbidden: Not authorised"});
        }
        next();
    };
};