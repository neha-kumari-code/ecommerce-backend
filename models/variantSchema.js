import mongoose from "mongoose";

const variantSchema=new mongoose.Schema({
    attributes:[
        {
        attribute:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Attribute',
        required:true
        },
        value:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'AttributeValue',
            required:true
        }
    }],
    images:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true,min:0},
    status:{
        type:String,
        enum:["active","inactive","out_of_stock"],
        default:"active"
    },
    product:{
  type: mongoose.Schema.Types.ObjectId,
  ref:'Product',
  required:true
}
    
})
const variantModel=mongoose.models.Variant || mongoose.model('Variant',variantSchema)
export default variantModel