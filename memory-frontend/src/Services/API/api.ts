import { SignInUser, SignUpUser } from './../../Types/Auth'
import Instance from './Instance'
const user = JSON.parse(localStorage.getItem('user_Session')!)
// Authentication
const onSignUp = async (body: SignUpUser) => {
  console.log('REQ_BODY', body)
  return await Instance({
    method: 'POST',
    url: '/api/users/sign-up',
    data: body,
  })
}
const onSignIn = async (body: SignInUser) => {
  console.log('REQ_BODY', body)
  return await Instance({
    method: 'POST',
    url: '/api/users/sign-in',
    data: body,
    withCredentials: true,
  })
}
// Memories
const getMemories = async () => {
  return await Instance({
    method: 'GET',
    url: '/api/memories',
    withCredentials: true,
    headers: {
      authorization: `Bearer ${user?.token}`,
    },
  })
}
const getMemory = async (id: string) => {
  return await Instance({
    method: 'GET',
    url: `/api/memories/${id}`,
    withCredentials: true,
    headers: {
      authorization: `Bearer ${user?.token}`,
    },
  })
}
export { onSignUp, onSignIn, getMemories, getMemory }
