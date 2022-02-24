import { CreateMemoryBody } from './../../Types/Memory'
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
  // return await Instance({
  //   method: 'POST',
  //   url: `/api/create-memory`,
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     authorization: `Bearer ${authCred?.token}`,
  //   },
  //   withCredentials: true,
  //   data: {
  //     body,
  //   },
  // })
}
export { onSignUp, onSignIn, getMemories, getMemory, createMemory }
