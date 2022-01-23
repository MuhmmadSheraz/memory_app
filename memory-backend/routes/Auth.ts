import { signIn } from './../controller/Authentication/auth';
import { Router } from "express";
import { signUp } from "../controller/Authentication/auth";

const authRoutes=Router();
authRoutes.post(`/users/sign-up`,signUp)
authRoutes.post(`/users/sign-in`,signIn)
export default authRoutes
