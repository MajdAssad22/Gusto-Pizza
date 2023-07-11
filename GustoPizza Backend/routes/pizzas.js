//-- REQUIREMENTS
const express = require('express');
const Database = require('../database');

//-- VARIABLES
var dbConnection = new Database();
var router = express.Router();

//-- API
// Gets all the pizzas
router.get('/', function(req, res, next) {
    let selectPizzasQuery=
    `SELECT * 
    FROM pizzas`;
    dbConnection.executeQuery(selectPizzasQuery)
        .then(result => res.send(result))
        .catch(err => {
            res.statusMessage = err.message;
            res.status(400).end();
        });
});

module.exports = router;