const jwt = require('jsonwebtoken');
const { success } = require('zod');
require('dotenv').config();

exports.authMiddleware = async(req,res,next)=>{
    try {

        const {accessToken} = req.cookies;
        if(!accessToken){
            return res.status(401).json({
                success : false,
                message : "invalid accessToken"
            })
        }
        const decoded =  jwt.verify(accessToken,process.env.JWT_SECRET)
        req.user = decoded;
        next();

    } catch (error) {
        console.log("error in auth middleware : ",error.message);
        res.status(500).json({
            success : false,
            message : "jwt is expired"
        })
    }
}