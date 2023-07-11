//-- REQUIREMENTS
const express = require('express');
const Database = require('../database');

//-- VARIABLES
var dbConnection = new Database();
var router = express.Router();

//-- API
// Gets all the customers
router.get('/', function(req, res, next) {
    let selectCustomersQuery=
    `SELECT * 
    FROM customers`;

    dbConnection.executeQuery(selectCustomersQuery)
        .then(result => res.send(result))
        .catch(err => {
            res.statusMessage = err.message;
            res.status(400).end();
        });
});

// Get customer by id
router.post('/getCustomer', function(req, res, next) {
    let customerId = req.body;
    let selectCustomersQuery=
    `SELECT * 
    FROM customers
    WHERE CustomerId = ${customerId.id}`;

    dbConnection.executeQuery(selectCustomersQuery)
        .then(result => res.send(result))
        .catch(err => {
            res.statusMessage = err.message;
            res.status(400).end();
        });
});
// Verifies existing customer
router.post('/login', function(req, res, next) {
    let loginInfo = req.body;
    let selectCustomersQuery = 
    `SELECT * 
    FROM customers 
    WHERE Email = "${loginInfo.email}" AND Password = "${loginInfo.password}"`
    
    dbConnection.executeQuery(selectCustomersQuery)
        .then(result => res.send(result[0]))
        .catch(err => {
            res.statusMessage = err.message;
            res.status(400).end();
        });
});

// Register a new customer
router.post('/register', function(req, res, next) {
    let newCustomer = req.body;
    let insertCustomerQuery = 
    `INSERT INTO customers (FirstName, LastName, Phone, Address, Email ,Password)
    VALUES ('${newCustomer.FirstName}', '${newCustomer.LastName}', '${newCustomer.Phone}', '${newCustomer.Address}', '${newCustomer.Email}', '${newCustomer.Password}');`;
    
    dbConnection.executeQuery(insertCustomerQuery)
        .then(result => res.send(result))
        .catch(err => {
            if(err.code = 'ER_DUP_ENTRY'){
                res.statusMessage = "This customer already exists.";
                res.status(400).end();
            }
        });
});

module.exports = router;