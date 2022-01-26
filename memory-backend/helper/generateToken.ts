import jwt from 'jsonwebtoken';
export const generateToken = (id: string) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRECT || '', {
    expiresIn: process.env.JWT_EXPIRY
  });
};
