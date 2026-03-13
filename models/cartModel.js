import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true},
    variant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Variant',
        required:true
    },
    quantity:{
        type:Number,
        min:1
    }
},{timestamps:true})
const cartModel=mongoose.models.cart || mongoose.model('cart',cartSchema)
export default cartModel