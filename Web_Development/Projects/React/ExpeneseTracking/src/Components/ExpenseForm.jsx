import React, { use, useEffect, useRef, useState } from "react";

export default function ExpenseForm({ setExpenses }) {


  let titleRef = useRef();
  let categoryRef = useRef();
  const amountRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses((prevState) => {
      return [...prevState, { 
      title: titleRef.current.value,
      category: categoryRef.current.value,
      amount: amountRef.current.value,
      id: crypto.randomUUID()
       }];
    });

  };

 

  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            // value={expense.title}
            // onChange={(e) =>
            //   setExpense((prevState) => ({
            //     ...prevState,
            //     title: e.target.value,
            //   }))
            // }
            ref={titleRef}
          />
        </div>
        <div className="input-container">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            // value={expense.category}
            // onChange={(e) =>
            //   setExpense((prevState) => ({
            //     ...prevState,
            //     category: e.target.value,
            //   }))
            // }
            ref={categoryRef}
          >
            <option value="">All</option>
            <option value="grocery">Grocery</option>
            <option value="clothes">Clothes</option>
            <option value="bills">Bills</option>
            <option value="education">Education</option>
            <option value="medicine">Medicine</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            // value={expense.amount}
            // onChange={(e) =>
            //   setExpense((prevState) => ({
            //     ...prevState,
            //     amount: e.target.value,
            //   }))
            // }
            ref={amountRef}
          />
        </div>
        <button className="add-btn">Add</button>
      </form>
    </>
  );
}
