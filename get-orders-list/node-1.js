
// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
  let page = Number({{request.query.page}});
  if (isNaN(page) || page < 1) {
      page = 1; 
  }
  
  return {
      page
  };
}
