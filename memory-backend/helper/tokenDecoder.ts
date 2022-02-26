import jwt, { JwtPayload } from 'jsonwebtoken'
export const tokenDecoder = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRECT || '') as JwtPayload
  return decoded
}
