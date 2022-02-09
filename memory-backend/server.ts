import express, { Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import cors from "cors"
import process from 'process';
import memoryRoutes from './routes/Memory';
import { connectDB } from './helper/dbConnection';
import authRoutes from './routes/Auth';
const app: Application = express();
dotenv.config({
  path: './config.env'
});
// Express Middlewares
app.use(express.json());
app.use(cors({origin:true,credentials: true}))
connectDB();
app.use(`/api`, memoryRoutes);
app.use(`/api`, authRoutes);
app.use(cookieParser());
app.listen(process.env.PORT, () => {
  console.log(`server is started 💨 on port ${process.env.PORT} `);
});
