const { Router } = require("express");
const controller = require("./controller");
const queries = require("./queries");
const pool = require("../db");
const router = Router();
// middleware that is specific to this router

// router.use((req, res, next) => {
//   // res.send("Cashier router loaded");
//   next()
// })

router.get("/price", controller.getPriceByDrink);
router.get("/getDefaultToppingsByDrink", controller.getDefaultToppingsByDrink);
router.get("/getLowIngredientForDrink", controller.getLowIngredientForDrink);

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

router.get("/getLowDrinkNames", (req, res) => {
  let command =
    "SELECT DISTINCT drinkname FROM recipes JOIN inventory ON inventory.name = ANY(recipes.ingredient_names) WHERE inventory.alert = true;";

  let names = [];
  pool
    .query(command)
    .then((query_res) => {
      for (let i = 0; i < query_res.rowCount; i++) {
        names.push(query_res.rows[i].drinkname);
      }
      res.send(names);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error:
          "An error occurred when getting drink names whose ingredients are low",
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

router.get("/toppings", (req, res) => {
  let command = "SELECT name, alert FROM inventory WHERE topping = true;";
  const toppings = {};
  pool.query(command).then((query_res) => {
    query_res.rows.forEach((row) => {
      const topping = row.name;
      toppings[topping] = row.alert;
    });
    res.send(toppings);
  });
});

router.get("/drinknames", (req, res) => {
  let command = "SELECT drinkname FROM recipes;";
  const drinknames = [];
  pool
    .query(command)
    .then((query_res) => {
      query_res.rows.forEach((row) => {
        const drinkname = row.drinkname;
        drinknames.push(drinkname);
      });
      res.send(drinknames);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred when selecting categories from recipes",
      });
    });
});

router.put("/updateInventory", (req, res) => {
  const { name, ice, sugar, topping, count } = req.body;
  // console.log(name)
  // console.log(ice)
  // console.log(sugar)
  // console.log(topping)
  // console.log(count)
  //get recipe from drink name
  //update inventory based on ingredients, ice, sugar, topping array

  pool.query(queries.updateRecipeItems, [sugar, name])
    .then((query_res) => {
      // res.status(200).json({ message: 'Recipe ingredients updated successfully' });
      console.log('Recipe ingredients updated successfully');
    })
    .catch((err) => {
      console.error(err);
      console.log("Error subtracting recipe ingredients");
      // res.status(500).json({
      //   error: "Error subtracting recipe ingredients",
      // });
    });
  // pool.query(queries.updateRecipeItems, [sugar, name], (error, results) => {
  //   console.log(queries.updateRecipeItems);
  //   if (error) {
  //     // Handle the error gracefully, e.g., by sending an error response
  //     console.error("Error subtracting recipe ingredients", error);
  //     res.status(500).json({
  //       error: "An error occurred while subtracting recipe ingredients.",
  //     });
  //   } else {
  //     // res.send('Recipe ingredients updated successfully');
  //     console.log(results);
  //   }
  // });

  pool.query(queries.updateIce, [ice])
    .then((query_res) => {
      // res.status(200).json({ message: 'Updated ice successfully' });
      console.log('Updated ice successfully')
    })
    .catch((err) => {
      console.error(err);
      console.log("An error occurred while updating ice.");
      // res.status(500).json({
      //   error: "An error occurred while updating ice.",
      // });
    });
  // pool.query(queries.updateIce, [ice], (error, results) => {
  //   console.log(queries.updateIce);
  //   if (error) {
  //     // Handle the error gracefully, e.g., by sending an error response
  //     console.error("Error updating ice:", error);
  //     res.status(500).json({ error: "An error occurred while updating ice." });
  //   } else {
  //     // res.send('Updated ice successfully');
  //     console.log(results);
  //   }
  // });
  pool.query(queries.updateToppings, [topping, count], (error, results) => {
    // console.log(queries.updateToppings);
    console.log(topping);
    console.log(count);
    if (error) {
      // Handle the error gracefully, e.g., by sending an error response
      console.log("An error occurred while updating toppings.");
    } else {
      // res.send('Toppings updated successfully');
      console.log(results);
    }
  });
  res.status(200).send("Update successful");
});

// router.put("/restoreInventory", controller.restoreInventory);
router.put("/restoreInventory", (req, res) => {
  const { name, ice, sugar, topping, count } = req.body;
  //get recipe from drink name
  //update inventory based on ingredients, ice, sugar, topping array

  pool.query(queries.restoreRecipeItems, [sugar, name])
    .then((query_res) => {
      // res.status(200).json({ message: 'Recipe ingredients updated successfully' });
      console.log('Recipe ingredients restored successfully');
    })
    .catch((err) => {
      console.error(err);
      console.log("Error adding recipe ingredients");
      // res.status(500).json({
      //   error: "Error subtracting recipe ingredients",
      // });
    });

  pool.query(queries.restoreIce, [ice])
  .then((query_res) => {
    // res.status(200).json({ message: 'Updated ice successfully' });
    console.log('Restored ice successfully')
  })
  .catch((err) => {
    console.error(err);
    console.log("An error occurred while updating ice.");
    // res.status(500).json({
    //   error: "An error occurred while updating ice.",
    // });
  });

  pool.query(queries.restoreToppings, [topping, count], (error, results) => {
    console.log(queries.updateToppings);
    console.log(topping);
    console.log(count);
    if (error) {
      // Handle the error gracefully, e.g., by sending an error response
      console.log("An error occurred while restoring toppings.");
    } else {
      // res.send('Toppings updated successfully');
      console.log(results);
    }
  });

  res.status(200).send("Restoring successful");
});

router.post("/makeOrder", (req, res) => {
  const { drinks, date, time, cost } = req.body;

  pool.query(
    queries.makeOrder,
    [date, time, cost, drinks],
    (error, results) => {
      if (error) {
        // Handle the error gracefully, e.g., by sending an error response
        console.error("Error inserting new order:", error);
        res
          .status(500)
          .json({ error: "An error occurred while inserting new order." });
      } else {
        res.send("Inserted new order successfully");
        console.log(results);
      }
    }
  );
});

module.exports = router;
