const mongoose = require('mongoose');
const constant = require('../constant/constant');

const serviceSchema = new mongoose.Schema({
    categoryId : mongoose.Schema.Types.ObjectId,
    serviceName : String,
    type :{
       type : String,
       enum : [constant.Normal, constant.VIP]
    },
    priceOptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Price',
    }],
}, {timestamps : true});

module.exports = mongoose.model('Service', serviceSchema)