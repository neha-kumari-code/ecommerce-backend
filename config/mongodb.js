import mongoose from "mongoose";

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>console.log("databse connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/Ecommerce`)
}
export default connectDB