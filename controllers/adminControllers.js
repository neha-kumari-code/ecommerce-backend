import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
// admin login
const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.json({
                success:false,
                message:'detail missing'
            })
        }
        if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD){
            const adminToken=jwt.sign(email+password,process.env.JWT_SECRET)
            return res.json({
                success:true,
                adminToken
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:error.message
        })
    }
}

// product add api
const addproduct=async(req,res)=>{
    try {
        const {name,description,deliveredAt,price,status,quantity,sizes}=req.body
        const imageFile=req.file
        const uploadedImg=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const sizeArray=sizes.split(',')
        const productDetail={
            name,
            description,
            deliveredAt,
            price,
            status,
            quantity,
            image:uploadedImg.secure_url,
            size:sizeArray
        }
        const newProduct=new productModel(productDetail);
        const product=await newProduct.save();
        return res.json({
            success:true,
            message:'product added'
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}

// delete product api
const deleteProduct=async(req,res)=>{
    try {
        const {productId}=req.params
       await productModel.findByIdAndDelete(productId)
       return res.json({
        success:true,
        message:'product deleted'
       })
    } catch (error) {
        console.error(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}


// update product api
const updateProduct=async(req,res)=>{
    try {
        const {productId}=req.params;
        const {deliveredAt,price,status,quantity}=req.body
        const update={}
        if(deliveredAt!==undefined) update.deliveredAt=deliveredAt
        if(price!==undefined) update.price=price
        if(status!==undefined) update.status=status
        if(quantity!==undefined) update.quantity=quantity
        await productModel.findByIdAndUpdate(productId,{$set:update},{new:true,runValidators:true})
        return res.json({
            success:true,
            message:'product updated'
        })

    } catch (error) {
         console.error(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}

// add category endpoint
const addCategory=async(req,res)=>{
    try {
        const {name,parent,status}=req.body
        const ctExist=await categoryModel.findOne({name})
        if(ctExist){
            return res.json({
                success:false,
                message:'category already exist'
            })
        }
        if(parent){
            const findparent=await categoryModel.findById(parent)
            if(findparent){
                
            }
        }
    } catch (error) {
        
    }
}
export {adminLogin,addproduct,deleteProduct,updateProduct}