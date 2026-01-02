import mongoose from "mongoose";

const attributeSchema=new mongoose.Schema({
    name:{type:String,required:true},
    inputType:{
        type:String,
        enum:["TEXT","NUMBER"]
    }
})
const attributeModel=mongoose.models.Attribute || mongoose.model('Attribute',attributeSchema)
export default attributeModel