# Gusto Pizza Website
## Overview
A website for a pizzeria called Gusto Pizza, where customers can login and order their desired types of pizza with different sizes, toppings and beverages.

## Key Features
- Basic register and login authentication
- Custom orders

## Technologies Used
- HTML, CSS and Typescript 
- Angular and NodeJs
- MySql

## Project Structure
- You have two folders one for the front-end (GustoPizza Frontend) and one for the back-end (GustoPizza Backend).
- The frontend is done using Angular so the file structure is according to that.
- In the backend folder there are two extra folders "routes" and "utils", routes folder includes all the routes and their code, while utils folder include all extra helping functions.   

## How to Run
You must do two things:
* Start the frontend:
  * Navigate to "GustoPizza Frontend" folder
  * Install all the libraries used in frontend using `npm install`
  * Start the app `ng serve`
  
* Start the backend:
  * Navigate to "GustoPizza Backend" folder
  * Install all the libraries used in backend using `npm install`
  * Add the .env file in the backend folder (GustoPizza Backend) and write in it the following:
  ```
  DB_HOST="127.0.0.1"
  DB_USER="{the_user}"
  DB_PASSWORD="{the_password}"
  DB_NAME="gustopizzadb"
  ```
  (Change the_user and the_password according to your database)
  * Start the server `node index.js`

## Acknowledgments
External libraries:
- Bootstrap, ngx-bootstrap, bootstrap-icons
- Express, Moment, Mysql

Contributers:
- Majd Assad
- Mohamed Sayed Ahmed

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
