import { google } from "googleapis";

const REDIRECT_URI = "http://localhost:5173/signup";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// oauth2Client.setCredentials({
//   refresh_token:
// });

console.log(oauth2Client)

// const gmail = google.gmail({ version: "v1", auth: oauth2Client });

// function encodeEmail(to, subject, html) {
//   const message = [
//     `To: ${to}`,
//     `Subject: ${subject}`,
//     "Content-Type: text/html; charset=utf-8",
//     "",
//     html,
//   ].join("\n");

//   return Buffer.from(message)
//     .toString("base64")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// }

// const response=await gmail.users.messages.send({
//   userId: "me",
//   requestBody: {
//     raw: encodeEmail('guddu2120@gmail.com', "Your OTP", "<h1>1234</h1>"),
//   },
// });

// console.log(response)


// const authUrl = oauth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: ["https://www.googleapis.com/auth/gmail.send"],
// });

// console.log("Authorize this app:", authUrl);

// const res=await oauth2Client.getToken("4/0ASc3gC3oo6fEXsJ5Nfdcj8AbHqPwUZjLJYWZBF7rSCj5AS7cjCCkuWroiGsYR8VU5E22MQ");
// console.log(res)

// https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2F
// www.googleapis.com%2Fauth%2Fgmail.send&response_type=code&client_id=334126242922-u35qsecmr9pjg1o7bg64ga2b
// ucons5qh.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fsignup

// http://localhost:5173/signup?code=4/0ASc3gC3oo6fEXsJ5Nfdcj8AbHqPwUZjLJYWZBF7rSCj5AS7cjCCkuWroiGsYR8VU5E22MQ&scope=https://www.googleapis.com/auth/gmail.send