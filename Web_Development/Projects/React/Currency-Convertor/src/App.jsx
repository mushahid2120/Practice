import "./App.css";
import { MdOutlineSwapVert } from "react-icons/md";

import InputField from "./Components/InputField";
import { use, useEffect, useState } from "react";

function App() {
  const [allCurrencyData,setAllCurrencyData]=useState(1)
  const [allCurrencyCode, setAllCurrencyCode] = useState([]);
  const [fromSelectedCurrency, setFromSelectedCurrency] = useState("inr");
  const [toSelectedCurrency,setToSelectedCurrency]=useState("eur")

  const [amount,setAmount]=useState('')
  const [convertedAmount,setConvertedAmount]=useState('')

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromSelectedCurrency}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllCurrencyCode(Object.keys(data[fromSelectedCurrency]));
        setAllCurrencyData(data[fromSelectedCurrency])
      });
  }, [fromSelectedCurrency]);


  console.log(allCurrencyData[toSelectedCurrency])

  const handleSubmit=()=>{
      if(fromSelectedCurrency!==''){
        setConvertedAmount(Number(amount)*allCurrencyData[toSelectedCurrency])
      }
  }

  return (
    <main className="bg-[#163300] min-h-[100vh] flex items-center justify-center">
      <div className="w-full max-w-[500px] bg-white  px-6 py-4 rounded-md flex justify-center flex-col">
        <InputField
          label="Amount"
          allCurrencyCode={allCurrencyCode}
          selectedCurrency={fromSelectedCurrency}
          setSelectedCurrency={setFromSelectedCurrency}
          disabledInput={false}
          inputValue={amount}
          setOnChangeInput={setAmount}
        />
        <div className="bg-[#6ed92c] inline-block p-2 cursor-pointer rounded-full text-3xl my-3 mx-auto"
          onClick={()=>{
            setFromSelectedCurrency(toSelectedCurrency)
            setToSelectedCurrency(fromSelectedCurrency)
          }}
        >
          <MdOutlineSwapVert />
        </div>
        <InputField
          label="Converted to"
          allCurrencyCode={allCurrencyCode}
          selectedCurrency={toSelectedCurrency}
          setSelectedCurrency={setToSelectedCurrency}
          disabledInput={true}
          inputValue={convertedAmount}
          setOnChangeInput={setConvertedAmount}
        />
        <button 
        onClick={handleSubmit}
        className="text-4xl font-semibold my-4 bg-[#6ed92c]  p-[6px] rounded-md">
          Convert
        </button>
      </div>
    </main>
  );
}

export default App;
