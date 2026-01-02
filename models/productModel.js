import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    
   variants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Variant',
   }],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }
},{timestamps:true})

const productModel=mongoose.models.product || mongoose.model('product',productSchema)
export default productModel