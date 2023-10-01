--- This node executes a SQL query on your current base
--- To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
--- To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
--- To access the raw value of previous nodes in your command, use "{{node-1}}"
--- To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

UPDATE foodcategories
SET image = {{request.body.newfilekey}}
WHERE categoryid = {{request.body.oldcellvalue}};