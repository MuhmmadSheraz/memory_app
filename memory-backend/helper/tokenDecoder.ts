import { generateError } from './generateError'
import jwt, { JwtPayload } from 'jsonwebtoken'
export const tokenDecoder = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRECT || '') as JwtPayload
  console.log(decoded)
  if (!decoded) return generateError('null', 500, 'Unauthorize Request')
  return decoded
}
