import { SignInUser, SignUpUser } from './../../Types/Auth'
import Instance from './Instance'

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
  })
}
export { onSignUp, onSignIn }
