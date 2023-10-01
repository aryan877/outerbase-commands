--- This node executes a SQL query on your current base
--- To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
--- To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
--- To access the raw value of previous nodes in your command, use "{{node-1}}"
--- To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

INSERT INTO foodcategories (name, description, slug)
VALUES ({{request.body.category_name}}, {{request.body.category_description}}, {{request.body.category_slug}});

                