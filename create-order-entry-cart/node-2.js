// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
  const nodeOne = JSON.parse({{node-1}});
  const cartItems = nodeOne.response.items;
  const total_price = cartItems.reduce((acc, item) => {
      const itemPrice = item.price * item.quantity;
      return acc + itemPrice;
  }, 0);
  const tax = total_price * (Number({{request.body.tax_percentage}}) / 100);
  
  const total_price_with_tax = total_price + tax;
  const order_items_jsonb = cartItems.map((item) => JSON.stringify(item));
  return {
      order_items: order_items_jsonb,
      total_price_with_tax: total_price_with_tax.toFixed(2)
  }
}