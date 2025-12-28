import passport from 'passport'
import { Strategy as googleStartegy } from 'passport-google-oauth20';

const client_id =
const redirect_uri='http://localhost:4000/auth/google/callback'
const client_secret=


passport .use(new googleStartegy({
    clientID:client_id,
    clientSecret: client_secret,
    callbackURL: redirect_uri
},function (accessToken,refreshToken,profile,cb){
    return cb(null,profile)
}
))
