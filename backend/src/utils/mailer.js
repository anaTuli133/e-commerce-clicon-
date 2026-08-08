

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export async function sendOrderConfirmationEmail(order) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.EMAIL; // Brevo-তে verify করা ইমেইল

  if (!apiKey || !senderEmail) {
    console.warn("⚠️ BREVO_API_KEY / EMAIL সেট করা নেই — অর্ডার confirmation email পাঠানো হয়নি।");
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

  const res = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: "Clicon Store", email: senderEmail },
      to: [{ email: order.email }],
      subject: `Order Confirmation — ${order.id}`,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Brevo email পাঠাতে ব্যর্থ হয়েছে: ${res.status} ${errBody}`);
  }
}