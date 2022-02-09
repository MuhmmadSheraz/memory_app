import { SignInUser, SignUpUser } from './../../Types/Auth'
import Instance from './Instance'
const { token } = JSON.parse(localStorage.getItem('user_Session')!)
console.log(token)
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
const getMemories = async () => {
  return await Instance({
    method: 'GET',
    url: '/api/memories',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
// Memories
export { onSignUp, onSignIn, getMemories }
