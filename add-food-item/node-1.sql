--- This node executes a SQL query on your current base
--- To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
--- To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
--- To access the raw value of previous nodes in your command, use "{{node-1}}"
--- To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

INSERT INTO fooditems (name, description, price, categoryid, slug)
SELECT
    {{request.body.food_item_name}} AS name,
    {{request.body.food_item_description}} AS description,
    {{request.body.food_item_price}} AS price,
    fc.categoryid AS categoryid,
    {{request.body.food_item_slug}} AS slug
FROM
    foodcategories fc
WHERE
    fc.slug = {{request.body.food_item_slug}};
                