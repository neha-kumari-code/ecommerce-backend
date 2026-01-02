import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/UserModel.js'
import productModel from '../models/productModel.js'
import cartModel from '../models/cartModel.js'
// to create account
const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name | !email | !password){
            return res.json({
                success:false,
                message:"missing details"
            })
        }
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:'enter a valid email'
            })
        }
        if(password.length<8){
            return res.json({
                success:false,
                message:'enter a strong password'
            })
        }
        const salt=await bcrypt.genSalt(8);
        const hashedPassword=await bcrypt.hash(password,salt)
        const userData={
            name,
            email,
            password:hashedPassword
        }
        const newUser=new userModel(userData)
        const user=await newUser.save();
        const id=user._id;
        const token=jwt.sign(id,process.env.JWT_SECRET)
        return res.json({
            success:true,
            message:'successfully signed Up',
            token
        })

    } catch (error) {
        console.log(`signIn error:${error}`)
        return res.json({
            success:false,
            message:error.message
        })
    }
}

// login 
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.json({
                success:false,
                message:'missing detail'
            })
        }
        const user=await userModel.findOne({email})
        if(user){
        const isMatch=bcrypt.compare(user.password,password)
        if(!isMatch){
            return res.json({
                success:false,
                message:'password wrong'
            })
        }else{
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({
                success:true,
                token
            })
        }
        }else{
            return res.json({
                success:false,
                message:'user does not exist'
            })
        }
    } catch (error) {
        console.log(`user login error: ${error}`)
        return res.json({
            success:false,
            message:error.message
        })
    }

}

// add to cart api
    const addToCart=async(req,res)=>{
        try {
            const {size,color}=req.body
            const {productId}=req.params
            const userId=req.userId
            const productData=await productModel.findById(productId).select('-description')
            if(!productData){
                return res.json({
                    success:false,
                    message:'product not found'
                })
            }
            const productName=productData.name;
            const deliveredAt=productData.deliveredAt;
            const image=productData.image;
            const price=productData.price;
            const cartDetail={
                userId,
                productId,
                size,
                color,
                productName,
                deliveredAt,
                image,
                price
            }
            const newCart=new cartModel(cartDetail)
            const cart=await newCart.save();
            return res.json({
                success:true,
                message:'product added to cart'
            })
        } catch (error) {
            console.error(error);
            return res.json({
                success:true,
                message:error.message
            })
        }
    }
// go to cart
const getMyCart=async(req,res)=>{
    try {
        const userId=req.userId;
        const allCarts=await cartModel.find({userId})
        console.log(allCarts)
       return res.json({
        success:true,
        allCarts
       })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:error.message
        })
    }
}
export {registerUser,loginUser,addToCart,getMyCart} 