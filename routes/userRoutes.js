import express from 'express'
import { addToCart, loginUser, registerUser,getMyCart, productDetail } from "../controllers/userControllers.js";
import { listItem,getAllCategory } from '../controllers/adminControllers.js';
const userRouter=express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/add-cart',addToCart)
userRouter.get('/my-carts',getMyCart)
userRouter.get('/all-item',listItem)
userRouter.get('/get-category',getAllCategory)
userRouter.get('/product/:id',productDetail)
export default userRouter