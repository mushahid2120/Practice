console.log("hellow World")
const button=document.querySelector("button")



button.addEventListener('click',(e)=>{
    const rzp= new Razorpay({
         "key": "rzp_test_Scg5kOdstZW8iV",
         amount: 50000,
         description: "My first payment",
         name:"Md Mushahid",
         currency: "INR",
         "prefill": { 
        "name": "Gaurav Kumar", 
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210" 
    },
    })
    rzp.open();
})