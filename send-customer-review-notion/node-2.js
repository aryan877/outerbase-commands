
// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
  const nodeOne = JSON.parse({{node-1}});
  const order = nodeOne.response.items[0];
  const notionIntegrationKey = {{request.body.notion_integration_key}};
  const notionDatabaseId = {{request.body.notion_database_id}};
  const stars = {{request.body.stars}};
  const review = {{request.body.review}};
  const first_name = {{request.body.first_name}};
  const email = {{request.body.email}};
  const orderItemsText = order.order_items.reduce((text, item) => {
  return text + `${item.name} (Quantity: ${item.quantity})\n`;
  }, '');

  const requestBody = {
  parent: {
      database_id: notionDatabaseId,
  },
  properties: {
      OrderId: {
      title: [
          {
          text: {
              content: String(order.orderid),
          },
          },
      ],
      },
      Name: {
      rich_text: [
          {
          text: {
              content: first_name,
          },
          },
      ],
      },
      Review: {
      rich_text: [
          {
          text: {
              content: review,
          },
          },
      ],
      },
      Stars: {
      select: {
          name: stars,
      },
      },
      OrderItems: {
      rich_text: [
          {
          text: {
              content: orderItemsText,
          },
          },
      ],
      },
      TotalPrice: {
      number: parseFloat(order.total_price),
      },
  },
  };
  
  fetch(`https://api.notion.com/v1/pages`, {
  method: 'POST',
  headers: {
      Authorization: `Bearer ${notionIntegrationKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2021-08-16',
  },
  body: JSON.stringify(requestBody),
  });

  return {
      success: true
  }
}