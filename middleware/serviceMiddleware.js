const regex = require('../constant/regex');


const addService = async function(req, res, next){
    try {
        let { serviceName, type, duration, price, optionType } = req.body;
        if(!serviceName){
            return res.status(200).json({errorCode : 200, message : 'Please Provide Service Name'})
        }
        if(!type){
            return res.status(200).json({errorCode : 200, message : 'Please Provide Type'})
        }
        if(!regex.serviceStatus.test(type)){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Only Normal and VIP type'})
        }
        if(!duration){
            return res.status(200).json({errorCode : 200, message : 'Please Provide duration'})
        }
        if(!price){
            return res.status(200).json({errorCode : 200, message : 'Please Provide price'})
        }
        if(!Number(price)){
            return res.status(200).json({errorCode : 400, message : 'Please provide Numaric price'})
        }
        if(!optionType){
            return res.status(200).json({errorCode : 200, message : 'Please Provide optionType'})
        }
        if(!regex.priceRegex.test(optionType)){
            return res.status(200).json({errorCode : 400, message : 'please rpovide Hourly|Weekly|Monthly'})
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'Internal Server Error'})
    }
};

const updateService = async function(req, res, next){
    try {
        let { serviceName, type, duration, price, optionType } = req.body;
        if(serviceName != undefined){
            if(!serviceName){
                return res.status(200).json({errorCode : 200, message : 'Please Provide Service Name'})
            }
        }
        if(type != undefined){
            if(!type){
                return res.status(200).json({errorCode : 200, message : 'Please Provide Type'})
            }
            if(!regex.serviceStatus.test(type)){
                return res.status(200).json({errorCode : 400, message : 'Please Provide Only Normal and VIP type'})
            }
        }
        if(duration != undefined){
            if(!duration){
                return res.status(200).json({errorCode : 200, message : 'Please Provide duration'})
            }
        }
        if(price != undefined){
            if(!price){
                return res.status(200).json({errorCode : 200, message : 'Please Provide price'})
            }
            if(!Number(price)){
                return res.status(200).json({errorCode : 400, message : 'Please provide Numaric price'})
            }
        }
        if(optionType != undefined){
            if(!optionType){
                return res.status(200).json({errorCode : 200, message : 'Please Provide optionType'})
            }
            if(!regex.priceRegex.test(optionType)){
                return res.status(200).json({errorCode : 400, message : 'please rpovide Hourly|Weekly|Monthly'})
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 200, message : 'Internal Server Error'})
    }
}

module.exports = {
    addService,
    updateService
}