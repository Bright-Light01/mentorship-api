import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

interface Feedback {
    id: string;
    menteeId: string;
    mentorId: string;
    comment: string;
    rating: number;
}

const feedbacks:Feedback[]=[]

//submit feedback
export const submitFeedback= (req:Request, res:Response)=>{
    const { mentorId, comment,rating}= req.body;
    const menteeId=(req as any).user.id;

    const newFeedback:Feedback={
        id: uuidv4(),
        menteeId,
        mentorId,
        comment,rating,
    };
    feedbacks.push(newFeedback);
    res.status(201).json({ message: 'Feedback submitted', feedback:newFeedback });
};

//Get all feedbacks for a mentor
export const getMentorFeedback = (req: Request, res: Response)=> {
    const mentorId = req.params.mentorId;

    const mentorFeedbacks = feedbacks.filter(fb => fb.mentorId === mentorId);
    res.status(200).json({ feedbacks: mentorFeedbacks });
};