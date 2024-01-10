const express = require('express');
const Router = express.Router();


const serviceController = require('../controller/serviceController');
const verifyToken = require('../middleware/verifyToken');
const checkBody = require('../middleware/serviceMiddleware');

Router.post('/category/:categoryId/service',[verifyToken.authenticateUser, checkBody.addService], serviceController.addService )
Router.get('/category/:categoryId/services', [verifyToken.authenticateUser], serviceController.getServices)
Router.delete('/category/:categoryId/service/:serviceId', [verifyToken.authenticateUser], serviceController.deleteService);
Router.put('/category/:categoryId/service/:serviceId', [verifyToken.authenticateUser, checkBody.updateService],serviceController.updateService);

module.exports = Router;