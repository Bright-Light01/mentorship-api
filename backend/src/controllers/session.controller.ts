import { Response, Request } from "express";
interface Session {
    id:string;
    mentorId:string;
    menteeId: string
    date:string;
    feedback:string;
    rating?:number;
}
let sessionStorage: Session[] = [];

export const createSession = (req:Request, res:Response) =>{
    const { mentorId, date } = req.body;
    const menteeId = (req as any).user.id;
    const newSession: Session = {
        id:Date.now().toString(),
        mentorId,
        menteeId,
        date,
        feedback: '',
        rating: 0
    };
    sessionStorage.push(newSession);
    res.status(201).json({ message: 'Session created', session: newSession });
};
export const getMentorSessions = (req:Request, res:Response) =>{
    const mentorId = (req as any).user.id;
    const mySessions = sessionStorage.filter(s =>
        s.mentorId === mentorId);
        res.json(mySessions);
};
export const getMenteeSessions = (req: Request, res: Response) =>{
    const menteeId = (req as any).user.id;
    const mySessions = sessionStorage.filter(s =>
        s.menteeId === menteeId)
        res.json(mySessions);
};
export const submitFeedback = (req: Request<{ id: string }, any, { feedback: string; rating: number }>, res: Response) => {
    const sessionId = req.params.id;
    const { feedback, rating } = req.body;
    const userId = (req as any).user.id;

    const session = sessionStorage.find(s => s.id === sessionId);
    if (!session)
        return
    res.status(404).json({ message: 'Session not found' });
    if  (session.menteeId !==userId)
        return
    res.status(403).json({  message: 'Only mentee can submit feedback' });
    session.feedback = feedback;
    session.rating = rating;
    res.json({ message: 'Feedback submitted', session }); 
};