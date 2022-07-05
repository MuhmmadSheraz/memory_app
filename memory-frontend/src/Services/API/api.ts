import { CreateMemoryBody, LikeMemoryBody, Memory } from './../../Types/Memory'
import { SignInUser, SignUpUser } from './../../Types/Auth'
import Instance from './Instance'

// Authentication
const onSignUp = async (body: SignUpUser) => {
  return await Instance({
    method: 'POST',
    url: '/api/users/sign-up',
    data: body,
  })
}
const onSignIn = async (body: SignInUser) => {
  return await Instance({
    method: 'POST',
    url: '/api/users/sign-in',
    data: body,
    withCredentials: true,
  })
}
// Memories
const getMemories = async () => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)

  return await Instance({
    method: 'GET',
    url: '/api/memories',
    withCredentials: true,
    headers: {
      authorization: `Bearer ${authCred?.token}`,
    },
  })
}
const getAllPrivateMemories = async () => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)
  return await Instance({
    method: 'GET',
    url: '/api/private-memories',
    withCredentials: true,
    headers: {
      authorization: `Bearer ${authCred?.token}`,
    },
  })
}
const getMemory = async (id: string) => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)
  return await Instance({
    method: 'GET',
    url: `/api/memories/${id}`,
    withCredentials: true,
    headers: {
      authorization: `Bearer ${authCred?.token}`,
    },
  })
}
const createMemory = async (body: any) => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)
  return await Instance.post('http://127.0.0.1:3001/api/create-memory', body, {
    headers: {
      authorization: `Bearer ${authCred?.token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}
const likeMemory = async ({ memoryId }: LikeMemoryBody) => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)

  return await Instance({
    method: 'POST',
    url: `/api/like-memory`,
    withCredentials: true,
    data: { memoryId },
    headers: {
      authorization: `Bearer ${authCred?.token}`,
    },
  })
}
const unLikeMemory = async ({ memoryId }: LikeMemoryBody) => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)

  return await Instance({
    method: 'POST',
    url: `/api/un-like-memory`,
    withCredentials: true,
    data: { memoryId },
    headers: {
      authorization: `Bearer ${authCred?.token}`,
    },
  })
}
const searchMemory = async (searchText: string) => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)

  return await Instance({
    method: 'GET',
    params: { searchText },
    url: `/api/search-memories`,
    withCredentials: true,
    headers: {
      authorization: `Bearer ${authCred?.token}`,
    },
  })
}
const addBookmark = async ({ memoryId }: LikeMemoryBody) => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)

  return await Instance({
    method: 'POST',
    url: `/api/addbookmark-memory`,
    withCredentials: true,
    data: { memoryId },
    headers: {
      authorization: `Bearer ${authCred?.token}`,
    },
  })
}
const removeBookmark = async ({ memoryId }: LikeMemoryBody) => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)

  return await Instance({
    method: 'POST',
    url: `/api/removeBookmark-memory`,
    withCredentials: true,
    data: { memoryId },
    headers: {
      authorization: `Bearer ${authCred?.token}`,
    },
  })
}
const updateMemory = async (memory: Memory) => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)

  return await Instance.put('http://127.0.0.1:3001/api/update-memory', memory, {
    headers: {
      authorization: `Bearer ${authCred?.token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}
const getAllBookmarkMemories = async (ids: string[]) => {
  const authCred = JSON.parse(localStorage.getItem('user_Session')!)
  return await Instance({
    method: 'GET',
    url: `/api/bookmark-memories/${ids}`,
    withCredentials: true,
    data: { ids },
    headers: {
      authorization: `Bearer ${authCred?.token}`,
    },
  })
}

export {
  onSignUp,
  onSignIn,
  getMemories,
  getMemory,
  createMemory,
  getAllPrivateMemories,
  likeMemory,
  removeBookmark,
  unLikeMemory,
  searchMemory,
  addBookmark,
  updateMemory,
  getAllBookmarkMemories,
}
