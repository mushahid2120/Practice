import axios from "axios";

  const res=await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: { name: "Storage App", email: "noreply@brevo.com" },
      to: [{ email: "md.mushahidansari@gmail.com" }],
      subject: "Storage app OTP",
      htmlContent: `<h3>Your Storage App OTP</h3> <br> <h1>12354</h1>  `,
    },
    {
      headers: {
        "api-key": "...",
        "Content-Type": "application/json",
      },
    }
  );

  

  // console.log(res)

