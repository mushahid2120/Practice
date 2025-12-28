import express from "express";
// import fetchIdToken, { generateGoogleAuthURL } from "./googleAuthService.js";
import cors from "cors";
import passport from 'passport'
import './passport.js'

const app = express();

app.use(express.json());
app.use(cors());

app.get("/auth/google",passport.authenticate('google',{
    scope: ['email','profile','openid'],
    prompt: 'consent'
}))

// app.get("/auth/google", (req, res, next) => {
//   res.redirect(generateGoogleAuthURL());
//   res.end();
// });

app.get("/auth/google/callback",
    passport.authenticate('google',{
        failureRedirect: 'http://127.0.0.1:5500/Auth/Google_OpenId/callback.html?success=false',
        session: false
    }),
 async (req, res, next) => {

//   const { code } = req.query;
//   const { sub, email, name, profile, picture } = await fetchIdToken(code);
  console.log(req.user,_json);
  res.redirect(
    "http://127.0.0.1:5500/Auth/Google_OpenId/callback.html?success=true"
  );
});

app.listen("4000", () => {
  console.log("Server is running on the port 4000");
});
