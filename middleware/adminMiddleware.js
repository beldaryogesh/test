

const login = async function(req, res, next){
    try {
        if(req.body == undefined){
            return res.status(200).json({errorCode : 400, message : 'Empty Request Body'})
        }
        if(!req.body.email){
            return res.status(200).json({errorCode : 'Please Provide email'})
        }
        if(!req.body.password){
            return res.status(200).json({errorCode : 'Please Provide Password'})
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
};

module.exports = {
    login
}