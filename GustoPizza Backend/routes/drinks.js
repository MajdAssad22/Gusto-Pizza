//-- REQUIREMENTS
const express = require('express');
const Database = require('../database');

//-- VARIABLES
var dbConnection = new Database();
var router = express.Router();

//-- API
// Gets all the drinks
router.get('/', function(req, res, next) {
    let selectDrinksQuery=
    `SELECT * 
    FROM drinks`;

    dbConnection.executeQuery(selectDrinksQuery)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.statusMessage = err.message;
            res.status(400).end();
        });
});

module.exports = router;