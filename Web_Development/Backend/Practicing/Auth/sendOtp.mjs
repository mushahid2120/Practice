import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "md.mushahidansari@gmail.com",
    pass: "rbyx mqyr eafa wxev",
  },
});

  const info = await transporter.sendMail({
    from: '"Md Ansari" <md.mushahidansari@gmail.com>',
    to: "guddu2120@gmail.com",
    subject: "Hello ✔",
    html: "<b >Hello world?</b>", // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
