// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
  const nodeThree = JSON.parse({{node-3}});
  const address = nodeThree.response.items[0];
  const phone_number = address.phone_number;
  const google_formatted_address = address.google_formatted_address || '';
  const landmark = address.landmark || '';
  const flat_number = address.flat_number;
  const street = address.street;
  const pincode = address.pincode;
  const state = address.state;
  const latitude = address.latitude;
  const longitude = address.longitude;

  return {
      phone_number,
      google_formatted_address, 
      landmark,
      flat_number,
      street,
      pincode,
      state,
      latitude,
      longitude
  }
}