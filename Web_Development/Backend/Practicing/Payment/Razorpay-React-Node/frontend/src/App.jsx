import './App.css'

function App() {

  const handlePay = async() => {
    try {
      const res = await fetch('http://localhost:4000/create-order', { method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Mushahid Khan',
          amount: 50000
        })
       });
        const data = await res.json(); 
        console.log(data);
        popupOpen(data.orderid);
    } catch (error) {
      console.log(error);
    }
  } 

  const popupOpen=(orderid)=>{
    const options = {
      key: 'rzp_test_Scg5kOdstZW8iV', 
      amount: 50000,
      currency: 'INR',
      name: 'Mushahid',
      description: 'Testing Razorpay with react',
      order_id: orderid, 
      prefill: {
        name: 'Gaurav Kumar',
        email: 'guddu2120@gmail.com',
        contact: '9000090000'
      },
      notes: {
        address: 'this is razorpay testing'
      },
      theme: {
        color: '#3399cc'
      },
      handler: function (response){
        console.log(response)
    }}

    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
      console.log(response)
    });
    rzp1.open();
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
        </div>
        <button
          type="button"
          className="counter"
          onClick={handlePay}
        >
          Pay
        </button>
      </section>



      <div className="ticks"></div>
    </>
  )
}

export default App
