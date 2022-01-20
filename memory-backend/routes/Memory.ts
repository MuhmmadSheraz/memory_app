import { getMemory } from './../controller/Memory/GetMemory';
import { createMemory } from './../controller/Memory/CreateMemory';
import { connectDB } from './../../helper/dbConnection';
import { Router } from "express";
import {getAllMemories} from "../controller/Memory/GetMemories"
 const memoryRoutes=Router()
connectDB()
memoryRoutes.route(`/memories`).get(getAllMemories)
memoryRoutes.get(`/memories/:id`,getMemory)
memoryRoutes.post(`/create-memory`,createMemory)
export default memoryRoutes