import bcrypt from 'bcryptjs'

const hashService = {}

hashService.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}

hashService.comparePassword = (password, hash)=> {
  return bcrypt.compareSync(password, hash)
}

export default hashService;