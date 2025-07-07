import { NextFunction, Request, Response } from 'express';
import { users } from '../models/user.models';

export const getAllUsers = (req: Request, res: Response)=> {
    res.status(200).json({ users });
};

export const updateUserRole = (req: Request, res: Response, next: NextFunction): void => {
    const userId = req.params.id;
    const { role } = req.body;
    const user = users.find(u => u.id === userId);
    if (!user){
        res.status(404).json({ message: 'User not found' });
        return;
}
user.role = role;
res.status(200).json({ message: 'User role updated' });
};