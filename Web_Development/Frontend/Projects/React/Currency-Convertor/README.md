# 💱 Currency Converter – React App

A responsive and functional **Currency Converter** built with **React**, featuring real-time exchange rates using the Fawaz Ahmed Currency API.

---

## 🪄 Live Preview
👉 **[View Demo](https://currency-convertor-react-vite12.netlify.app/)**  

---

## 🚀 Features
- Convert any currency to another in real-time  
- Dynamic currency dropdown populated from API  
- Swap button to interchange “From” and “To” currencies  
- Clean UI with Tailwind-styled layout  
- Reusable **InputField** component  
- Smooth and simple UX  

---

## 🧩 Tech Stack
- **React**  
- **Tailwind CSS**  
- **Currency API (FawazAhmed0)**  
- **React Icons**  

---

## 📁 Project Structure
```
currency-converter/
│
├── App.jsx                       # Main component
├── App.css                       # Styling
│
├── Components/
│   └── InputField.jsx            # Reusable currency input field
│
├── assets/ or images/            # (If needed)
│
├── index.html
└── README.md
```

---

## 🧠 How It Works

- User enters an amount in the **From Currency** box.  
- User selects two currencies from dynamic dropdown lists.  
- API fetches the latest rates for the selected “from” currency.  
- Converted amount is calculated as:  
  **amount × exchangeRate**  
- Swap button instantly switches the currencies.  
- Converted result appears in the second (disabled) field.

---

## 💡 How to Use
1. Clone the repository  
2. Run:  
   ```bash
   npm install
   npm run dev
   ```
3. Enter amount → choose currencies → click **Convert**  
4. Swap currencies anytime with one click  

---

## 🛠️ API Used
- **Fawaz Ahmed Currency API**  
  URL example:  
  ```
  https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json
  ```

---

## 🧩 Components & Code

### **InputField.jsx**
```jsx
import React from "react";

export default function InputField({
  label,
  allCurrencyCode,
  selectedCurrency,
  setSelectedCurrency,
  disabledInput,
  inputValue,
  setOnChangeInput
}) {
  return (
    <div className="">
      <label htmlFor="input" className="text-base font-semibold">
        {label}
      </label>
      <div className="border-solid border-[1px] border-[#868685] flex flex-row text-2xl p-2 rounded-md">
        <input
          type="number"
          id="input"
          name="input"
          value={inputValue}
          onChange={(e)=>{setOnChangeInput(e.target.value)}}
          disabled={disabledInput}
          className="w-full outline-none"
        />

        <select
          name="currency"
          id="currency"
          value={selectedCurrency}
          onChange={(e)=>{setSelectedCurrency(e.target.value.toLowerCase())}}
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
        >
          {allCurrencyCode.map((currency) => (
            <option value={currency} key={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
```

---

### **App.jsx**
```jsx
import "./App.css";
import { MdOutlineSwapVert } from "react-icons/md";
import InputField from "./Components/InputField";
import { useEffect, useState } from "react";

function App() {
  const [allCurrencyData, setAllCurrencyData] = useState(1);
  const [allCurrencyCode, setAllCurrencyCode] = useState([]);

  const [fromSelectedCurrency, setFromSelectedCurrency] = useState("inr");
  const [toSelectedCurrency, setToSelectedCurrency] = useState("eur");

  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromSelectedCurrency}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllCurrencyCode(Object.keys(data[fromSelectedCurrency]));
        setAllCurrencyData(data[fromSelectedCurrency]);
      });
  }, [fromSelectedCurrency]);

  const handleSubmit = () => {
    if (fromSelectedCurrency !== "") {
      setConvertedAmount(Number(amount) * allCurrencyData[toSelectedCurrency]);
    }
  };

  return (
    <main className="bg-[#163300] min-h-[100vh] flex items-center justify-center">
      <div className="w-full max-w-[500px] bg-white px-6 py-4 rounded-md flex flex-col">
        
        <InputField
          label="Amount"
          allCurrencyCode={allCurrencyCode}
          selectedCurrency={fromSelectedCurrency}
          setSelectedCurrency={setFromSelectedCurrency}
          disabledInput={false}
          inputValue={amount}
          setOnChangeInput={setAmount}
        />

        <div
          className="bg-[#6ed92c] inline-block p-2 cursor-pointer rounded-full text-3xl my-3 mx-auto"
          onClick={() => {
            setFromSelectedCurrency(toSelectedCurrency);
            setToSelectedCurrency(fromSelectedCurrency);
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
          className="text-4xl font-semibold my-4 bg-[#6ed92c] p-[6px] rounded-md"
        >
          Convert
        </button>
      </div>
    </main>
  );
}

export default App;
```

---

