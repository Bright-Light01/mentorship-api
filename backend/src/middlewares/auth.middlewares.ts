import { Request, Response, NextFunction } from 'express';
import { Jwt, JwtPayload } from 'jsonwebtoken';
import { decode } from 'punycode';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

interface jwtPayload {
    userId: string;
    email: string;
}

export const authenticate = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) 
        return 
    res.status(401).json({ message: 'Invalid' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return
        res.status(401).json({ message: 'Invalid' });
    }
};
export const authorize = (role: string) => (
    req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).user;
        if (user?.role!==role) {
            res.status(403).json({ message: 'Access denied' });
            return
        }
        next ();
    };
    
export default authenticate; authorize;