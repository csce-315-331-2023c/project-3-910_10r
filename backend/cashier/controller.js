const pool = require('../db')
const queries = require('./queries')

// gets the price for a specific drink whose name is passed in via parameter
const getPriceByDrink = (req, res) => {
    const drink = req.query.drink;
    pool.query(queries.getPriceByDrink, [drink], (error, results) => {
        console.log(queries.getPriceByDrink);
        // if(error) throw error;
        // res.send(results.rows[0].price);
        // console.log(results);
        if (error) {
            // Handle the error gracefully, e.g., by sending an error response
            console.error("Error fetching price:", error);
            res.status(500).json({ error: "An error occurred while fetching the price." });
        } else {
            if (results.length > 0) {
                const price = results[0].price;
                res.status(200).json({ price });
            } else {
                res.status(404).json({ error: "Drink not found" });
            }
        }
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
        if (error) {
            // Handle the error gracefully, e.g., by sending an error response
            console.error("Error fetching price:", error);
            res.status(500).json({ error: "An error occurred while fetching the price." });
        } else {
        res.send('Recipe ingredients updated successfully');
        console.log(results);
        }
    })

    pool.query(queries.updateIce, [ice], (error, results) => {
        if (error) {
            // Handle the error gracefully, e.g., by sending an error response
            console.error("Error fetching price:", error);
            res.status(500).json({ error: "An error occurred while fetching the price." });
        } else {
        res.send('Updated ice successfully');
        console.log(results);
        }
    })

    pool.query(queries.updateToppings, [topping, count], (error, results) => {
        if (error) {
            // Handle the error gracefully, e.g., by sending an error response
            console.error("Error fetching price:", error);
            res.status(500).json({ error: "An error occurred while fetching the price." });
        } else {
        res.send('Toppings updated successfully');
        console.log(results)
        }
    })
}

const restoreInventory = (req, res) => {
    const {name, ice, sugar, topping, count} = req.body;
    //get recipe from drink name
    //update inventory based on ingredients, ice, sugar, topping array
    pool.query(queries.restoreRecipeItems, [name, sugar], (error, results) => {
        if(error) throw error;
        res.send('Recipe ingredients updated successfully');
        console.log(results);
    })

    pool.query(queries.restoreIce, [ice], (error, results) => {
        if(error) throw error;
        res.send('Updated ice successfully');
        console.log(results);
    })

    pool.query(queries.restoreToppings, [topping, count], (error, results) => {
        if(error) throw error;
        res.send('Toppings updated successfully');
        console.log(results)
    })
}

module.exports = {
    getPriceByDrink,
    updateInventory,
    restoreInventory,
};

