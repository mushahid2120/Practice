import Razorpay from "razorpay";

const rzpInstance = new Razorpay({
  key_id: "rzp_test_Scg5kOdstZW8iV",
  key_secret: "RbYewWzwcYQcoJg20FFXlcOV",
});

// await rzpInstance.orders.create({
//     amount: 10000,
//     currency: "INR"
// })

const data= await rzpInstance.orders.all();

console.log(data)