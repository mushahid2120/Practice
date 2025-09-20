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
      <div className="border-solid border-[1px] border-[#868685] flex flex-row text-2xl font-semiboldp p-2  pr-2 rounded-md">
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

          {allCurrencyCode.map((currency) => {
            return (
              <option value={currency} key={currency} >
                {currency.toUpperCase()}
              </option>
            );
          })}



        </select>
      </div>
    </div>
  );
}
