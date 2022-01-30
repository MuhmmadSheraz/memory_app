import { signIn,  forgotPassword, resetPassword, validateResetPasswordToken } from './../controller/Authentication/auth';
import { Router } from 'express';
import { signUp } from '../controller/Authentication/auth';

const authRoutes = Router();
authRoutes.post(`/users/sign-up`, signUp);
authRoutes.post(`/users/sign-in`, signIn);
authRoutes.post(`/users/forgot-password`,forgotPassword);
authRoutes.get(`/users/reset-password-validation/:token`,validateResetPasswordToken); 
authRoutes.post(`/users/reset-password/:token`, resetPassword);
export default authRoutes;
