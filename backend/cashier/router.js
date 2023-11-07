const {Router} = require('express')
const controller = require('./controller')
const pool = require('../db')
const router = Router()

router.get('/price', controller.getPriceByDrink)
  
// gets all the categories for the display bar
router.get("/drinkCategory", (req, res) => {
let command = "SELECT DISTINCT category from recipes;";
let categories = [];
pool
    .query(command)
    .then((query_res) => {
    for (let i = 0; i < query_res.rowCount; i++) {
        categories.push(query_res.rows[i].category);
    }
    res.send(categories);
    })
    .catch((error) => {
    console.error(error);
    res.status(500).json({
        error: "An error occurred when selecting categories from recipes",
    });
    });
});
  
// gets all the categories and drinks and send it as a dictionary
router.get("/drinkAndCategories", (req, res) => {
let command = "SELECT category, drinkname FROM recipes;";
const categoryMap = {};
pool
    .query(command)
    .then((query_res) => {
    query_res.rows.forEach((row) => {
        const category = row.category;
        const drinkname = row.drinkname;

        if (category in categoryMap) {
        categoryMap[category].push(drinkname);
        } else {
        categoryMap[category] = [drinkname];
        }
    });
    res.send(categoryMap);
    })
    .catch((error) => {
    console.error(error);
    res.status(500).json({
        error: "An error occurred when selecting categories from recipes",
    });
    });
});

router.post("/updateInventory", controller.updateInventory);
router.post("/restoreInventory", controller.restoreInventory);

module.exports = router