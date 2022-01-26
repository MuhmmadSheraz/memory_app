import { signIn, protect, forgotPassword } from './../controller/Authentication/auth';
import { Router } from 'express';
import { signUp } from '../controller/Authentication/auth';

const authRoutes = Router();
authRoutes.post(`/users/sign-up`, signUp);
authRoutes.post(`/users/sign-in`, signIn);
authRoutes.post(`/users/forgot-password`,protect, forgotPassword);
export default authRoutes;
