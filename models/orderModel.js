import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true},
    isdelivered:{type:Boolean,default:false},
    deliveryStatus:{type:String,
        enum: ['pending', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
        default:'pending',
        required:true},
    cancelled:{type:Boolean,default:false},
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    shippingAddress:{
        fullName:String,
        phone:Number,
        addressLine:String,
        pincode:String,
        city:String,
        state:String,
    },
    orderItem:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        name:String,
        price:Number,
        quantity:Number,
        image:String,
        variant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Variant'
        }
    }],
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    deliveredAt:{type:Date}
},{timestamps:true})

const orderModel=mongoose.models.order || mongoose.model('Order',orderSchema)
export default orderModel