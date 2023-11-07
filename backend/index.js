const express = require("express");
const cors = require("cors");

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

app.listen(port, () => {
  console.log("server is running on " + port);
});

// module.exports = app;