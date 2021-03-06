import { removeBookmark } from './../controller/Memory/removeBookmark'
import { unLikeMemory } from './../controller/Memory/UnLikeMemory'
import { likeMemory } from './../controller/Memory/LikeMemory'
import { getAllPrivateMemories } from './../controller/Memory/GetPrivateMemories'
import { protect } from './../controller/Authentication/auth'
import { Router } from 'express'
import { updateMemory } from './../controller/Memory/UpdateMemory'
import { getMemory } from './../controller/Memory/GetMemory'
import { createMemory } from './../controller/Memory/CreateMemory'
import { getAllMemories } from '../controller/Memory/GetMemories'
import { deleteMemory } from '../controller/Memory/DeleteMemory'
import { getMemoryByTag } from '../controller/Memory/GetMemoryByTags'
import { searchMemory } from '../controller/Memory/SearchMemory'
import { addBookmark } from '../controller/Memory/bookmark'
const memoryRoutes = Router()
memoryRoutes.route(`/memories`).get(protect, getAllMemories)
memoryRoutes.route(`/private-memories`).get(protect, getAllPrivateMemories)
memoryRoutes.get(`/memories/:id`, protect, getMemory)
memoryRoutes.get(`/search-memories`, protect, searchMemory)
memoryRoutes.get(`/memories-by-tag`, getMemoryByTag)
memoryRoutes.patch(`/update-memory/:id`, updateMemory)
memoryRoutes.post(`/create-memory`, protect, createMemory)
memoryRoutes.post(`/like-memory`, protect, likeMemory)
memoryRoutes.post(`/un-like-memory`, protect, unLikeMemory)
memoryRoutes.post(`/addbookmark-memory`, protect, addBookmark)
memoryRoutes.post(`/removeBookmark-memory`, protect, removeBookmark)
memoryRoutes.delete(`/delete-memory/:id`, deleteMemory)
export default memoryRoutes
