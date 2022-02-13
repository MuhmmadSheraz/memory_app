import jwt from 'jsonwebtoken';
export const generateToken = (id: string) => {console.log(id)
  return jwt.sign({id:id}, process.env.JWT_SECRECT || '',  {expiresIn: '60d'});
};
