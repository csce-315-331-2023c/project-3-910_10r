const express = require("express");
const cors = require("cors");
const pool = require("./db");
const queries = require("./reports/queries");

// const path = require('path');
const app = express();
const cashierRouter = require('./cashier/routers')
const reportRouter = require('./reports/routers')

app.use(cors());
app.use(express.json());
const port = 8000;

process.on("SIGINT", function () {
  pool.end();
  console.log("Application successfully shutdown");
  process.exit(0);
});

/**
 * Responds with a message confirming the server is running.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
app.get('/', (req, res) => {
  res.send('Server running!');
});

app.use('/cashier', cashierRouter)

app.use('/report', reportRouter)

// gets the manager boolean based on a given username and password
/**
 * Retrieves the manager boolean based on a given username and password.
 * @function login
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
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

/**
 * Checks the log in name for oauth
 * @function oauth
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/oauth", (req, res) => {
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

/**
 * Gets all inventory items
 * @function inventory
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/inventory", (req, res) => {
  let command = "SELECT name, alert, amount, capacity, unit, topping FROM inventory ORDER BY name;";
    
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

/**
 * Updates alerts appropriately
 * @function updateAlert
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
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

/**
 * Deletes an item from the inventory
 * @function deleteItem
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
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

/**
 * Edit an item in the inventory
 * @function editItem
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.put("/inventory/editItem", (req, res) => {
  const itemName = req.query.parameter; // The name of the item to be edited
  const editedItem = req.body; // Assuming you pass the edited item data in the request body as JSON

  const { name, amount, capacity, unit, topping } = editedItem;

  // Create a SQL command to update the inventory item
  const command = `UPDATE inventory SET name=$1, amount=$2, capacity=$3, unit=$4, topping=$5 WHERE name=$6;`;
  const values = [name, amount, capacity, unit, topping, itemName];

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

/**
 * Create a route for adding a new item to the inventory
 * @function addItem
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.post("/inventory/addItem", (req, res) => {
  const { name, amount, capacity, unit, alert, topping } = req.body;

  // Construct the SQL query to insert a new item into the inventory
  const command = `
    INSERT INTO inventory (name, amount, capacity, unit, alert, topping)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;
  const values = [name, amount, capacity, unit, alert, topping];

  // Execute the query
  pool.query(command, values)
    .then((query_res) => {
      // Send a success response or any other data you need
      res.status(200).json({ message: "Item added successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "An error occurred when adding an item to the inventory",
      });
    });
});

/**
 * Gets all categories and their associated drinks
 * @function drinkCategoryAndDrinks
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
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

/**
 * Gets all the employees for the employee page
 * @function employeesNames
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/employees/names", (req, res) => {
  let command = "SELECT * FROM employee WHERE manager = false;";
  let names = [];
  pool
    .query(command)
    .then((query_res) => {
      for (let i = 0; i < query_res.rowCount; i++) {
        names.push(query_res.rows[i].name);
      }
      res.send(names);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when retrieving employee names from database",
      });
    });
});

/**
 * Gets all the managers for the employee page
 * @function managersNames
 * @param {object} res - The response object
 */
app.get("/managers/names", (req, res) => {
  let command = "SELECT * FROM employee WHERE manager = true;";
  let names = [];
  pool
    .query(command)
    .then((query_res) => {
      for (let i = 0; i < query_res.rowCount; i++) {
        names.push(query_res.rows[i].name);
      }
      res.send(names);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when retrieving manager names from database",
      });
    });
});

/**
 * Gets the information about an employee for popup on employee page
 * @function employeesInfo
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/employees/info", (req, res) => {
  let command = "SELECT * FROM employee WHERE name = '" + req.query.name + "';";
  //arraylist of strings
  let info = {};
  pool
    .query(command)
    .then((query_res) => {
      if(query_res.rowCount != 0) {
        res.send(query_res.rows[0]);
      }
      else {
        res.send(-1);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when retrieving employee info from database",
      });
    });
});

/**
 * Updates employee database for edited employee
 * @function employeesEdit
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.put("/employees/edit", (req, res) => {
  // Extract the updated data from the request body
  const { name, position, hoursPerWeek, hourlyPay } = req.body;

  // Construct an SQL query to update the employee's information
  const command = "UPDATE employee SET hours = " + hoursPerWeek + ", pay = " + hourlyPay + ", manager = " + position + " WHERE name = '"
  + name + "'";

  pool
    .query(command) //, [hoursPerWeek, hourlyPay, position, name]
    .then((query_res) => {
      if (query_res.rowCount === 1) {
        // The update was successful
        res.sendStatus(204); // No Content
      } else {
        res.status(404).json({
          error: "Employee not found",
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when updating employee info in the database",
      });
    });
});

/**
 * Add new employee to database
 * @function employeesAdd
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.put("/employees/add", (req, res) => {
  // Extract the updated data from the request body
  const { name, position, password, hoursPerWeek, hourlyPay } = req.body;

  // Construct an SQL query to update the employee's information
  const command = "SELECT setval(pg_get_serial_sequence('employee','id'), coalesce(max(id)+1, 1), false) FROM employee;" 
           + " INSERT INTO employee (name, password, pay, hours, manager) VALUES ('" + name
          + "','" + password + "'," + hourlyPay + "," + hoursPerWeek + "," + position + ")";

  pool
    .query(command) //, [hoursPerWeek, hourlyPay, position, name]
    .then((query_res) => {
        res.sendStatus(204); // No Content
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when adding employee info in the database",
      });
    });
});

/**
 * Remove employee from database
 * @function employeesRemove
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.put("/employees/remove", (req, res) => {
  // Extract the updated data from the request body
  const { name } = req.body;

  // Construct an SQL query to update the employee's information
  const command = "DELETE FROM employee WHERE name ='" + name + "'";

  pool
    .query(command) //, [hoursPerWeek, hourlyPay, position, name]
    .then((query_res) => {
        res.sendStatus(204); // No Content
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when removing employee from the database",
      });
    });
});

//get order history from filter
/**
 * Get order history from filter
 * @function filter
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/orderHistory/filter", (req, res) => {
  const { startDate, endDate, drink, minPrice, maxPrice, page, pageSize } = req.query;
  const offset = (page - 1) * pageSize;

  const today = "'" + new Date().toISOString().split('T')[0] + "'";
  const adjustedEndDate = endDate !== "NULL" ? endDate : today;

  // Use parameterized queries and logical operators
  let command = "SELECT * FROM orders WHERE " +
    "( (" + startDate + " IS NULL OR date >= " + startDate + ") AND (" + adjustedEndDate + " IS NULL OR date <= " + adjustedEndDate + ") ) " +
    "AND (" + drink + " IS NULL OR " + drink + " = ANY(drink_id)) " +
    "AND (" + minPrice + " IS NULL OR cost >= " + minPrice + ") " +
    "AND (" + maxPrice + " IS NULL OR cost <= " + maxPrice + ") " +
    "ORDER BY date DESC " + 
    "LIMIT " + pageSize + " OFFSET " +  offset;

  // array to hold results
  let filtered = [];

  pool
    .query(command)
    .then((query_res) => {
      filtered.push(...query_res.rows); // Push all rows into the 'filtered' array
      res.send(filtered);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when retrieving order history filtered from the database",
      });
    });
});

/**
 * Get all order history from database
 * @function totalOrderHistory
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/orderHistory/total", (req, res) => {
  const { page, pageSize } = req.query;
  const offset = (page - 1) * pageSize; // Calculate the offset for pagination

  const today = new Date().toISOString().split('T')[0];

  // Adjust SQL query to include pagination
  let command = `SELECT * FROM orders WHERE date <= '${today}'`;
  command += `ORDER BY date DESC, time ASC`;
  command += ` LIMIT ${pageSize} OFFSET ${offset}`; // Add LIMIT and OFFSET

  const filtered = [];

  pool
    .query(command)
    .then((query_res) => {
      filtered.push(...query_res.rows); // Use push to add rows to the array
      res.send(filtered);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when retrieving order history from the database",
      });
    });
});

/**
 * Gets drinkNames from recipes
 * @function drinknames
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/managers/drinknames", (req, res) => {
  let command = "SELECT drinkname, recipeid FROM recipes;";
  const drinks = [];
  pool
    .query(command)
    .then((query_res) => {
      drinks.push(...query_res.rows);
      res.send(drinks);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting drinks from recipes",
      });
    });
});

/**
 * Gets specific drinkid from recipes db
 * @function drinkid
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/managers/drinkid", (req, res) => {
  const { drink } = req.query;
  let command = "SELECT recipeid FROM recipes WHERE drinkname = '" + drink + "'";

  pool
    .query(command)
    .then((query_res) => {
      if (Array.from(query_res.rows).length === 0) {
        res.status(404).json({
          error: "Drink not found",
        });
      } else {
        const drinkid = query_res.rows[0].recipeid;
        res.send({ drinkid });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the drink id from recipes",
      });
    });
});

/**
 * Gets specific drinkname from recipes
 * @function drinkNameandPrice
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/managers/drinkNameandPrice", (req, res) => {
  const { drink } = req.query;
  let command = "SELECT drinkname, price FROM recipes WHERE recipeid = '" + drink + "'";
  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        res.status(404).json({
          error: "Drink not found",
        });
      } else {
        res.send(query_res.rows[0]);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the drink id from recipes",
      });
    });
});

/**
 * Gets multiple drinkids from recipes
 * @function drinkids
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/managers/drinkids", (req, res) => {
  const { drinks } = req.query;
  // Ensure that "drinks" is an array
  if (!Array.isArray(drinks)) {
    return res.status(400).json({
      error: "Invalid request. 'drinks' should be an array of drink names.",
    });
  }

  // Create a parameterized query with the IN clause
  const values = drinks.map((drink) => `'${drink}'`).join(", ");
  const command = `SELECT recipeid, drinkname FROM recipes WHERE drinkname IN (${values})`;

  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        res.status(404).json({
          error: "Drinks not found",
        });
      } else {
        const drinkData = query_res.rows.map((row) => ({
          recipeid: row.recipeid,
          drinkname: row.drinkname,
        }));
        res.send(drinkData);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the drink IDs from recipes",
      });
    });
});

/**
 * Gets drinkids in specific time range for what sales together from orders
 * @function whatSalesTogether2
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/managers/whatSalesTogether", (req, res) => {
  const { beginningDate, endDate } = req.query;
  let command = "SELECT drink_id FROM orders WHERE date >= '" + beginningDate + "' AND date <= '"
  + endDate + "' GROUP BY drink_id HAVING array_length(drink_id, 1) > 1"; 
  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        res.status(404).json({
          error: "Drink not found",
        });
      } else {
        const orderData = [];
        orderData.push(...query_res.rows);
        res.send(orderData);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the drink id from recipes",
      });
    });
});

/**
 * Gets order data for excess report
 * @function orderData2
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/reports/getExcessReport/orderData", (req, res) => {
  const { beginningDate, endDate } = req.query;
  let command = "SELECT drink_id FROM orders WHERE date >= '" + beginningDate + "' AND date <= '"
  + endDate + "'"; 
  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        res.status(404).json({
          error: "Drink not",
        });
      } else {
        const orderData = [];
        orderData.push(...query_res.rows);
        res.send(orderData);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the order data",
      });
    });
});

/**
 * Gets recipe data for excess report of ingredients
 * @function recipeData
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/reports/getExcessReport/recipeData", (req, res) => {
  const { drink } = req.query;
  let command =  "SELECT ingredient_names, ingredient_values FROM recipes WHERE recipeid = "
  + drink;
  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        res.status(404).json({
          error: "Drink not found",
        });
      } else {
        const recipeData = query_res.rows.map((row) => ({
          ingredientNames: row.ingredient_names,
          ingredientValues: row.ingredient_values,
        }));
        res.send(recipeData);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the ingredients from recipes",
      });
    });
});

/**
 * Gets information about ingredients from inventory for excess report
 * @function inventoryInfo
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/reports/getExcessReport/inventoryInfo", (req, res) => {
  const { drink } = req.query;
  let command =  "SELECT name, amount FROM inventory";
  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        res.status(404).json({
          error: "Inventory error",
        });
      } else {
        const inventoryData = query_res.rows.map((row) => ({
          name: row.name,
          amount: row.amount,
        }));
        res.send(inventoryData);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting inventory info",
      });
    });
});

/**
 * Gets drinkids in specific time range for what sales together
 * @function whatSalesTogether
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/managers/whatSalesTogether", (req, res) => {
  const { beginningDate, endDate } = req.query;
  let command = "SELECT drink_id FROM orders WHERE date >= '" + beginningDate + "' AND date <= '"
  + endDate + "' GROUP BY drink_id HAVING array_length(drink_id, 1) > 1"; 
  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        res.status(404).json({
          error: "Drink not found",
        });
      } else {
        const orderData = [];
        orderData.push(...query_res.rows);
        res.send(orderData);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the drink id from recipes",
      });
    });
});

/**
 * Gets order data for excess report about drinkid
 * @function orderData
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/reports/getExcessReport/orderData", (req, res) => {
  const { beginningDate, endDate } = req.query;
  let command = "SELECT drink_id FROM orders WHERE date >= '" + beginningDate + "' AND date <= '"
  + endDate + "'"; 
  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        res.status(404).json({
          error: "Drink not",
        });
      } else {
        const orderData = [];
        orderData.push(...query_res.rows);
        res.send(orderData);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the order data",
      });
    });
});

  /**
 * Gets recipe data of ingredient names for excess report
 * @function recipeData
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/reports/getExcessReport/recipeData", (req, res) => {
  const { drink } = req.query;
  let command =  "SELECT ingredient_names, ingredient_values FROM recipes WHERE recipeid = "
  + drink;
  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        res.status(404).json({
          error: "Drink not found",
        });
      } else {
        const recipeData = query_res.rows.map((row) => ({
          ingredientNames: row.ingredient_names,
          ingredientValues: row.ingredient_values,
        }));
        res.send(recipeData);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the ingredients from recipes",
      });
    });
});

/**
 * Gets information about inventory for excess report
 * @function inventoryInfo2
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/reports/getExcessReport/inventoryInfo", (req, res) => {
  const { drink } = req.query;
  let command =  "SELECT name, amount FROM inventory";
  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
        res.status(404).json({
          error: "Inventory error",
        });
      } else {
        const inventoryData = query_res.rows.map((row) => ({
          name: row.name,
          amount: row.amount,
        }));
        res.send(inventoryData);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting inventory info",
      });
    });
});

/**
 * Gets all info on a specific drink in recipes
 * @function recipesDrink
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/recipes/drink", (req, res) => {
  const { drink } = req.query;
  const command = "SELECT ingredient_names, ingredient_values, price, category FROM recipes WHERE drinkname = $1";
  pool
    .query(command, [drink])
    .then((query_res) => {
      res.send(query_res.rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the drink id from recipes",
      });
    });
});

// gets the unit of an item
/**
 * Gets the unit of an item from inventory
 * @function drinkItemUnit
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/recipes/drinkItemUnit", (req, res) => {
  const { drink } = req.query;
  const command = "SELECT unit FROM inventory WHERE name = $1";
  pool
    .query(command, [drink])
    .then((query_res) => {
      res.send(query_res.rows[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting the drink id from recipes",
      });
    });
});

// Delete a recipe
/**
 * Deletes a recipe 
 * @function recipesDelete
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.delete("/recipes/delete", (req, res) => {
  const drink = req.query.parameter; // Get the item name from the query parameter

  const command = `DELETE FROM recipes WHERE drinkname = $1;`;
  const values = [drink]; // Use an array to specify the parameter values

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

// edit a recipe
/**
 * Edits a recipe in the database
 * @function recipesEdit
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.put("/recipes/edit", (req, res) => {
  const drink = req.query.parameter; // The name of the item to be edited
  const editedItem = req.body; // Assuming you pass the edited item data in the request body as JSON

  const { drinkname, ingredient_names, ingredient_values, price, category } = editedItem;

  // Create a SQL command to update the inventory item
  const command = `UPDATE recipes SET drinkname=$1, ingredient_names=$2, ingredient_values=$3, price=$4, category=$5 WHERE drinkname=$6;`;
  const values = [drinkname, ingredient_names, ingredient_values, price, category, drink];

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

/**
 * Creates a route for adding a new item to the inventory
 * @function recipesAdd
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.post("/recipes/add", async (req, res) => {
  try {
    // Get the count of items in the recipes table
    const countQuery = 'SELECT COUNT(*) AS recipecount FROM recipes';
    const countResult = await pool.query(countQuery);
    const recipeCount = parseInt(countResult.rows[0].recipecount);

    console.log("Type of countResult:", typeof countResult);
    console.log("Count of recipes:", countResult.rows[0].recipeCount);
    if (isNaN(recipeCount)) {
      throw new Error('Count of recipes is not a valid number');
    }

    const nextRecipeId = recipeCount + 1;
    

    const { drinkname, ingredient_names, ingredient_values, price, category } = req.body;

    // Construct the SQL query to insert a new item into the inventory
    const command = `
      INSERT INTO recipes (recipeid, drinkname, ingredient_names, ingredient_values, price, category)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;
    const values = [nextRecipeId, drinkname, ingredient_names, ingredient_values, price, category];

    // Execute the query
    await pool.query(command, values);

    // Send a success response
    res.status(200).json({ message: "Item added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred when adding an item to the inventory",
    });
  }
});

// gets all toppings
/**
 * Gets all toppings from inventory
 * @function customerToppings
 * @param {object} req - The request object containing query parameters
 * @param {object} res - The response object
 */
app.get("/customer/toppings", (req, res) => {

  const command = "SELECT name FROM inventory WHERE topping = true;";
  pool
    .query(command)
    .then((query_res) => {
      res.send(query_res.rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when getting toppings from inventory",
      });
    });
});

app.listen(port, () => {
  console.log("server is running on " + port);
});