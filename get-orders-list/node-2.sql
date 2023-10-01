--- This node executes a SQL query on your current base
--- To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
--- To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
--- To access the raw value of previous nodes in your command, use "{{node-1}}"
--- To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

SELECT orderid, ordered_at, delivery_status, total_price
FROM orders
WHERE userid = {{request.query.userid}}
ORDER BY ordered_at DESC
LIMIT 10
OFFSET ({{node-1.page}} - 1) * 10;
