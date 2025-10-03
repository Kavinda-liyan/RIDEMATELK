import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';

dotenv.config();
connectDB();
const app=express();
app.use(express.json());

app.get('/',(req,res)=>{

    res.send('Vehicle Recommender API is Running...');
});

app.use('/api/vehicles',vehicleRoutes);
app.use('/api/recommendations',recommendationRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});