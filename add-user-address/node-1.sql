--- This node executes a SQL query on your current base
--- To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
--- To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
--- To access the raw value of previous nodes in your command, use "{{node-1}}"
--- To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

INSERT INTO addresses (userid, street, google_formatted_address, flat_number, landmark, state, pincode, phone_number, longitude, latitude)
VALUES (
    {{request.body.userid}},
    {{request.body.street}},
    {{request.body.google_formatted_address}},
    {{request.body.flat_number}},
    {{request.body.landmark}},
    {{request.body.state}},
    {{request.body.pincode}},
    {{request.body.phone_number}},
    {{request.body.longitude}},
    {{request.body.latitude}}
);
