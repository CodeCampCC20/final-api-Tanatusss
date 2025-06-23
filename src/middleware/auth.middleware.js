import authService from "../services/auth.service.js"
import jwtService from "../services/jwt.service.js"
import createError from "../utils/create-error.js"

export const authenticateUser = async(req,res,next)=>{
  try{
    const authorization = req.headers.authorization
    console.log("authorization",authorization)

    if(!authorization|| !authorization.startsWith('Bearer')){
        createError(401, "Unauthorization !")
      }
      const token = authorization.split(" ")[1]
      console.log('token',token)

      if(!token){
        createError(401, "Unauthorization !!")
      }

      const payload = jwtService.verifyUserToken(token);
      console.log('payload',payload)

      const user = await authService.findUserbyId(payload.id)
      if(!user){
        createError(401, "Unauthorization !!!")
      }
      console.log("user" ,user)
      req.user = user;

      next();
  }catch(error){
    next(error)
  }
}



export const authenticateDoctor = async(req,res,next)=>{
  try{
    const authorization = req.headers.authorization
    console.log("authorization",authorization)

    if(!authorization|| !authorization.startsWith('Bearer')){
        createError(401, "Unauthorization !")
      }
      const token = authorization.split(" ")[1]
      console.log('token',token)

      if(!token){
        createError(401, "Unauthorization !!")
      }

      const payload = jwtService.verifyDoctorToken(token);
      console.log('payload',payload)

      const doctor = await authService.findDoctorbyId(payload.id)
      if(!doctor){
        createError(401, "Unauthorization !!!")
      }
      console.log("doctor" ,doctor)
      req.doctor = doctor;

      next();
  }catch(error){
    next(error)
  }
}