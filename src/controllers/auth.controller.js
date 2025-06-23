import authService from "../services/auth.service.js"
import hashService from "../services/hash.service.js"
import jwtService from "../services/jwt.service.js"
import createError from "../utils/create-error.js"
import prisma from "../config/prisma.js"
import bcrypt from "bcryptjs"
import { number } from "yup"


export const authUserRegister = async (req,res,next)=>{
  try{
    const {username,password} = req.body

    const existUser = await authService.findUserbyUsername(username)
    console.log('existUser',existUser)
    if(existUser){
      createError(400,'already in use')
    }
    
    //hash password
    const hashPassword = hashService.hashPassword(password)
    console.log("hashPassword", hashPassword)

    //create user
    const newUser = await authService.createUser({username, password})
    console.log('newUser', newUser)
    res.status(200).json({message: "Register User Successfully" })
   

  }catch(error){
    next(error)
  }
}

export const authUserlogin = async(req,res,next)=>{
  try{
    const {username, password} =req.body

    //step 1 find user
    const existUser = await authService.findUserbyUsername(username)
    console.log("existUser",existUser)

    if(!existUser){
      createError(400, "invalid user")
    }
    const isMatchPassword =hashService.comparePassword(password, existUser.password);
    console.log("isMatchPassword",isMatchPassword)

    const payload = {id: existUser.id}
    const accessToken =  jwtService.genUserToken(payload)
    console.log('accessToken',accessToken)

    res.status(200).json({
  "id": existUser.id,
  "username": existUser.username,
  "accessToken": accessToken
})
  }catch(error){
    next(error)
  }
}

export const authDoctorRegister = async (req,res,next)=>{
  try{
    const {username,password,specialization} = req.body

    const doctor = await authService.findDoctorbyUsername(username)
    console.log('doctor',doctor)
    if(doctor){
      createError(400,'already in use')
    }
    
    //hash password
    const hashPassword = hashService.hashPassword(password)
    console.log("hashPassword", hashPassword)

    //create user
    const newDoctor = await authService.createdoctor({username, password,specialization})
    console.log('newDoctor', newDoctor)
    res.status(200).json({message: "Register doctor Successfully" })
   

  }catch(error){
    next(error)
  }
}

export const authDoctorlogin = async(req,res,next)=>{
  try{
    const {username, password} =req.body

    //step 1 find user
    const doctor = await authService.findDoctorbyUsername(username)
    console.log("doctor",doctor)

    if(!doctor){
      createError(400, "invalid doctor")
    }
    const isMatchPassword =hashService.comparePassword(password, doctor.password);
    console.log("isMatchPassword",isMatchPassword)

    const payload = {id: doctor.id}
    const accessToken =  jwtService.genDoctorToken(payload)
    console.log('accessToken',accessToken)

    res.status(200).json({
  "id": doctor.id,
  "username": doctor.username,
  "specialization": doctor.specialization,
  "accessToken": accessToken
})
  }catch(error){
    next(error)
  }
}

export const getMeUser = async(req,res,next)=>{
  try{
    const {id} = req.user;
    console.log(id)
    const user = await prisma.user.findFirst({
      where:{
        id:Number(id)
      }
    })
    res.json({ 
      "id": user.id,
      "username": user.username})
  }catch(error){
    next(error)
  }
}


export const getMeDoctor = async(req,res,next)=>{
  try{
    const {id} = req.doctor;
    console.log(id)
    const doctor = await prisma.doctor.findFirst({
      where:{
        id:Number(id)
      }
    })
    res.json({ 
      "id": doctor.id,
      "username": doctor.username,
      "specialization": doctor.specialization
    })
  }catch(error){
    next(error)
  }
}


export const updateUser = async (req,res,next)=>{
  try{
    const {id} = req.user;
    const {username,password} = req.body;

    const existUser = await prisma.user.findFirst({
      where:{
        username:username
      }
    })

    if(existUser){
      createError(400,"User is already exist")
    }
    const passHash = await bcrypt.hash(password,10)
    const user = await prisma.user.update({
      where:{
        id:Number(id)
      },
      data:{
        username: username,
        password: passHash,
      },
      omit: {
        password: true,
      },
    })
    res.json({
      "id": user.id,
      "username": user.username
})
  }catch(error){
    next(error)
  }
}

export const updateDoctor = async (req,res,next)=>{
  try{
    const {id} = req.doctor;
    const {username,password,specialization} = req.body;
    const existDoctor = await prisma.doctor.findFirst({
      where:{
        username:username
      }
    })
    if(existDoctor){
      createError(400,"User is already exist")
    }
    const passHash = await bcrypt.hash(password,10)
    const doctor = await prisma.doctor.update({
      where:{
        id:Number(id)
      },
      data:{
        username: username,
        password: passHash,
        specialization: specialization
      }
    })
    res.json({
    "id": doctor.id,
    "username": doctor.username,
    "specialization": doctor.specialization
})
  }catch(error){
    next(error)
  }
}

export const creatHealthUser= async(req,res,next)=>{
  try{
    const {type,value} = req.body
    if(!type||!value){
      createError(400,"Input value and type!")
    }
    await prisma.healthRecord.create({
      data:{
        type:type,
        value:value,
        userId: req.user.id,
      }
    })
    res.json({"message": "create health record successfully"})
  }catch(error){
    next(error)
  }
}

export const getAllHealthUser = async(req,res,next)=>{
  try{
    const allHealth = await prisma.healthRecord.findMany({
      where:{
        userId: req.user.id
      }
    })
    res.json({allHealth})
  }catch(error){
    next(error)
  }
}


export const getHealthByUser = async(req,res,next)=> {
  try{
    const {id} = req.params;
    const healthUser = await prisma.healthRecord.findFirst({
      where:{
        id:Number(id)
      }
    })
    res.json({healthUser})
  }catch(error){
    next(error);
  }
}


export const updateHealthByUser = async(req,res,next)=> {
  try{
    const {type,value} = req.body
    const {id} = req.params;
    const existHealth = await prisma.healthRecord.findFirst({
      where:{
        id:Number(id)
      }
    })

    if(!existHealth){
      createError(400,"Fail!")
    }
    const updateHealth = await prisma.healthRecord.update({
      where:{
        id:Number(id),
      },
      data:{
        type: type,
        value: value
      }
    }) 
    res.json({updateHealth})

  }catch(error){
    next(error)
  }
}

export const deleteHealthUser = async(req,res,next)=>{
  try{
      const {id} = req.params;
  const deleteHealth = await prisma.healthRecord.findFirst({
    where:{
      id:Number(id),
    }
  })
  await prisma.healthRecord.delete({
    where:{
      id:Number(id),
    },
  })
  res.json({message:"Delete success!!!"})
  }catch(error){
    next(error)
  }
}

export const NoteDoctor = async(req,res,next)=>{
  try{
    const {userId, note} = req.body;

    const existDoctor = await prisma.user.findFirst({
      where:{
        id: Number(userId),
      }
    })
    if(!existDoctor){
      createError(400,"ผิดพลาดทางเทคนิคนะครับ")
    }
    await prisma.doctorNote.create({
      data:{
        userId: existDoctor.id,
        note: note,
        doctorId: req.user.id
      }
    })
      res.json({"message": "create doctor notes successfully"})
  }catch(error){
    next(error)
  }
}