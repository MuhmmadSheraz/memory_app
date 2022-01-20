import { updateMemory } from './../controller/Memory/UpdateMemory';
    import { getMemory } from './../controller/Memory/GetMemory';
    import { createMemory } from './../controller/Memory/CreateMemory';
    import { Router } from "express";
    import {getAllMemories} from "../controller/Memory/GetMemories"
    import { deleteMemory } from '../controller/Memory/DeleteMemory';
    const memoryRoutes=Router()
    memoryRoutes.route(`/memories`).get(getAllMemories)
    memoryRoutes.get(`/memories/:id`,getMemory)
    memoryRoutes.patch(`/update-memory/:id`,updateMemory)
    memoryRoutes.post(`/create-memory`,createMemory)
    memoryRoutes.delete(`/delete-memory/:id`,deleteMemory)
    export default memoryRoutes