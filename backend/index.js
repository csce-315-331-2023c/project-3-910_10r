const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const cashierRouter = require('./cashier/router')
const reportRouter = require('./reports/router')

app.use(cors());
app.use(express.json());
const port = 8000;

process.on("SIGINT", function () {
  pool.end();
  console.log("Application successfully shutdown");
  process.exit(0);
});

app.get('/', (req, res) => {
  res.send('Server running!');
});

app.use('/cashier', cashierRouter)
app.use('/report', reportRouter)

// gets the manager boolean based on a given username and password
app.get("/login", (req, res) => {
    let command = "SELECT manager FROM employee WHERE " + req.query.parameter +";";
      
    pool.query(command)
    .then((query_res) => {
      if(query_res.rowCount != 0) {
        res.send(query_res.rows[0].manager);
      }
      else {
        res.send(-1);
      } 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "An error occurred when determining manager status from employees",
      });
    });
})


// gets all the employees for the employee page
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

// gets all the managers for the employee page
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


//get the information about an employee for popup on employee page
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

//update employee database for edited employee
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

//add new employee
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

//remove employee
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
app.get("/orderHistory/filter", (req, res) => {
  const { startDate, endDate, drink, minPrice, maxPrice, page, pageSize } = req.query;
  const offset = (page - 1) * pageSize;

  // Use parameterized queries and logical operators
  let command = "SELECT * FROM orders WHERE " +
    "( (" + startDate + " IS NULL OR date >= " + startDate + ") AND (" + endDate + " IS NULL OR date <= " + endDate + ") ) " +
    "AND (" + drink + " IS NULL OR " + drink + " = ANY(drink_id)) " +
    "AND (" + minPrice + " IS NULL OR cost >= " + minPrice + ") " +
    "AND (" + maxPrice + " IS NULL OR cost <= " + maxPrice + ") " +
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

//get all order history from db
app.get("/orderHistory/total", (req, res) => {
  const { page, pageSize } = req.query;
  const offset = (page - 1) * pageSize; // Calculate the offset for pagination

  // Adjust SQL query to include pagination
  let command = "SELECT * FROM orders";
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


//gets drinkNames from recipes
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

//gets specific drinkid
app.get("/managers/drinkid", (req, res) => {
  const { drink } = req.query;
  let command = "SELECT recipeid FROM recipes WHERE drinkname = '" + drink + "'";

  pool
    .query(command)
    .then((query_res) => {
      if (query_res.rows.length === 0) {
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

//gets specific drinkName
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

//gets multiple:
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







// app.get("/api", (req, res) => {
//   res.json("user1");
// });

app.listen(port, () => {
  console.log("server is running on " + port);
});

// module.exports = app;