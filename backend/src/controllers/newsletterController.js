export async function subscribe(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  // এখানে চাইলে email/newsletter collection এ save করা যায়, অথবা
  // Mailchimp/SendGrid এর মতো কোনো email service এর API কল বসানো যায়।
  console.log(`📧 Newsletter signup: ${email}`);
  res.json({ success: true, email });
}
