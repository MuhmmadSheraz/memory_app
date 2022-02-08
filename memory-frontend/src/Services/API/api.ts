import { SignUpUser } from './../../Types/Auth'
import Instance from './Instance'

const onSignUp = async (body: SignUpUser) => {
  console.log('REQ_BODY', body)
  return await Instance({
    method: 'POST',
    url: '/api/users/sign-up',
    data: body,
  })
}
export { onSignUp }
