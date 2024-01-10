const Service = require('../model/serviceModel');
const Category = require('../model/categoryModel');
const ServicePriceOption = require('../model/servicePriceModel');

const addService =  async function (req, res) {
    try {
      let categoryId = req.params.categoryId;
      let obj = {
        serviceName : req.body.serviceName,
        type : req.body.type,
        categoryId : categoryId,
        priceOptions : []
      }
      const service = await Service.create(obj);
        const { duration, price, optionType } = req.body;
        const priceOptionDoc = await ServicePriceOption.create({
          serviceID: service._id,
          duration,
          price,
          type: optionType,
        });

        service.priceOptions.push(priceOptionDoc._id);
        let category = await Category.findOne({_id : categoryId})
        category.serviceId.push(service._id)
        await category.save()
        await service.save();
  
      res.status(201).json({ success: true, message: 'Service added successfully' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

  const getServices = async function(req, res){
    try {
      let categoryId = req.params.categoryId;
      let category = await Category.findOne({_id : categoryId})
      let data = []
      for(let i=0; i<category.serviceId.length; i++){
        let service = await Service.findOne({_id : category.serviceId[i]._id})
        console.log(service)
        let price = await ServicePriceOption.findOne({_id : service.priceOptions[0]})
        if(service){
          data.push({
            categoryId : categoryId,
            categoryName : category.categoryName,
            serviceName : service.serviceName,
            Type : service.type,
            serviceId : service._id,
            priceOptions :  []
          })
          if(price){
            for(let i=0; i<data.length; i++){
              data[i].priceOptions.push({
                duration : price.duration,
                price : price.price,
                type : price.type,
                priceId : price._id
              })
            }
          }
        }
      }
      return res.status(200).json({errorCode : 200, message : 'Service List', data})
    } catch (error) {
      console.log(error);
      return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
  }

const deleteService = async function (req, res)  {
    let categoryId = req.params.categoryId;
    const serviceId = req.params.serviceId;
    let category = await Category.findOne({_id : categoryId})    
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    const serviceIndex = category.serviceId.findIndex((s) => s.toString() == serviceId);
  
    if (serviceIndex == -1) {
      return res.status(404).json({ error: 'Service not found in the category' });
    }
    // await Service.findOneAndDelete({_id : serviceId})
    category.serviceId.splice(serviceIndex, 1);
    await category.save()
    return res.json({ message: 'Service removed from the category successfully' });
};
  

//Create an API to update service as per the service schema.
// PUT /category/:categoryId/service/:serviceId

const updateService = async function(req, res){
  try {
    const serviceId = req.params.serviceId;
    let service = await Service.findOne({_id : serviceId});
    if(!service){
      return res.status(200).json({errorCode : 404, message : 'Service Not Found'})
    }
    let obj = {
      serviceName : req.body.serviceName ? req.body.serviceName : undefined,
      type : req.body.type ? req.body.type : undefined,
    }
    await Service.findOneAndUpdate({_id : serviceId}, {$set : obj}, {new : true})
    if(req.body.priceId){
      let price = await ServicePriceOption.findOne({_id : req.body.priceId})
      if(!price){
        return res.status(200).json({errorCode : 404, message : 'No Price Document Exist For This PriceId'})
      }
      let obj = {
        duration : req.body.duration ? req.body.duration : undefined,
        price : req.body.price ? req.body.price : undefined,
        type: req.body.optionType ? req.body.optionType : undefined
      }
      await ServicePriceOption.findOneAndUpdate({_id : req.body.priceId}, {$set : obj}, {new : true})
    }
    return res.status(200).json({errorCode : 200, message : 'service update successfully'})
  } catch (error) {
    console.log(error);
    return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
  }
}
  module.exports = {
    addService,
    getServices,
    deleteService,
    updateService
  }