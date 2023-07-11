const Database = require('../database');
const moment = require('moment');
var dbConnection = new Database();

const getPizza = (pizza) => {
    return new Promise((resolve, reject) =>{
        var selectToppingsQuery=
        `SELECT toppings.ToppingId, ToppingName, ToppingPrice
        FROM pizzas 
        LEFT JOIN topping_pizza ON pizzas.PizzaId = topping_pizza.PizzaId
        LEFT JOIN toppings ON topping_pizza.ToppingId = toppings.ToppingId
        WHERE pizzas.PizzaId = ${pizza.PizzaId}`;

        dbConnection.executeQuery(selectToppingsQuery)
        .then(toppings => {
            var json = {
                "PizzaId": pizza.PizzaId,
                "Quantity": pizza.Quantity,
                "Size": {
                    "SizeId": pizza.SizeId,
                    "SizeName": pizza.SizeName,
                    "SizePrice": pizza.SizePrice
                },
                "Toppings": toppings
            };
            resolve(json)})
        .catch(err => reject(err));
    })
}

const getOrder = (order) => {
    var promises = [];
    //GET PIZZAS IN THIS ORDER
    var pizzaPromise = new Promise((resolve, reject) => {
        var selectPizzasQuery=
        `SELECT pizzas.PizzaId, pizzas.SizeId, Quantity, pizza_size.SizeName, pizza_size.SizePrice
        FROM pizzas 
        INNER JOIN pizza_size
        ON pizzas.SizeId = pizza_size.SizeId
        WHERE OrderId = ${order.OrderId}`;

        dbConnection.executeQuery(selectPizzasQuery)
        .then(pizzas => {
            //GET THE TOPPINGS AND SIZE FOR EACH PIZZA
            toppingPromises = []
            pizzas.forEach(pizza => {
                toppingPromises.push(getPizza(pizza));
            });
            Promise.all(toppingPromises)
                        .then(pizzas => resolve(pizzas))
                        .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
    //GET ALL THE DRINKS FOR THIS ORDER
    var drinkPromise = new Promise((resolve, reject) => {
        var selectDrinksQuery=
        `SELECT drinks.DrinkId, DrinkName, DrinkPrice, order_drink.Quantity
        FROM order_drink 
        INNER JOIN drinks
        ON order_drink.DrinkId = drinks.DrinkId 
        WHERE OrderId = ${order.OrderId}`;

        dbConnection.executeQuery(selectDrinksQuery)
        .then(drinks => resolve(drinks))
        .catch(err => reject(err));
    });
    promises.push(pizzaPromise);
    promises.push(drinkPromise);
    return new Promise((resolve, reject) => {
        Promise.all(promises)
        .then((result) => resolve(
            {"OrderId": order.OrderId,
            "IsDone": order.IsDone,
            "DateOfOrder": moment(order.DateOfOrder).format('DD/MM/YYYY HH:mm'),
            "Pizzas": result[0],
            "Drinks": result[1]}
        ))
        .catch((err) => reject(err));
    });
}

const addPizza = (pizza, orderId) => {
    return new Promise((resolve, reject) =>{
        var addPizzaQuery=
        `INSERT INTO pizzas (OrderId, SizeId, Quantity) 
        VALUES ('${orderId}', '${pizza.Size.SizeId}', '${pizza.Quantity}');`;

        dbConnection.executeQuery(addPizzaQuery)
        .then(result => {
            let toppingPromises = [];
            pizza.Toppings.forEach(topping => {
                toppingPromises.push(addToppingToPizza(topping, result.insertId));
            });
            Promise.all(toppingPromises)
                .then(resolve(result));
        })
        .catch(err => reject(err));
    })
}

const addToppingToPizza = (topping, pizzaId) => {
    return new Promise((resolve, reject) =>{
        var addToppingQuery=
        `INSERT INTO topping_pizza (PizzaId, ToppingId) 
        VALUES ('${pizzaId}', '${topping.ToppingId}');`;

        dbConnection.executeQuery(addToppingQuery)
        .then(result => resolve(result))
        .catch(err => reject(err));
    })
}

const addDrink = (drink, orderId) => {
    return new Promise((resolve, reject) =>{
        var addDrinkQuery=
        `INSERT INTO order_drink (OrderId, DrinkId, Quantity) 
        VALUES ('${orderId}', '${drink.DrinkId}', '${drink.Quantity}');`;

        dbConnection.executeQuery(addDrinkQuery)
        .then(result => resolve(result))
        .catch(err => reject(err));
    })
}

module.exports = { getOrder, getPizza, addDrink, addPizza }