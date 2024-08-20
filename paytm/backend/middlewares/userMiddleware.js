const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")
const {Users} = require("../db/index")

const userMiddlware = async(req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'Unauthorized'})
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        req.userId = decoded.user_id;
        
        next();
    } catch (err) {
        return res.status(403).json({});
    }
}

module.exports = {
    userMiddlware
}