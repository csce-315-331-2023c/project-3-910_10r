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

// app.get("/api", (req, res) => {
//   res.json("user1");
// });

app.listen(port, () => {
  console.log("server is running on port" + port);
});

// module.exports = app;