import { request, Request, Response  } from "express";
import { v4 as uuidv4 } from 'uuid'
interface SessionRequest {
    id: string;
    menteeId: string;
    mentorId: string;
    status: 'pending'|'accepted'|'rejected';
}
const SessionRequest: SessionRequest[]=[];

export const requestSession= (req: Request, res: Response) =>{
    const{ mentorId }= req.body;
    const menteeId= (req as any).user.id;
    
    const newRequest: SessionRequest = {
        id: uuidv4(),
        mentorId,
        menteeId,
        status: 'pending'
    };
    SessionRequest.push(newRequest);
    res.status(201).json ({ message: 'Session request sent successfully', request: newRequest });
};
//mentor accepts/rejects a request
export const respondToRequest = (req: Request, res: Response) =>{
    const { id } = req.params;
    const { status } = req.body;

    const request = SessionRequest.find(r => r.id === id);
    if (!request) return
    res.status(404).json({ message: 'Request not found' });

    request.status = status;
    res.status(404).json({ message: 'Request ${status}', request });
};