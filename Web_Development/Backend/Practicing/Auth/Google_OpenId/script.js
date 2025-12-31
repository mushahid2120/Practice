
function googleLoginCallback(response){
  console.log(response)
}

window.onload = function () {
    google.accounts.id.initialize({
      client_id: '334126242922-u35qsecmr9pjg1o7bg64ga2bucons5qh.apps.googleusercontent.com',
      callback: googleLoginCallback
    });
    google.accounts.id.renderButton(
      document.querySelector('#google-login-btn'),
      { 
        theme: 'filled_blue', 
        size: 'large',
        text: 'signin_with', // Optional customization
        shape: 'rectangular' // Optional customization
      } 
    );
    google.accounts.id.prompt();
  };



// const button = document.querySelector("button");

//popup to go to the Google URL
// button.addEventListener("click", (e) => {
//     window.open(
//       'http://localhost:4000/auth/google',
//       "auth-tab",
//       "width=400,height=500"
//     )
// });

// window.addEventListener('message',({data})=>{
//   console.log(data)
//   if(data.message==='success') console.log('Got the user Data')
//   else console.log('User data Failed')
// })

