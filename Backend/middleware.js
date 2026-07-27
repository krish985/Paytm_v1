const { JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){
    const authToken = req.headers.authorization
    
    
    if(!authToken && !authToken.startswith("Bearer ")){
        return res.status(403).json({})
    }
    // Extract token.
    const token = authToken.split(' ')[1]
    
    // Verfify
    try{
        const decoded = jwt.verify(token , JWT_SECRET)
        if(decoded.userId){
           req.userId = decoded.userId
        
           next()
        }else{
            return res.status(403).json({})
        }
        
    }catch(err){
        return res.status(403).json({})
    }
}

module.exports = {
    authMiddleware
}