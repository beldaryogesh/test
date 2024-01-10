const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryName : String,
    serviceId : [mongoose.Schema.Types.ObjectId]
},{timestamps : true})

module.exports = mongoose.model('Category', CategorySchema)