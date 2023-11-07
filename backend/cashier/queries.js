const getPriceByDrink = 'SELECT price FROM recipes where lower(drinkname) = $1;';

const updateRecipeItems = "\
UPDATE inventory AS i \
SET amount = new_amount \
FROM ( \
    SELECT \
        subquery.ingredient, \
        CASE \
            WHEN subquery.ingredient IN ('brown sugar', 'fructose', 'honey', 'sugar') THEN amount - subquery.amount - $1 \
            ELSE amount - subquery.amount \
        END AS new_amount \
    FROM ( \
        SELECT \
            unnest(ingredient_names) AS ingredient, \
            unnest(ingredient_values) AS amount \
        FROM recipes \
        WHERE lower(drinkname) = $2 \
    ) AS subquery \
) AS subquery \
WHERE i.name = subquery.ingredient;";

const updateIce = "\
UPDATE inventory \
SET amount = amount - $1 \
WHERE name = 'ice';";

const updateToppings = "\
UPDATE inventory AS i \
SET amount = amount - 10 * subquery.amount \
FROM ( \
    SELECT \
        unnest($1) AS topping, \
        unnest($2) AS amount \
) AS subquery \
WHERE i.name = subquery.topping;";

const restoreRecipeItems = "\
UPDATE inventory AS i \
SET amount = new_amount \
FROM ( \
    SELECT \
        subquery.ingredient, \
        CASE \
            WHEN subquery.ingredient IN ('brown sugar', 'fructose', 'honey', 'sugar') THEN amount + subquery.amount + $1 \
            ELSE amount + subquery.amount \
        END AS new_amount \
    FROM ( \
        SELECT \
            unnest(ingredient_names) AS ingredient, \
            unnest(ingredient_values) AS amount \
        FROM recipes \
        WHERE lower(drinkname) = $2 \
    ) AS subquery \
) AS subquery \
WHERE i.name = subquery.ingredient;";

const restoreIce = "\
UPDATE inventory \
SET amount = amount + $1 \
WHERE name = 'ice';";

const restoreToppings = "\
UPDATE inventory AS i \
SET amount = amount + 10 * subquery.amount \
FROM ( \
    SELECT \
        unnest($1) AS topping, \
        unnest($2) AS amount \
) AS subquery \
WHERE i.name = subquery.topping;";

const makeOrder = "\
INSERT INTO orders (drink_id, order_date, order_time, totalcost) \
SELECT id, $1::date, $2::time, $3 \
FROM recipes \
WHERE lower(drink_name) IN ($4:csv);";

module.exports = {
    getPriceByDrink,
    updateRecipeItems,
    updateIce,
    updateToppings,
    restoreRecipeItems,
    restoreIce,
    restoreToppings,
    makeOrder,
};