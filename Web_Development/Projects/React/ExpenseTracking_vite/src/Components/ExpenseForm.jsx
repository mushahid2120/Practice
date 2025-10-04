import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function ExpenseForm({
  expense,
  setExpense,
  setExpenses,
  isEditingModeOn,
  setEditingModeOn,
  selectContextId,
  setSelectContextId,
}) {
  console.log(isEditingModeOn);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditingModeOn) {
      setExpenses((prevState) =>
        prevState.map((exp) => {
          if (exp.id === selectContextId) return expense;
          return exp;
        })
      );
      setExpense({
      title: "",
      category: "",
      amount: "",
    });
    setEditingModeOn(false)
      return 
    }
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };
  return (
    <>
      <form className="expense-form">
        <InputField
          label="Title"
          id="title"
          name="title"
          value={expense.title}
          setExpense={setExpense}
        />

        <SelectField
          label="Category"
          id="category"
          name="category"
          value={expense.category}
          setExpense={setExpense}
        />

        <InputField
          label="Amount"
          id="amount"
          name="amount"
          value={expense.amount}
          setExpense={setExpense}
        />
        <button className="add-btn" onClick={handleSubmit}>
          {isEditingModeOn === true ? "Save" : "Submit"}
        </button>
      </form>
    </>
  );
}
