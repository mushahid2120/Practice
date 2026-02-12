import { Resend } from "resend";

const resend = new Resend("secretKey");

const res=await resend.emails.send({
  from: "Storage App <onboarding@resend.dev>",
  to: "md.mushahidansari@gmail.com",
  reply_to: "md.mushahidansari@gmail.com",
  subject: "Your OTP",
  html: "<h1>1234</h1>",
});


console.log(res)