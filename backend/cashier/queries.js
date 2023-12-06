/**
 * SQL query to get a drink price
 * @type {string}
 */
const getPriceByDrink =
  "SELECT price FROM recipes where lower(drinkname) = $1;";
/**
 * SQL query to get the default toppings of a specific drink in recipes
 * @type {string}
 */
const getDefaultToppingsByDrink =
  "SELECT inventory.name from inventory JOIN recipes ON inventory.name = ANY(recipes.ingredient_names) WHERE lower(recipes.drinkname) = $1 AND inventory.topping = true;";
/**
 * SQL query to get low ingredients from a specific drink
 * @type {string}
 */
const getLowIngredientForDrink =
  "\
  SELECT Inventory.name, ROUND(100 * Inventory.amount/Inventory.capacity) AS ratio FROM recipes, inventory WHERE lower(recipes.drinkname) = $1 AND inventory.name = ANY(recipes.ingredient_names) AND inventory.alert = true\
  ";

/**
 * SQL query to update recipe items in inventory
 * @type {string}
 */
const updateRecipeItems =
  "\
  UPDATE inventory AS i \
  SET amount = subquery.new_amount \
  FROM ( \
      SELECT \
          subquery.ingredient, \
          CASE \
              WHEN subquery.ingredient IN ('brown sugar', 'fructose', 'honey', 'sugar') THEN i.amount - subquery.amount - $1 \
              ELSE i.amount - subquery.amount \
          END AS new_amount \
      FROM ( \
          SELECT \
              unnest(ingredient_names) AS ingredient, \
              unnest(ingredient_values) AS amount \
          FROM recipes \
          WHERE lower(drinkname) = lower($2) \
      ) AS subquery \
      INNER JOIN inventory AS i on i.name = subquery.ingredient \
  ) AS subquery \
  WHERE i.name = subquery.ingredient;";

/**
 * SQL query to update ice in inventory
 * @type {string}
 */
const updateIce =
  "\
UPDATE inventory \
SET amount = amount - $1 \
WHERE name = 'ice';";

/**
 * SQL query to update toppings in inventory
 * @type {string}
 */
const updateToppings =
  "\
UPDATE inventory AS i \
SET amount = i.amount - 10 * subquery.amount \
FROM ( \
    SELECT \
        unnest($1::text[]) AS topping, \
        unnest($2::int[]) AS amount \
) AS subquery \
WHERE i.name = subquery.topping;";

/**
 * SQL query to restore recipe items in inventory
 * @type {string}
 */
const restoreRecipeItems =
  "\
  UPDATE inventory AS i \
  SET amount = subquery.new_amount \
  FROM ( \
      SELECT \
          subquery.ingredient, \
          CASE \
              WHEN subquery.ingredient IN ('brown sugar', 'fructose', 'honey', 'sugar') THEN i.amount + subquery.amount + $1 \
              ELSE i.amount + subquery.amount \
          END AS new_amount \
      FROM ( \
          SELECT \
              unnest(ingredient_names) AS ingredient, \
              unnest(ingredient_values) AS amount \
          FROM recipes \
          WHERE lower(drinkname) = lower($2) \
      ) AS subquery \
      INNER JOIN inventory AS i on i.name = subquery.ingredient \
  ) AS subquery \
  WHERE i.name = subquery.ingredient;";

/**
 * SQL query to restore ice in inventory
 * @type {string}
 */
const restoreIce =
  "\
UPDATE inventory \
SET amount = amount + $1 \
WHERE name = 'ice';";

/**
 * SQL query to restore toppings in inventory
 * @type {string}
 */
const restoreToppings =
  "\
UPDATE inventory AS i \
SET amount = i.amount + 10 * subquery.amount \
FROM ( \
    SELECT \
        unnest($1::text[]) AS topping, \
        unnest($2::int[]) AS amount \
) AS subquery \
WHERE i.name = subquery.topping;";

/**
 * SQL query to make an order by inserting it into the orders table based on recipe IDs.
 * @type {string}
 */
const makeOrder =
"WITH RecipeIDs AS ( \
  SELECT \
    array_agg(recipeid) AS recipe_ids \
  FROM recipes \
  WHERE lower(drinkname) IN (SELECT lower(unnest($4::text[]))) \
) \
INSERT INTO orders (drink_id, date, time, cost) \
SELECT \
  r.recipe_ids, \
  $1, \
  $2, \
  $3 \
FROM RecipeIDs r;";

module.exports = {
  getPriceByDrink,
  getDefaultToppingsByDrink,
  updateRecipeItems,
  updateIce,
  updateToppings,
  restoreRecipeItems,
  restoreIce,
  restoreToppings,
  makeOrder,
  getLowIngredientForDrink,
};
