const jwt = require('jsonwebtoken');

function createToken (user) {
    try {
        let token = jwt.sign(
            {
                userId : user._id.toString(),
                organisation :'Codes-for-Tomorrow'
            },
            'Practice_Test'
        )
        return token
    } catch (error) {
        console.log(error);
    }
};

module.exports = createToken;