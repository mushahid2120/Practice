import Razorpay from "razorpay";

const accountId = 'acc_SWeSS1GSMOmsix'; // Your sub-merchant ID
const webhookId = 'SnVg1gg8n4MdqO';     // The unique webhook ID

instance.webhooks.delete(webhookId,accountId)
  .then((response) => {
    console.log("Webhook deleted successfully", response);
  })
  .catch((error) => {
    console.error("Error deleting webhook", error);
  });

