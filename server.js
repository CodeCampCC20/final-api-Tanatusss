import express from 'express'
import authRouter from './src/routes/auth.js'
import notFoundMiddleware from './src/middleware/not-fount.middleware.js'
import errorMiddleware from './src/middleware/error.middleware.js'



//http://localhost:3366
const PORT = 3366
const app = express()

app.use(express.json())

app.use('/', authRouter)


app.use(notFoundMiddleware)

app.use(errorMiddleware)




app.listen(PORT, () => console.log(`Server run port ${PORT}`))