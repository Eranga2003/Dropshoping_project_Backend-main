import express from 'express';
import { createUser, loginUser } from '../controllers/usercontroller.js';
const userRouter=express.Router();



userRouter.post('/',createUser)   

userRouter.post('/login',loginUser) //add login as there are two post req ,so that login for understand 

export default userRouter; 