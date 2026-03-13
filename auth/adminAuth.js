import jwt from 'jsonwebtoken'
const adminAuth=(req,res,next)=>{
    try {
        const JWT_SECRET=process.env.JWT_SECRET
        const email=process.env.ADMIN_EMAIL
        const password=process.env.ADMIN_PASSWORD
        const token=req.headers.token
        if(!token){
            return res.json({
                success:false,
                message:'token missing'
            })
        }
        const decodedToken= jwt.verify(token,JWT_SECRET)
        if(decodedToken==email+password){
           next()
        }else{
            return res.json({
                success:false,
                message:'not logged in'
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}
export default adminAuth