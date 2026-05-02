import Razorpay from "razorpay";


// await rzpInstance.orders.create({
//     amount: 10000,
//     currency: "INR"
// })

const data= await rzpInstance.orders.all();

console.log(data)