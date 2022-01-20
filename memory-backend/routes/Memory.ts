import { createMemory } from './../controller/Memory/CreateMemory';
import { connectDB } from './../../helper/dbConnection';
import { Router } from "express";
import {getAllMemories} from "../controller/Memory/GetMemories"
 const memoryRoutes=Router()
connectDB()
memoryRoutes.route(`/memories`).get(getAllMemories)
memoryRoutes.post(`/create-memory`,createMemory)
export default memoryRoutes