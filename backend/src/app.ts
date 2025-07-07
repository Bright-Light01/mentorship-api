import express, { Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState, FormEvent } from 'react';
import api from './app';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/auth.routes'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api/auth', authRoutes)

app.use((req: Request, res: Response)=>{
    res.status(404).json({ message: 'Not Found' });
});

app.use((err:Error, req: Request, res: Response, next: NextFunction)=>{
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.get('/', (req, res) => {
    res.send ('API is running...');
});

export default app;