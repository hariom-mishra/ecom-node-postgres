import express from 'express';
import { verifyToken } from '../utils/jwt.js';
const userRouter = express.Router();
import { registerUserController, loginUserController, getAllUsersController, getUserProfileController } from '../controllers/user.controller.js';
userRouter.get('/all', getAllUsersController)

userRouter.post('/', registerUserController);

userRouter.get('/', verifyToken, getUserProfileController);

userRouter.post('/login', loginUserController);

export default userRouter;