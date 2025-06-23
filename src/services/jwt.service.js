import jwt from 'jsonwebtoken';
import { token } from 'morgan';

const jwtService = {};

jwtService.genUserToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "1d",algorithm: "HS256"})

}
jwtService.verifyUserToken = (token)=> {
  return jwt.verify(token, process.env.JWT_SECRET, {algorithms: ["HS256"]})
}


jwtService.genDoctorToken = (payload) => {
  return jwt.sign(payload, process.env.DOCTOR_SECRET,{expiresIn: "1d",algorithm: "HS256"})

}
jwtService.verifyDoctorToken = (token)=> {
  return jwt.verify(token, process.env.DOCTOR_SECRET, {algorithms: ["HS256"]})
}
export default jwtService