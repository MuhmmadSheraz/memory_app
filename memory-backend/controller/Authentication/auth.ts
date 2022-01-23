import { generateError } from './../../helper/generateError';
import { Request, Response } from 'express';
import { User, userModal } from './../../model/user';
import { generateToken } from '../../helper/generateToken';
export const signUp = async (req: Request, res: Response) => {
  try {
    const newUser = await userModal.create({
      name: req.body.name,
      email: req.body.email,
      profilePicture: req.body.profilePicture,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    const token = generateToken(newUser._id);
    res.send({
      status: 200,
      token,
      data: newUser,
      message: 'user created Successfully',
    });
  } catch (error:any) {
    generateError(res, 500, error.message);
  }
};
export const signIn = async (req: Request, res: Response) => {
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
    data: user,
  });
};
