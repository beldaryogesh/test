const express = require('express');
const Router = express.Router();

const Category = require('../controller/categoryController');
const verifyToken = require('../middleware/verifyToken');

Router.post('/category',[verifyToken.authenticateUser], Category.createCategory);
Router.get('/categories', [verifyToken.authenticateUser], Category.getCategories);
Router.put('/category/:categoryId', [verifyToken.authenticateUser], Category.updateCategory);
Router.delete('/category/:categoryId', [verifyToken.authenticateUser], Category.deleteCategory);


module.exports = Router;