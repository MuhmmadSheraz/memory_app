import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateError } from './../../helper/generateError';
import { NextFunction, Request, Response } from 'express';
import { User, userModal } from './../../model/user';
import { generateToken } from '../../helper/generateToken';
export const signUp = async (req: Request, res: Response) => {
  try {
    const newUser = await userModal.create({
      name: req.body.name,
      email: req.body.email,
      profilePicture: req.body.profilePicture,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });
    const token = generateToken(newUser._id);
    res.send({
      status: 200,
      token,
      data: newUser,
      message: 'user created Successfully'
    });
  } catch (error: any) {
    generateError(res, 500, error.message);
  }
};
export const signIn = async (req: Request, res: Response) => {
  console.log("Sign In")
  const { email, password } = req?.body;
  if (!email || !password)
    return generateError(res, 500, 'email and password are required');
  const user: User | any = await userModal
    .findOne({ email })
    .select('+password');
  if (!user) return generateError(res, 500, 'No user found');
  const correctPassword: boolean = await user.correctPassword(
    password,
    user.password
  );
  if (!correctPassword) return generateError(res, 500, 'Incorrect password');
  const token = generateToken(user?._id);
  res.send({
    status: 200,
    message: 'Signed In Successfully',
    token,
    data: user
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  console.log("Forgot API")
  // 1) Find User By Email
  const user: User | any = await userModal.findOne({ email: req?.body?.email });
  if (!user) {
     generateError(res, 404, 'No user found with this email');
  }
  // 2) Generate Password Expiry Token and save it to DB
  await user?.createResetPasswordToken();
  await user.save();

  
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers: string = req?.headers.authorization || '';
  const     authToken = headers?.split(' ')[1];
  if (!authToken) return generateError(res, 500, 'Unauthorized request');
  try {
    const decoded = jwt.verify(
      authToken,
      process.env.JWT_SECRECT || ''
    ) as JwtPayload;
    const validUser = await userModal.findById(decoded?.id);
    if (!validUser)
      return generateError(res, 500, 'This token is not belong to any user');
    next();
  } catch (error) {
    generateError(res, 500, 'Invalid Token');
    console.log(error);
  }
};
