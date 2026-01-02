import mongoose from "mongoose";

const attributeValueSchema=new mongoose.Schema({
    attribute:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Attribute',
        required:true
    },
    value:{
        type:String,
        required:true
    }
})
const attributeValueModel=mongoose.models.AttributeValue || mongoose.model('AttributeValue',attributeValueSchema)
export default attributeValueModel