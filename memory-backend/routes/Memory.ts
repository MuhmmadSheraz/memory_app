import { protect } from './../controller/Authentication/auth';
import { Router } from 'express';
import { updateMemory } from './../controller/Memory/UpdateMemory';
import { getMemory } from './../controller/Memory/GetMemory';
import { createMemory } from './../controller/Memory/CreateMemory';
import { getAllMemories } from '../controller/Memory/GetMemories';
import { deleteMemory } from '../controller/Memory/DeleteMemory';
import { getMemoryByTag } from '../controller/Memory/GetMemoryByTags';
const memoryRoutes = Router();
memoryRoutes.route(`/memories`).get(protect, getAllMemories);
memoryRoutes.get(`/memories/:id`, protect,getMemory);
memoryRoutes.get(`/memories-by-tag`, getMemoryByTag);
memoryRoutes.patch(`/update-memory/:id`, updateMemory);
memoryRoutes.post(`/create-memory`, protect,createMemory);
memoryRoutes.delete(`/delete-memory/:id`, deleteMemory);
export default memoryRoutes;
