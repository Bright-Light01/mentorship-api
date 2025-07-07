import { Request, Response  } from "express";
import { v4 as uuidv4 } from "uuid";

interface Message{
    id: string
    senderId: string
    receiverId: string
    content: string
    timestamp: Date;
}
const messages: Message[]=[];

//send a message
export const sendMessage = (req: Request, res: Response) =>{
    const{receiverId, content} = req.body;
    const senderId= (req as any).user.id;
    
    const message: Message={
        id: uuidv4(),
        senderId,
        receiverId,
        content,
        timestamp: new Date(),
    };
    messages.push(message);
    res.status(201).json({ message: 'Message sent', data: message });
};

    // view message for the logged-in user
export const getMessages= (req: Request, res: Response) => {
        const userId = (req as any).user.id;
        const userMessages = messages.filter(
            m=> m.senderId === userId || m.receiverId === userId
        );
        res.status(200).json({ messages: userMessages });
    };
