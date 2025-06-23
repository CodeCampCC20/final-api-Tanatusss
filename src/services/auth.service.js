import prisma from "../config/prisma.js"; 

const authService ={}

authService.findUserbyUsername=(username)=>{
  return prisma.user.findUnique({
    where: {username}
    
  })
}
authService.findDoctorbyUsername=(username)=>{
  return prisma.doctor.findUnique({
    where: {username}
    
  })
}

authService.createUser = (data)=>{
  console.log(data)
  return prisma.user.create({data})
}
authService.createdoctor = (data)=>{
  console.log(data)
  return prisma.doctor.create({data})
}




export default authService;