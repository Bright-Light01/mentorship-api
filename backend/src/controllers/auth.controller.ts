import { Request, Response } from "express";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user= { id: '1234', email }
    const token= generateToken({ id: '1234', email });
        // Registration logic here
        res.status(201).json({ message: "User registered with email : email", token, });
};
export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    // Login logic here
    res.status(200).json({ message: "User logged in as: {email}" });
};
export const profileController= (req:Request, res:Response) => {
    const user = req.user;
    res.status(200).json({ user });
    console.log('Token verified');
};