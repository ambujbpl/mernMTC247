let express = require('express');
let ProductRoutes = express.Router();
let path = require('path');
let ProductController = require('../controllers/ProductController');

ProductRoutes.post('/createProduct',ProductController.CreateProduct);
ProductRoutes.get('/getProducts',ProductController.GetProducts);
ProductRoutes.post('/createOrder',ProductController.CreateOrder);
ProductRoutes.get('/getOrders',ProductController.GetOrders);
ProductRoutes.post('/createSale',ProductController.CreateSale);
ProductRoutes.get('/getLastTwoWeekOrders',ProductController.GetLastTwoWeekOrders);
ProductRoutes.get('/getLastWeekSales',ProductController.GetLastWeekSales);
ProductRoutes.get('/getLastWeekOrders',ProductController.GetLastWeekOrders);

module.exports = ProductRoutes;