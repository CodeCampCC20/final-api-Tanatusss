import express from 'express';
import validatorMiddleware from '../middleware/validator.middleware.js';
import { schemaLoginDoctor, schemaLoginUser, schemaRegisterDoctor, schemaRegisterUser } from '../utils/schema-auth.js';
import { authDoctorlogin, authDoctorRegister, authUserlogin, authUserRegister, getMeDoctor, getMeUser, updateDoctor, updateUser } from '../controllers/auth.controller.js';
import { authenticateDoctor, authenticateUser } from '../middleware/auth.middleware.js';

const authRouter = express.Router()
authRouter.post('/auth/register/doctor',validatorMiddleware(schemaRegisterDoctor),authDoctorRegister)
authRouter.post('/auth/register/user', validatorMiddleware(schemaRegisterUser),authUserRegister)
authRouter.post('/auth/login/doctor',validatorMiddleware(schemaLoginDoctor),authDoctorlogin)
authRouter.post('/auth/login/user',validatorMiddleware(schemaLoginUser),authUserlogin)

authRouter.get('/users/me',authenticateUser,getMeUser)
authRouter.patch('/users/me',authenticateUser,updateUser)
authRouter.get('/doctors/me',authenticateDoctor,getMeDoctor)
authRouter.patch('/doctors/me',authenticateDoctor,updateDoctor)


export default authRouter;