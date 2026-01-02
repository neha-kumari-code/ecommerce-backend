import mongoose, { mongo } from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        default:null
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }
},{timestamps:true})

const categoryModel=mongoose.models.category || mongoose.model('Category',categorySchema)
export default categoryModel