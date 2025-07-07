import { Request, Response } from "express";

export const getProfile = (req: Request, res: Response) => {
    const user = req.user; 
    // 'req.user' is set by the 'authenticate' middleware
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized'});
    }
    res.status(200).json ({ message: 'Profile fetched Succesfully', user,
    });
};