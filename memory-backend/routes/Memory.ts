import { connectDB } from './../../helper/dbConnection';
import { Router } from "express";
import {getAllMemories} from "../controller/Memory/GetMemories"
 const memoryRoutes=Router()
connectDB()
memoryRoutes.route(`/memories`).get(getAllMemories)
export default memoryRoutes