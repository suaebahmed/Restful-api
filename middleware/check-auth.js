const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    try{
        const token = req.headers.authorization;
        // const token = req.headers.authorization.split(" ")[1];
        // console.log(req.headers)     
        // console.log(token)
        const decoded = jwt.verify(token, "mysecret");
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(500).json({
            msg : "auth failed",
            err: error
        })
    }
}