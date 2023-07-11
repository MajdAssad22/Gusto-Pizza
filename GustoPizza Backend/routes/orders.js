//-- REQUIREMENTS
const express = require('express');
const moment = require('moment');
const Database = require('../database');

//-- VARIABLES
var helper = require('../utils/helper');
var dbConnection = new Database();
var router = express.Router();

//-- API
// Gets all the orders
router.get('/', function(req, res, next) {
    let getOrdersQuery = 
    `SELECT * 
    FROM orders`;
    dbConnection.executeQuery(getOrdersQuery)
        .then(result => res.send(result))
        .catch(err => {
            res.statusMessage = err.message;
            res.status(400).end();
        });
});

// Gets all the orders for a customer
router.post('/getCustomerOrders', function(req, res, next) {
    var body = req.body;
    let getOrdersQuery =
    `SELECT OrderId, IsDone, DateOfOrder
    FROM orders 
    WHERE CustomerId = ${body.CustomerId}
    ORDER BY DateOfOrder desc`;
    
    //-- GET ALL THE ORDERS FOR THIS CUSTOMER
    dbConnection.executeQuery(getOrdersQuery)
        .then(orders =>{
            var promises = []
            //-- FOREACH ORDER GET ALL THE PIZZAS AND DRINKS
            orders.forEach(order => {
                promises.push(helper.getOrder(order));
            });
            Promise.all(promises)
                .then(result => {
                    res.send(result);
                });
            })
        .catch(err => {
            res.statusMessage = err.message;
            res.status(400).end();
        });
});

// Add a new order to a customer
router.post('/addOrder', function(req, res, next) {
    var body = req.body;
    let addOrderQuery = 
    `INSERT INTO orders (CustomerId, IsDone, DateOfOrder)
    VALUES ('${body.Customer.CustomerId}', '0', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}');`;
    
    dbConnection.executeQuery(addOrderQuery)
        .then((result) =>{
            var promises = []
            body.Order.Drinks.forEach(drink => {
                promises.push(helper.addDrink(drink, result.insertId));
            });
            body.Order.Pizzas.forEach(pizza => {
                promises.push(helper.addPizza(pizza, result.insertId));
            });
            Promise.all(promises)
                .then(result => res.send(result));
        })
        .catch(err => {
            res.statusMessage = err.message;
            res.status(400).end();
        });
});

module.exports = router;