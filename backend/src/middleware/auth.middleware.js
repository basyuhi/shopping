const jwt=require('jsonwebtoken');
const userModel=require('../models/user.model');
async function verifyUser(req,res,next){
    try{
        const token=req.cookies.token;
        if(!token)
        {
            return res.status(401).json({
                message:"unauthorised"
            })
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        
        const user=await userModel.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({
                message:"unauthorised"
            })
        }
        
        req.user=user;
        next();
    }catch(error){
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Unauthorized - Invalid token"
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Unauthorized - Token expired"
            });
        }
        return res.status(500).json({
            message: "Internal server error in authentication"
        });
    }
}
module.exports=verifyUser;