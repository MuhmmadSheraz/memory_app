import express, { Application } from "express";
import dotenv from "dotenv"
import process from "process";
const app:Application=express()
dotenv.config({
    path:"./config.env"
})
// Express Middlewares
app.use(express.json)

const port:string=process.env.PORT||"3001"
app.listen(port,()=>{
    console.log(`server is started 💨 on port ${port} `)
})

