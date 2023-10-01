
// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
  const nodeOne = JSON.parse({{node-1}});
  const order = nodeOne.response.items[0][0];
  const toPhoneNumber = order.phone_number;
  const twilioFromNumber = {{request.body.twilio_from_number}};
  const twilioAccountSid = {{request.body.twilio_account_sid}};
  const twilioAuthToken = {{request.body.twilio_auth_token}};
  const messageText = `Your order with order ID ${order.orderid} has been successfully paid for and will be delivered shortly.`;
  const messageBody = `To=${encodeURIComponent(toPhoneNumber)}&From=${twilioFromNumber}&Body=${encodeURIComponent(messageText)}`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;

  fetch(url, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(twilioAccountSid + ':' + twilioAuthToken)}`
  },
  body: messageBody
  })
}