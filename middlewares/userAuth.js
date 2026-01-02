import jwt from 'jsonwebtoken';
const userAuth=async(req,res,next)=>{
    try {
        const token=req.headers;
        if(!token){
            return res.json({
                success:false,
                message:'not authorized! login again'
            })
        }
        const decoded_token=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded_token.id
        next()
        
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })

    }
}