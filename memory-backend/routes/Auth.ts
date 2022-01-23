import { Router } from "express";
import { signUp } from "../controller/Authentication/auth";

const authRoutes=Router();
authRoutes.post(`/users/sign-up`,signUp)
export default authRoutes
