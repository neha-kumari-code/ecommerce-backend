import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    productData:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    image:{type:String,required:true},
    size:{type:String},
    color:{type:String},
    price:{type:Number,required:true}
},{timestamps:true})
const cartModel=mongoose.models.cart || mongoose.model('cart',cartSchema)
export default cartModel