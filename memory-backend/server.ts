import Express, { Application } from 'express'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import process from 'process'
import memoryRoutes from './routes/Memory'
import { connectDB } from './helper/dbConnection'
import authRoutes from './routes/Auth'
const app: Application = Express()
const port = process.env.PORT || 3001

// Express Middlewares
app.use(Express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(Express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://memory-webapp.netlify.app'],
    credentials: true,
  })
)
app.use(fileUpload({ useTempFiles: true }))
dotenv.config({
  path: './.env.development',
})
connectDB()

app.use(`/api`, memoryRoutes)
app.use(`/api`, authRoutes)
app.use(cookieParser())
app.listen(process.env.PORT, () => {
  console.log(process.env, 'hello')
  console.log(`server is started 💨 on port ${process.env.PORT} `)
})
