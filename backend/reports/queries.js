const excessReport = `
WITH current_inventory AS (
    SELECT name, amount
    FROM inventory
), 
sales_by_item AS (
    SELECT
        i.name AS item_name,
        COUNT(r.recipeid) AS sold_count
    FROM orders o
    JOIN recipes r ON r.recipeid = ANY(o.drink_id)
    JOIN inventory i ON i.name = ANY(r.ingredient_names)
    WHERE o.date >= $1::date AND o.date <= $2::date
    GROUP BY i.name
), 
total_inventory AS (
    SELECT
        ci.name AS item_name,
        ci.amount AS current_amount,
        COALESCE(sb.sold_count, 0) AS sold_count
    FROM current_inventory ci
    LEFT JOIN sales_by_item sb ON ci.name = sb.item_name
), 
excess_items AS (
    SELECT item_name
    FROM total_inventory
    WHERE sold_count < (current_amount + sold_count) * 0.1
)
SELECT item_name
FROM excess_items
UNION ALL
SELECT 'cups' AS item_name
WHERE (
    SELECT COUNT(r.recipeid) 
    FROM orders o 
    JOIN recipes r ON r.recipeid = ANY(o.drink_id) 
    WHERE o.date >= $1::date AND o.date <= $2::date
) * 0.9 < (SELECT current_amount FROM current_inventory WHERE name = 'cups') * 0.1
UNION ALL
SELECT 'straws' AS item_name
WHERE (
    SELECT COUNT(r.recipeid) 
    FROM orders o 
    JOIN recipes r ON r.recipeid = ANY(o.drink_id) 
    WHERE o.date >= $1::date AND o.date <= $2::date
) * 0.9 < (SELECT current_amount FROM current_inventory WHERE name = 'straws') * 0.1
UNION ALL
SELECT 'plastic cover' AS item_name
WHERE (
    SELECT COUNT(r.recipeid) 
    FROM orders o 
    JOIN recipes r ON r.recipeid = ANY(o.drink_id) 
    WHERE o.date >= $1::date AND o.date <= $2::date
) * 0.9 < (SELECT current_amount FROM current_inventory WHERE name = 'plastic cover') * 0.1
UNION ALL
SELECT 'napkins' AS item_name
WHERE (
    SELECT COUNT(r.recipeid) 
    FROM orders o 
    JOIN recipes r ON r.recipeid = ANY(o.drink_id) 
    WHERE o.date >= $1::date AND o.date <= $2::date
) * 0.9 < (SELECT current_amount FROM current_inventory WHERE name = 'napkins') * 0.1;
`;

module.exports = {
    excessReport,
}
