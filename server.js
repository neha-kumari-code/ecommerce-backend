import express from 'express'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoute.js'
const app=express()
const port= process.env.PORT | 3000
connectDB()
connectCloudinary()
app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)
app.listen(port,()=>{
    console.log(`app started on port ${port}`)
})