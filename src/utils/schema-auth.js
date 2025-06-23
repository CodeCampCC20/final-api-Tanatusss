import * as Yup from 'yup'

export const schemaRegisterUser = Yup.object({
  username: Yup.string().max(30).required(),
  password: Yup.string().min(5, "Password more than 5"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Confirm password not match")
})



export const schemaLoginUser = Yup.object({
  username: Yup.string().max(30).required("กรุณาใส่usernameให้ถูกต้อง"),
  password: Yup.string().min(5, "Password more than 5"),
})


export const schemaRegisterDoctor = Yup.object({
  username: Yup.string().max(30).required(),
  password: Yup.string().min(5, "Password more than 5"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Confirm password not match")
})



export const schemaLoginDoctor = Yup.object({
  username: Yup.string().max(30).required("กรุณาใส่usernameให้ถูกต้อง"),
  password: Yup.string().min(5, "Password more than 5"),
})