const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Pk2dIK14G2uGgdHwDK9C8qY3vovH1c7NpJFpAUlepbauZEZy4s8H8WxTFJFY1myCLd2kaD0RcdbB4UaO0kriq6l00Z3HITwlj"
);

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(express.json());

const calculateOrderAmount = (items) => {
  if (!Array.isArray(items) || items.length === 0) return 0;
  let total = 0;
  for (const item of items) {
    if (typeof item.amount !== "number" || item.amount <= 0) {
      return NaN;
    }
    total += item.amount;
  }
  return total;
};

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).send({ error: "Invalid items array" });
    }

    const amount = calculateOrderAmount(items);

    if (isNaN(amount)) {
      return res.status(400).send({ error: "Invalid amount calculation" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
