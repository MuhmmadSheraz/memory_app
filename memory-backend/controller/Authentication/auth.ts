import { sendEmail } from './../../helper/email';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
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
    const expiry  = process.env.JWT_COOKIE_EXPIRY as string
    // Sending Token In Cookie
    res.cookie('jwt', token, {
      expires: new Date((Date.now() + parseInt(expiry)) * 24 * 60 * 60 * 1000),
      httpOnly: true
    }).status(200);
    res.send({
      status: 200,
      user:{token,newUser},
      message: 'user created Successfully'
    });
  } catch (error: any) {
    generateError(res, 500, error.message);
  }
};


export const signIn = async (req: Request, res: Response) => {
  console.log('Sign In');
  const { email, password } = req.body;
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
  const expiry  = process.env.JWT_COOKIE_EXPIRY as string
  res.cookie('jwt', token, {
    expires: new Date((Date.now() + parseInt(expiry)) * 24 * 60 * 60 * 1000),
    httpOnly: true
  }).send({
    status: 200,
    message: 'Signed In Successfully',
    user:{token,user}
  });
};


export const forgotPassword = async (req: Request, res: Response) => {
  // FD ---> Send Me Reset Email

  console.log('Forgot API');
  // 1) Find User By Email
  const user: User | any = await userModal.findOne({ email: req?.body?.email });
  if (!user) {
    generateError(res, 404, 'No user found with this email');
  }
  // 2) Generate Password Expiry Token and save it to DB
  const resetToken = await user?.createResetPasswordToken();
  const message = `Your Password Reset Link is ---::----- ${resetToken}`;
  await user.save();
  sendEmail({ email: user?.email, message });
  res.send({
    status: 200,
    message: 'Reset link has been sent to your email'
  });
};


export const validateResetPasswordToken = async (
  req: Request,
  res: Response
) => {
  // For validating if token and expiry then only show green single to render {Reset Password Page}
  let resetToken = req.params.token;
  // hashing the token
  resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const user = await userModal.findOne({
    passwordResetToken: resetToken,
    expiryOfPasswordResetToken: { $gt: Date.now() }
  });
  if (!user) generateError(res, 404, 'Invalid Token');
  res.send({
    status: 200,
    message: 'Request Successful'
  });
};


export const resetPassword = async (req: Request, res: Response) => {
  // For validating if token and expiry then only show green single to render {Reset Password Page}
  let resetToken = req.params.token;
  // hashing the token
  resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  try {
    const user: any = await userModal.findOne({
      passwordResetToken: resetToken,
      expiryOfPasswordResetToken: { $gt: Date.now() }
    });
    if (!user) generateError(res, 404, 'Invalid Token');

    // Finally updating the password
    user.password = req?.body.password;
    user.passwordResetToken = undefined;
    user.expiryOfPasswordResetToken = undefined;
    user.save();
    res.send({
      status: 201,
      message: 'Password has updated'
    });
  } catch (error: any) {
    generateError(res, 500, error.message);
  }
};


export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers: string = req?.headers.authorization || '';
  const authToken = headers?.split(' ')[1];
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
