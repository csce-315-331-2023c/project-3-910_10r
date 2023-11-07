const pool = require('../db')
const queries = require('./queries')

// gets the price for a specific drink whose name is passed in via parameter
const getPriceByDrink = (req, res) => {
    const drink = toString(req.params.drink)
    pool.query(queries.getPriceByDrink, [drink], (error, results) => {
        if(error) throw error;
        res.send(results.rows[0].price);
        console.log(results);
    });
};

// interface back_end_order {
    // name: string;
    // ice: number;
    // sugar: number;
    // topping: string[];
    // count: number[];
    // }
const updateInventory = (req, res) => {
    const {name, ice, sugar, topping, count} = req.body;
    //get recipe from drink name
    //update inventory based on ingredients, ice, sugar, topping array
    pool.query(queries.updateRecipeItems, [name, sugar], (error, results) => {
        if(error) throw error;
        res.send('Recipe ingredients updated successfully');
        console.log(results);
    })

    pool.query(queries.updateIce, [ice], (error, results) => {
        if(error) throw error;
        res.send('Updated ice successfully');
        console.log(results);
    })

    pool.query(queries.updateToppings, [topping, count], (error, results) => {
        if(error) throw error;
        res.send('Toppings updated successfully');
        console.log(results)
    })
}

module.exports = {
    getPriceByDrink,
    updateInventory,
};

