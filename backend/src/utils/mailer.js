import nodemailer from "nodemailer";
import dns from "dns";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
    return null;
  }
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
 
    lookup: (hostname, options, callback) => {
      dns.lookup(hostname, { family: 4 }, callback);
    },

    connectionTimeout: 20000, // 20s 
    greetingTimeout: 20000,   // 20s SMTP greeting
    socketTimeout: 20000,     // 20s idle socket timeout
  });
  return transporter;
}

export async function sendOrderConfirmationEmail(order) {
  const t = getTransporter();
  if (!t) {
    console.warn("⚠️ EMAIL / EMAIL_PASS সেট করা নেই — অর্ডার confirmation email পাঠানো হয়নি।");
    return;
  }

  const itemsHtml = (order.items || [])
    .map(
      (i) =>
        `<tr>
           <td style="padding:6px 8px;border-bottom:1px solid #eee;">${i.qty} × Product (${i.productId})</td>
           <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right;">$${i.price}</td>
         </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;">
      <h2 style="color:#F97316;">Thanks for your order!</h2>
      <p>Hi ${order.billing?.firstName || "there"},</p>
      <p>Your order has been placed successfully. Here are your order details:</p>
      <p style="font-size:18px;"><strong>Tracking ID: ${order.id}</strong></p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        ${itemsHtml}
      </table>
      <p><strong>Total: $${order.total} USD</strong></p>
      <p>You can track your order anytime using this Tracking ID along with your email
         (<a href="${process.env.CLIENT_URL}/track-order">Track your order here</a>).</p>
      <p style="color:#888;font-size:12px;margin-top:24px;">— Clicon Online Store</p>
    </div>
  `;

  await t.sendMail({
    from: `"Clicon Store" <${process.env.EMAIL}>`,
    to: order.email,
    subject: `Order Confirmation — ${order.id}`,
    html,
  });
}