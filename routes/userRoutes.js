import express from 'express'
import { addToCart, loginUser, registerUser,getMyCart } from "../controllers/userControllers.js";

const userRouter=express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/add-cart',addToCart)
userRouter.get('/my-carts',getMyCart)
export default userRouter