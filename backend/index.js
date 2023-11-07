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



// app.get("/api", (req, res) => {
//   res.json("user1");
// });

app.listen(port, () => {
  console.log("server is running on port" + port);
});

// module.exports = app;