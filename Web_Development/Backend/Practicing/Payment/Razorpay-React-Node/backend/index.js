import express, { response } from "express";
import cors from "cors";
import Razorpay from "razorpay";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/create-order", async (req, res) => {
  try {
    const { name, amount } = req.body;
    const order = await rzpIntance.orders.create({
      amount: amount,
      currency: "INR",
    });

    console.log(order);

    res.json({ orderid: order.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.post("/razorpay-webhook", async (req, res) => {
  console.log(req.body,req.body.payload);
  const providedSignature=req.headers['x-razorpay-signature']
  console.log(providedSignature)
  const isSignatureValid=Razorpay.validateWebhookSignature(JSON.stringify(req.body),providedSignature,'mysecret')
  console.log(isSignatureValid)
  console.log(req.body.payload.payment.entity.status)
  res.json({message: "got the event"})
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
