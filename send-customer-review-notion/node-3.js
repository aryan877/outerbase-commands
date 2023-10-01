// This node executes Javascript code on your current base
// To access your commands POST inputs, use "{{request.body.INPUT_NAME}}"
// To access your commands GET inputs, use "{{request.query.INPUT_NAME}}"
// To access the raw value of previous nodes in your command, use "{{node-1}}"
// To access JSON key values from previous nodes in your command, use "{{node-1.keyValue}}"

function userCode() {
  const apikey = {{request.body.mailgunapikey}};
  const domain = {{request.body.mailgundomain}};
  const fromemail = {{request.body.fromemail}};
  const restaurantname = {{request.body.restaurantname}};
  
  const nodeOne = JSON.parse({{node-1}});
  const order = nodeOne.response.items[0];
  const fname = order.first_name;
  const toemail = order.email;
  
  const stars = {{request.body.stars}};
  
  let subject = '';
  let messageHTML = '';
  
  if (parseInt(stars) === 1) {
    subject = 'We Apologize for Your Experience';
    messageHTML = `
      <html>
        <body>
          <p>Dear ${fname},</p>
          <p>We are truly sorry to hear about your recent experience at ${restaurantname}. We value your feedback and would like to make things right. Please accept our sincere apologies and let us know how we can improve.</p>
        </body>
      </html>
    `;
  } else if (parseInt(stars) === 2) {
    subject = 'Thank You for Your Feedback';
    messageHTML = `
      <html>
        <body>
          <p>Dear ${fname},</p>
          <p>Thank you for taking the time to share your feedback with us. We appreciate your input, and we will use it to improve our services. We hope to serve you better in the future.</p>
        </body>
      </html>
    `;
  } else if (parseInt(stars) === 3) {
    subject = 'We Value Your Feedback';
    messageHTML = `
      <html>
        <body>
          <p>Dear ${fname},</p>
          <p>We appreciate your feedback and your continued support. Your comments help us provide better service to all our customers. Thank you for choosing ${restaurantname}.</p>
        </body>
      </html>
    `;
  } else if (parseInt(stars) >= 4) {
    subject = 'Thank You for Your Positive Review';
    messageHTML = `
      <html>
        <body>
          <p>Dear ${fname},</p>
          <p>Thank you for your positive review and high rating! We are thrilled to hear that you had a great experience at ${restaurantname}. Your feedback encourages us to continue delivering excellent service.</p>
        </body>
      </html>
    `;
  }

  const mailgunPayload = `from=${encodeURIComponent(fromemail)}&to=${encodeURIComponent(toemail)}&subject=${encodeURIComponent(subject)}&html=${encodeURIComponent(messageHTML)}`;
  const mailgunUrl = `https://api.mailgun.net/v3/${domain}/messages`;

  fetch(mailgunUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(`api:${apikey}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: mailgunPayload,
  });
}
