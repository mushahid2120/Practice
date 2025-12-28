const button = document.querySelector("button");

//popup to go to the Google URL
button.addEventListener("click", (e) => {
    window.open(
      'http://localhost:4000/auth/google',
      "auth-tab",
      "width=400,height=500"
    )
});

window.addEventListener('message',({data})=>{
  console.log(data)
  if(data.message==='success') console.log('Got the user Data')
  else console.log('User data Failed')
})

