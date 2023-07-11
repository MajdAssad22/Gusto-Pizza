//-- REQUIREMENTS
const mysql = require('mysql');
const dotenv = require('dotenv')

//-- DATABASE CLASS
module.exports = class Database{

    // The database class constructor
    constructor(){
        this.connection = mysql.createConnection({
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
        });
        // connect to the database
        this.connection.connect();
    }
    
    // A function that executes the given query
    executeQuery = (query) => {
        return new Promise((resolve, reject) => {
            this.connection.query(query, function (err, result, fields) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
}