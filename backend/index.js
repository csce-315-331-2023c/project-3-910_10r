const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

const { Pool } = require("pg");
const dotenv = require("dotenv").config();

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: { rejectUnauthorized: false },
});

process.on("SIGINT", function () {
  pool.end();
  console.log("Application successfully shutdown");
  process.exit(0);
});

// gets the price for a specific drink whose name is passed in via parameter
app.get("/cashier/price*", (req, res) => {
  let command =
    "SELECT price FROM recipes where drinkname = '" +
    req.query.parameter +
    "';";
  pool.query(command).then((query_res) => {
    res.send(query_res.rows[0].price);
  });
});

// gets all the categories for the display bar
app.get("/cashier/drinkCategory", (req, res) => {
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
app.get("/cashier/drinkAndCategories", (req, res) => {
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

// gets the manager boolean based on a given username and password
app.get("/login", (req, res) => {
    let command = "SELECT manager FROM employee WHERE " + req.query.parameter +";";
      
    pool.query(command)
    .then((query_res) => {
      if(query_res.rowCount != 0) {
        res.send(query_res.rows[0].manager);
      }
      else {
        res.sendStatus(500);
      } 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "An error occurred when determining manager status from employees",
      });
    });
})

// gets all inventory items
app.get("/inventory", (req, res) => {
  let command = "SELECT name, alert, amount, capacity, unit FROM inventory;";
    
  pool.query(command)
  .then((query_res) => {
    res.send(query_res.rows);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({
      error: "An error occurred when retrieving inventory items",
    });
  });
})

// updates alerts appropiately
app.put("/inventory/updateAlert", (req, res) => {
  const itemName = req.query.parameter;
  const newAlertValue = req.body.alert; // Assuming you pass the new alert value in the request body as JSON

  const command = `UPDATE inventory SET alert=$1 WHERE name=$2;`;
  const values = [newAlertValue, itemName];

  pool.query(command, values)
    .then((query_res) => {
      //console.log(query_res);
      res.status(200).json({ message: 'Alert updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "An error occurred when updating the alert of an inventory item",
      });
    });
});

// Delete an item from the inventory
app.delete("/inventory/deleteItem", (req, res) => {
  const itemName = req.query.parameter; // Get the item name from the query parameter

  const command = `DELETE FROM inventory WHERE name = $1;`;
  const values = [itemName]; // Use an array to specify the parameter values

  pool.query(command, values)
    .then((query_res) => {
      res.status(200).json({ message: 'Item deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "An error occurred when deleting the inventory item",
      });
    });
});

// edit an item in the invetory
app.put("/inventory/editItem", (req, res) => {
  const itemName = req.query.parameter; // The name of the item to be edited
  const editedItem = req.body; // Assuming you pass the edited item data in the request body as JSON

  const { name, amount, capacity, unit } = editedItem;

  // Create a SQL command to update the inventory item
  const command = `UPDATE inventory SET name=$1, amount=$2, capacity=$3, unit=$4 WHERE name=$5;`;
  const values = [name, amount, capacity, unit, itemName];

  pool.query(command, values)
    .then((query_res) => {
      res.status(200).json({ message: 'Inventory item updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "An error occurred when updating the inventory item",
      });
    });
});

// Get all categories and their associated drinks
app.get("/menus/drinkCategoryAndDrinks", (req, res) => {
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

      // Send both categories and drinks as a response
      res.send({
        categories: Object.keys(categoryMap),
        drinks: categoryMap,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when selecting categories and drinks from recipes",
      });
    });
});

// app.get("/api", (req, res) => {
//   res.json("user1");
// });

app.listen(port, () => {
  console.log("server is running on port" + port);
});

// module.exports = app;