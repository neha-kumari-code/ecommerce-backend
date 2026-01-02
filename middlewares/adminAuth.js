import jwt from 'jsonwebtoken'

const authAdmin=async(req,res)=>{
    try {
        const adminToken=req.headers;
        if(!adminToken){
            return res.json({
                success:false,
                message:'not authorized! login again'
            })
        }
        const decode_adminToken=jwt.verify(adminToken,process.env.JWT_SECRET)
        if(decode_adminToken!=process.env.ADMIN_EMAIL + process.env.password){
            return res.json({
                success:false,
                message:'invalid credentials'
            })
        }

         next()
       
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}
export default authAdmin