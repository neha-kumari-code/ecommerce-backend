import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    date:{type:Number,required:true},
    isdelivered:{type:Boolean,default:false},
    deliveryStatus:{type:String},
    cancelled:{type:Boolean,default:false},
    payment:{type:Boolean,default:false},
    amount:{type:Number,required:true},
    shippingAddress:{
        fullName:String,
        phone:Number,
        addressLine1:String,
        addressLine2:String,
        pincode:String,
        state:String,
        city:String
    },
    orderItem:{
        productId:String,
        name:String,
        price:Number,
        quantity:Number,
        image:String,
        size:String,
    },
    deliveredAt:{type:Date,required:true}
},{timestamps:true})

const orderModel=mongoose.models.order || mongoose.model('order',orderSchema)
export default orderModel