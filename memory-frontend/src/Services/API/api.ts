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
export { onSignUp, onSignIn, getMemories, getMemory }
