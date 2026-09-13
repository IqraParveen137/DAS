import express from 'express';
import testRoutes from './routes/testRoutes.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import 'colors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import webMessageRoutes from './routes/webMessageRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
//conig env var
dotenv.config();
//database
connectDB();
//rest object
const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/webMessage', webMessageRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/appointment', appointmentRoutes);
app.get('/', (req, res) => {
  res.send('<h1>Node Server is Renning</h1>');
});
//port
const PORT = process.env.PORT || 5000;
//run server
app.listen(PORT, () => {
  console.log(
    `Node Server is Running ${process.env.NODE_ENV} Mode on Port ${PORT}`.bgCyan
      .white,
  );
});
