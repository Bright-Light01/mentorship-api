import App from './app';
import express from 'express';
import profilRoutes from './routes/profile.routes'

const app = express();

app.use('/api', profilRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});