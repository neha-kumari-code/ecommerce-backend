import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{ type:String,required:true,unique:true},
    password:{type:String,required:true},
    dob:{type:String,required:true},
    phone:{type:Number,required:true},
    gender:{type:String,required:true},
    image:{type:String,default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_25mGTjpQRpmjZPskWmuGCp3oLOh2XvErRA&s'},
    address:{
        type:Object,
        default:()=>({
            city:null,
            state:null,
            postalCode:null,
            country:"India"
        })
    }
},{timestamps:true})
const userModel=mongoose.models.user || mongoose.model('user',userSchema)
export default userModel