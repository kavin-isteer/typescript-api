import { Role, User } from "../models";
import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import {generateToken} from "../utils/jwtUtil";

export const register = async (req:Request,res:Response)=>{
    const {username,password,role} = req.body;

    const existingUser = await User.findOne({where:{username}});
    if(existingUser) return res.status(400).json({message:"User already exists"});

    const hashedPassword = await bcrypt.hash(password,10);
    const userRole = await Role.findOne({where:{name:role}});

    if (!userRole) return res.status(400).json({ message: 'Invalid role' });

    const user = await User.create({username,password:hashedPassword,roleId:userRole.id});
    res.status(201).json({message:"User registered successfully!!",user:{
        id:user.id,
        username:user.username
    }});
}

export const login= async (request:Request,res:Response)=>{
    const {username,password} = request.body;
    const user = await User.findOne({where:{username},include:Role});
    if(!user || !bcrypt.compare(password,user.password)){
        res.status(401).json("Invalid Credentials!!");

    }

    const token = generateToken(user);
    res.json({token})
}