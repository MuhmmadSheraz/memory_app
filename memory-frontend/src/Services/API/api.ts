import { CreateMemoryBody, LikeMemoryBody } from './../../Types/Memory'
import { SignInUser, SignUpUser } from './../../Types/Auth'
import Instance from './Instance'
const authCred = JSON.parse(localStorage.getItem('user_Session')!)
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
  return await Instance.post('http://127.0.0.1:3001/api/create-memory', body, {
    headers: {
      authorization: `Bearer ${authCred?.token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}
const likeMemory = async ({ memoryId }: LikeMemoryBody) => {
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
export {
  onSignUp,
  onSignIn,
  getMemories,
  getMemory,
  createMemory,
  getAllPrivateMemories,
  likeMemory,
  unLikeMemory,
  searchMemory,
}
