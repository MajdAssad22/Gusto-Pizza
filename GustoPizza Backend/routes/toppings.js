//-- REQUIREMENTS
const express = require('express');
const Database = require('../database');

//-- VARIABLES
var dbConnection = new Database();
var router = express.Router();

//-- API
// Gets all the toppings
router.get('/', function(req, res, next) {
    let selectToppingsQuery=
    `SELECT * 
    FROM toppings`;

    dbConnection.executeQuery(selectToppingsQuery)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.statusMessage = err.message;
            res.status(400).end();
        });;
});

module.exports = router;