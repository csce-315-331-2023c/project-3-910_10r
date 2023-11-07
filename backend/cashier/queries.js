const getPriceByDrink = 'SELECT price FROM recipes where drinkname = $1;';

const updateRecipeItems = "\
UPDATE inventory AS i\
SET amount = new_amount\
FROM (\
    SELECT\
        subquery.ingredient,\
        CASE\
            WHEN subquery.ingredient IN ('brown sugar', 'fructose', 'honey', 'sugar') THEN subquery.amount - $2\
            ELSE subquery.amount\
        END AS new_amount\
    FROM (\
        SELECT\
            unnest(ingredient_names) AS ingredient,\
            unnest(ingredient_values) AS amount\
        FROM recipes\
        WHERE drinkname = $1\
    ) AS subquery\
) AS subquery\
WHERE i.name = subquery.ingredient;";

const updateIce = "\
UPDATE inventory\
SET amount = amount - $1\
WHERE name = 'ice';";

const updateToppings = "\
UPDATE inventory AS i\
SET amount = amount - 10 * subquery.amount\
FROM (\
    SELECT\
        unnest($1) AS topping,\
        unnest($2) AS amount\
) AS subquery\
WHERE i.name = subquery.topping;";
