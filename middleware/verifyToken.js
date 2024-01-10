const jwt = require('jsonwebtoken');

const authenticateUser = function (req, res, next){
    try {
        const token = req.headers['x-api-key'];
        if(!token){
           return res.status(200).json({errorCode : 400, message : 'Please Provide Token'})
        }
        const decoded = jwt.verify(token, 'Practice_Test')
      
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json(({errorCode : 401, message : 'Invalid Token'}))
    }

}

module.exports = {
    authenticateUser
}




