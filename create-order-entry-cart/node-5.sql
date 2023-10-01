--- This node executes a SQL query on your current base
--- To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
--- To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
--- To access the raw value of previous nodes in your command, use "{{node-1}}"
--- To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

INSERT INTO orders (
    userid,
    order_items,
    total_price,
    email,
    phone_number,
    first_name,
    google_formatted_address,
    flat_number,
    street,
    pincode,
    state,
    latitude,
    longitude,
    landmark
) 
VALUES (
    {{request.body.userid}},
    ARRAY[{{node-2.order_items}}]::jsonb[],
    {{node-2.total_price_with_tax}},
    {{request.body.email}},
    {{node-4.phone_number}},
    {{request.body.first_name}},
    {{node-4.google_formatted_address}},
    {{node-4.flat_number}},
    {{node-4.street}},
    {{node-4.pincode}},
    {{node-4.state}},
    {{node-4.latitude}},
    {{node-4.longitude}},
    {{node-4.landmark}}
)
RETURNING orderid;