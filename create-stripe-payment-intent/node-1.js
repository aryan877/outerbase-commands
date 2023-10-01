// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

async function userCode() {
  const orderid = {{request.body.orderid}};
  const orderTotal = {{request.body.ordertotal}};
  const currency = {{request.body.currency}};
  const stripeSecretKey = {{request.body.stripekey}};
  const upstashurl = {{request.body.upstashurl}}; 
  const upstashkey = {{request.body.upstashkey}}; 

  const stripeUrl = 'https://api.stripe.com/v1/payment_intents';
  const payload = `amount=${Math.round(orderTotal * 100)}&currency=${currency.toLowerCase()}&payment_method_types[]=card`;
  
  return fetch(stripeUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: payload,
  }).then(response => response.json())
    .then(result => {
      const upstashHeaders = {
        Authorization: `Bearer ${upstashkey}`,
      };
      const upstashPayload = JSON.stringify(result);

      return fetch(`${upstashurl}/setex/${orderid}/20`, {
        method: 'POST',
        headers: upstashHeaders,
        body: upstashPayload,
      });
    })
    .then(() => ({ success: true }))
    .catch(error => ({ error: error.message }));
}
