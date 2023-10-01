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
  const order = nodeOne.response.items[0][0]
  const fname = order.first_name;
  const toemail = order.email;
  
  const orderItems = order.order_items;
  const tableRows = orderItems.map((item) => {
    const itemName = item.name;
    const itemPrice = parseFloat(item.price);
    const quantity = item.quantity;
    const itemTotal = itemPrice * quantity;
    return `
      <tr>
        <td style="padding: 8px; border: 1px solid #dddddd;">${itemName}</td>
        <td style="padding: 8px; border: 1px solid #dddddd; text-align: right;">${itemPrice.toFixed(2)}</td>
        <td style="padding: 8px; border: 1px solid #dddddd; text-align: center;">${quantity}</td>
        <td style="padding: 8px; border: 1px solid #dddddd; text-align: right;">${itemTotal.toFixed(2)}</td>
      </tr>
    `;
  });

  const subtotal = orderItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price);
    const quantity = item.quantity;
    return total + itemPrice * quantity;
  }, 0);
  const taxRate = 0.15;
  const tax = subtotal * taxRate;
  const totalBill = subtotal + tax;

  const tableStyle = `
    border-collapse: collapse;
    width: 100%;
  `;

  const thStyle = `
    background-color: #f2f2f2;
    text-align: left;
    padding: 12px;
    border: 1px solid #dddddd;
  `;

  const tableHTML = `
    <table style="${tableStyle}">
      <tr>
        <th style="${thStyle}">Item</th>
        <th style="${thStyle}">Price</th>
        <th style="${thStyle}">Quantity</th>
        <th style="${thStyle}">Total</th>
      </tr>
      ${tableRows.join('')}
      <tr>
        <td colspan="3" style="${thStyle}">Subtotal:</td>
        <td style="${thStyle}">${subtotal.toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="3" style="${thStyle}">Tax (15%):</td>
        <td style="${thStyle}">${tax.toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="3" style="${thStyle}">Total:</td>
        <td style="${thStyle}">${totalBill.toFixed(2)}</td>
      </tr>
    </table>
  `;

  const subject = 'Order Confirmation';
  const messageHTML = `
    <html>
      <body>
        <p>Hello ${fname},</p>
        <p>Thank you for placing your order with ${restaurantname}! Your order is confirmed.</p>
        ${tableHTML}
      </body>
    </html>
  `;

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