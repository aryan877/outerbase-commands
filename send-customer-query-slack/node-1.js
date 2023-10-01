// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
  const query = {{request.body.query}};
  const email = {{request.body.email}};
  const first_name = {{request.body.first_name}};
  const orderid = {{request.body.orderid}};
  const phone_number = {{request.body.phone_number}};
  const query_type = {{request.body.query_type}};
  const slackWebhookUrl = {{request.body.slackwebhook}};

  const blocks = [
      {
          type: 'section',
          text: {
              type: 'mrkdwn',
              text: `*New User Complaint/Enquiry* :loudspeaker:`,
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
                  text: `*Query:*\n${query}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Customer Name:*\n${first_name}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Email:*\n${email}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Phone Number:*\n${phone_number}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Order ID:*\n${orderid}`,
              },
              {
                  type: 'mrkdwn',
                  text: `*Query Type:*\n${query_type}`, 
              },
          ],
      },
  ];

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

  return {
      success: true
  }
}
