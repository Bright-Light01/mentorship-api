import express from 'express';
import cors from 'cors';
import profileRoutes from './routes/profile.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', profileRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;
