import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'

function App() {
  const login=useGoogleLogin({
    onSuccess: (codeResponse)=>console.log(codeResponse),
    flow: 'auth-code'
  })

  return (
    <>
      <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/>
<button onClick={login}>Login with google</button>
    </>
  
  )
}

export default App
