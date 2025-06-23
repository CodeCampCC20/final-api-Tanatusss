import express from 'express';
import validatorMiddleware from '../middleware/validator.middleware.js';
import { schemaLoginDoctor, schemaLoginUser, schemaRegisterDoctor, schemaRegisterUser } from '../utils/schema-auth.js';
import { authDoctorlogin, authDoctorRegister, authUserlogin, authUserRegister, getMeUser } from '../controllers/auth.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const authRouter = express.Router()
authRouter.post('/auth/register/doctor',validatorMiddleware(schemaRegisterDoctor),authDoctorRegister)
authRouter.post('/auth/register/user', validatorMiddleware(schemaRegisterUser),authUserRegister)
authRouter.post('/auth/login/doctor',validatorMiddleware(schemaLoginDoctor),authDoctorlogin)
authRouter.post('/auth/login/user',validatorMiddleware(schemaLoginUser),authUserlogin)

authRouter.get('/users/me',authenticateUser,getMeUser)
// authRouter.patch('/users/me')
// authRouter.get('/doctors/me')
// authRouter.patch('/doctors/me')


export default authRouter;