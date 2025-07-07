import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};