import express, { Application } from "express";
import dotenv from "dotenv"
import process from "process";
import memoryRoutes from "./routes/Memory"
import { connectDB } from "./helper/dbConnection";
const app:Application=express()
dotenv.config({
    path:"./config.env"
})
// Express Middlewares
app.use(express.json());
connectDB()
app.use(`/api`,memoryRoutes)
app.listen(process.env.PORT,()=>{
    console.log(`server is started 💨 on port ${process.env.PORT} `)
})

