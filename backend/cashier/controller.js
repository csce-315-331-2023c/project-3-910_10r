const pool = require("../db");
const queries = require("./queries");

// gets the price for a specific drink whose name is passed in via parameter
const getPriceByDrink = (req, res) => {
  const drink = req.query.drink;
  pool.query(queries.getPriceByDrink, [drink], (error, results) => {
    // console.log(queries.getPriceByDrink);
    // if(error) throw error;
    // res.send(results.rows[0].price);
    // console.log(results);
    if (error) {
      // Handle the error gracefully, e.g., by sending an error response
      console.error("Error fetching price:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the price." });
    } else {
      if (results.rows.length > 0) {
        const price = results.rows[0].price;
        res.status(200).json({ price });
      } else {
        res.status(404).json({ error: "Drink not found" });
      }
    }
  });
};

const getLowIngredientForDrink = (req, res) => {
  const drink = req.query.drink;
  pool.query(queries.getLowIngredientForDrink, [drink], (error, results) => {
    if (error) {
      // Handle the error gracefully, e.g., by sending an error response
      console.error(
        "Error fetching low ingredients for drink",
        drink,
        ": ",
        error
      );
      res.status(500).json({
        error: "An error occurred while fetching the low inventory for drink.",
      });
    } else {
      let ingredients = {};
      for (let i = 0; i < results.rowCount; i++) {
        console.log(results.rows[i]);
        ingredients[results.rows[i].name] = results.rows[i].ratio;
      }
      console.log("ingredients", ingredients);
      res.status(200).send(ingredients);
    }
  });
};

const getDefaultToppingsByDrink = (req, res) => {
  const drink = req.query.drink;
  pool.query(queries.getDefaultToppingsByDrink, [drink], (error, results) => {
    // console.log(queries.getDefaultToppingsByDrink);
    if (error) {
      // Handle the error gracefully, e.g., by sending an error response
      console.error("Error fetching default toppings:", error);
      res.status(500).json({
        error: "An error occurred while fetching the default toppings.",
      });
    } else {
      let toppings = [];
      for (let i = 0; i < results.rowCount; i++) {
        toppings.push(results.rows[i].name);
      }
      res.status(200).send(toppings);
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
// const updateInventory = (req, res) => {
//   const { name, ice, sugar, topping, count } = req.body;
//   console.log(name)
//   console.log(ice)
//   console.log(sugar)
//   console.log(topping)
//   console.log(count)
//   // console.log(queries.updateRecipeItems)
//   // console.log(queries.updateIce)
//   // console.log(queries.updateToppings)
//   //get recipe from drink name
//   //update inventory based on ingredients, ice, sugar, topping array
//   pool.query(queries.updateRecipeItems, [sugar, name], (error, results) => {
//     // console.log(queries.updateRecipeItems);
//     if (error) {
//       // Handle the error gracefully, e.g., by sending an error response
//       console.error("Error subtracting recipe ingredients", error);
//       res.status(500).json({
//         error: "An error occurred while subtracting recipe ingredients.",
//       });
//     } else {
//       // res.send('Recipe ingredients updated successfully');
//       console.log(results);
//     }
//   });

//   pool.query(queries.updateIce, [ice], (error, results) => {
//     // console.log(queries.updateIce);
//     if (error) {
//       // Handle the error gracefully, e.g., by sending an error response
//       console.error("Error updating ice:", error);
//       res.status(500).json({ error: "An error occurred while updating ice." });
//     } else {
//       // res.send('Updated ice successfully');
//       console.log(results);
//     }
//   });

//   pool.query(queries.updateToppings, [topping, count], (error, results) => {
//     // console.log(queries.updateToppings);
//     if (error) {
//       // Handle the error gracefully, e.g., by sending an error response
//       console.error("Error updating toppings:", error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while updating toppings." });
//     } else {
//       // res.send('Toppings updated successfully');
//       console.log(results);
//     }
//   });
//   res.status(200).send("Update successful");
// };

// const restoreInventory = (req, res) => {
//   const { name, ice, sugar, topping, count } = req.body;
//   //get recipe from drink name
//   //update inventory based on ingredients, ice, sugar, topping array
//   pool.query(queries.restoreRecipeItems, [sugar, name], (error, results) => {
//     if (error) {
//       // Handle the error gracefully, e.g., by sending an error response
//       console.error("Error restoring recipe ingredients", error);
//       res.status(500).json({
//         error: "An error occurred while restoring recipe ingredients.",
//       });
//     } else {
//       // res.send('Recipe ingredients updated successfully');
//       console.log(results);
//     }
//   });

//   pool.query(queries.restoreIce, [ice], (error, results) => {
//     if (error) {
//       // Handle the error gracefully, e.g., by sending an error response
//       console.error("Error restoring ice:", error);
//       res.status(500).json({ error: "An error occurred while restoring ice." });
//     } else {
//       // res.send('Updated ice successfully');
//       console.log(results);
//     }
//   });

//   pool.query(queries.restoreToppings, [topping, count], (error, results) => {
//     if (error) {
//       // Handle the error gracefully, e.g., by sending an error response
//       console.error("Error restoring toppings:", error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while restoring toppings." });
//     } else {
//       console.log(results);
//     }
//   });
//   res.status(200).send("Restoring successful");
// };

module.exports = {
  getPriceByDrink,
  getDefaultToppingsByDrink,
  // updateInventory,
  // restoreInventory,
  // makeOrder,
  getLowIngredientForDrink,
};
