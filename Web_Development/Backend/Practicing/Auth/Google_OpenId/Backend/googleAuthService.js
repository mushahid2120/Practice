import { OAuth2Client } from "google-auth-library";

const client_id 
const redirect_uri='http://localhost:4000/auth/google/callback'
const client_secret

const client=new OAuth2Client(
     client_id,
  client_secret,
  redirect_uri
);

export default async function fetchIdToken(code) {
    const {tokens}=await client.getToken(code)

    const response=await fetch('https://openidconnect.googleapis.com/v1/userinfo',{
        headers: {Authorization: `Bearer ${tokens.access_token}`}
    })

    console.log(await response.json())

  const loginTicket=await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: client_id
  })
  

  const userData = loginTicket.getPayload();
  return userData
}

 export function generateGoogleAuthURL(){
    return client.generateAuthUrl({
        scope: ['email','profile','openid'],
        prompt: 'select_account',
        access_type: 'offline'
    })
}
