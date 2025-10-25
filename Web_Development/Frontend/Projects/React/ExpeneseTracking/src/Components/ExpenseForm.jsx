import React, { use, useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function ExpenseForm({
  setExpenses,
  expense,
  setExpense,
  setEditingRowId,
  editingRowId,
}) {
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const errorData = {};
    // if(!formData.title)
    //     errorData.title='Title is Required'
    // if(!formData.category)
    //     errorData.category='Please Select Category'
    // if(!formData.amount)
    //     errorData.amount='Amount is Required'
    // setErrors(errorData)

    Object.entries(formData).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 4) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });
    setErrors(errorData);
    return errorData;
  };

  const validateConfig = {
    title: [
      { required: true, message: "Please Enter Title" },
      { minLength: 5, message: "Title should be atleast 5 character long" },
    ],
    category: [{ required: true, message: "Please Select a Category" }],
    amount: [
      { required: true, message: "Please Enter an Amount" },
      { pattern: /^\d*\.?\d+$/, message: "Please Enter a Valid Number" },
    ],
  };

  // let titleRef = useRef();
  // let categoryRef = useRef();
  // const amountRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateForm = validate(expense);
    if (Object.keys(validateForm).length) return;

    if (editingRowId) {
      setExpenses((prevState) => {
        return prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId){
              return { ...expense, id: editingRowId };
          }
          return prevExpense;
        });
      });
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      setEditingRowId("");
      return;
    }

    setExpenses((prevState) => {
      return [
        ...prevState,
        {
          ...expense,
          id: crypto.randomUUID(),
          // title: titleRef.current.value,
          // category: categoryRef.current.value,
          // amount: amountRef.current.value,
          // id: crypto.randomUUID()
        },
      ];
    });
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          id="title"
          name="title"
          value={expense.title}
          onChange={handleChange}
          error={errors.title}
        />

        <SelectField
          label="Category"
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          options={["Grocery", "Clothes", "Bills", "Educations", "Medicine"]}
          defaultOption="All"
          error={errors.category}
        />

        <InputField
          label="Amount"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          error={errors.amount}
        />
        <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
      </form>
    </>
  );
}
