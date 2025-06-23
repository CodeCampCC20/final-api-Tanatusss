import express from 'express';
import validatorMiddleware from '../middleware/validator.middleware.js';
import { schemaLoginDoctor, schemaLoginUser, schemaRegisterDoctor, schemaRegisterUser } from '../utils/schema-auth.js';
import { authDoctorlogin, authDoctorRegister, authUserlogin, 
  authUserRegister, creatHealthUser, deleteHealthUser, getAllHealthUser, getHealthByUser, getMeDoctor, getMeUser, 
  NoteDoctor, 
  updateDoctor, updateHealthByUser, updateUser } 
from '../controllers/auth.controller.js';
import { authenticateDoctor, authenticateUser } from '../middleware/auth.middleware.js';

const authRouter = express.Router()
// auth
authRouter.post('/auth/register/doctor',validatorMiddleware(schemaRegisterDoctor),authDoctorRegister)
authRouter.post('/auth/register/user', validatorMiddleware(schemaRegisterUser),authUserRegister)
authRouter.post('/auth/login/doctor',validatorMiddleware(schemaLoginDoctor),authDoctorlogin)
authRouter.post('/auth/login/user',validatorMiddleware(schemaLoginUser),authUserlogin)


authRouter.get('/users/me',authenticateUser,getMeUser)
authRouter.patch('/users/me',authenticateUser,updateUser)
authRouter.get('/doctors/me',authenticateDoctor,getMeDoctor)
authRouter.patch('/doctors/me',authenticateDoctor,updateDoctor)
authRouter.post('/health-records',authenticateUser,creatHealthUser)
authRouter.get('/health-records',authenticateUser,getAllHealthUser)
authRouter.get('/health-records/:id',authenticateUser,getHealthByUser)
authRouter.patch('/health-records/:id',authenticateUser,updateHealthByUser)
authRouter.delete('/health-records/:id',authenticateUser,deleteHealthUser)
authRouter.post('/doctor-notes',authenticateDoctor,NoteDoctor)

export default authRouter;