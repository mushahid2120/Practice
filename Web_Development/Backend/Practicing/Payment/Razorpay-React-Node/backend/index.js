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




app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
