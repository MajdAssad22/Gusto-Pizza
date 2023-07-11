//-- START MESSAGE
console.log('Running File: index.js');

//-- REQUIREMENTS
const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
require('dotenv').config()


//-- ROUTES 
const customers = require('./routes/customers');
const orders = require('./routes/orders');
const drinks = require('./routes/drinks');
const sizes = require('./routes/sizes');
const toppings = require('./routes/toppings');
const pizzas = require('./routes/pizzas');

//-- SERVER INFO
var server = express();
var port = 3000;
server.use(parser.json());
server.use(cors());
server.use('/customers',customers);
server.use('/orders',orders);
server.use('/drinks',drinks);
server.use('/sizes',sizes);
server.use('/toppings',toppings);
server.use('/pizzas',pizzas);

//-- SET CORS
server.get("/", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//-- LISTEN FOR CONNECTION ON GIVEN PORT
server.listen(port);