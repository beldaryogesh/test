const mongoose = require('mongoose')

const servicePriceOptionSchema = new mongoose.Schema({
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['Hourly', 'Weekly', 'Monthly'],
      required: true,
    },
  });

  module.exports = mongoose.model('Price', servicePriceOptionSchema)