// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
  const nodeOne = JSON.parse({{node-1}});
  const order = nodeOne.response.items[0][0];
  const slackWebhookUrl = {{request.body.slackwebhook}};

  const blocks = [
      {
          type: 'section',
          text: {
              type: 'mrkdwn',
              text: `*New Order Received* :tada:`,
          },
      },
      {
          type: 'divider',
      },
      {
          type: 'section',
          fields: [
              {
                  type: 'mrkdwn',
                  text: `*Order ID:*\n${order.orderid}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Customer Name:*\n${order.first_name}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Email:*\n${order.email}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Phone Number:*\n${order.phone_number}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Delivery Address:*\n${order.google_formatted_address}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Street Address:*\n${order.street}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Pincode:*\n${order.pincode}`,
              },
          ],
      },
      {
          type: 'divider',
      },
      {
          type: 'section',
          text: {
              type: 'mrkdwn',
              text: '*Order Details*',
          },
      },
  ];

  order.order_items.forEach((item) => {
      const itemName = item.name;
      const itemPrice = parseFloat(item.price);
      const quantity = item.quantity;
      const itemTotal = itemPrice * quantity;
      blocks.push(
          {
              type: 'section',
              fields: [
                  {
                      type: 'mrkdwn',
                      text: `*Item:*\n${itemName}`,
                  },
                  {
                      type: 'mrkdwn',
                      text: `*Price:*\n$${itemPrice.toFixed(2)}`,
                  },
                  {
                      type: 'mrkdwn',
                      text: `*Quantity:*\n${quantity}`,
                  },
                  {
                      type: 'mrkdwn',
                      text: `*Total:*\n$${itemTotal.toFixed(2)}`,
                  },
              ],
          },
          {
              type: 'divider',
          }
      );
  });

  const subtotal = order.order_items.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const quantity = item.quantity;
      return total + itemPrice * quantity;
  }, 0);

  const taxRate =  (Number({{request.body.tax_percentage}}) / 100);
  const tax = subtotal * taxRate;
  const totalBill = subtotal + tax;

  blocks.push(
      {
          type: 'section',
          fields: [
              {
                  type: 'mrkdwn',
                  text: `*Subtotal:*\n$${subtotal.toFixed(2)}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Tax (15%):*\n$${tax.toFixed(2)}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Total:*\n$${totalBill.toFixed(2)}`,
              },
          ],
      },
      {
          type: 'divider',
      }
  );

  const googleMapsLink = `https://www.google.com/maps?q=${order.latitude},${order.longitude}`;
  blocks.push(
      {
          type: 'section',
          text: {
              type: 'mrkdwn',
              text: `*Google Maps Location:*\n<${googleMapsLink}|Open in Google Maps>`,
          },
      }
  );

  const payload = {
      blocks: blocks,
  };

  fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });
}
