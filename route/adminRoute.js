const express = require('express');
const Router = express.Router();

const Admin = require('../controller/adminController');
const checkBody = require('../middleware/adminMiddleware');

Router.post('/createAdmin', Admin.createAdmin);
Router.post('/login',[checkBody.login], Admin.AdminLogin);

module.exports = Router;