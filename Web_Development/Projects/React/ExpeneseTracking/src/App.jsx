import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable";
import expenseData from "./expenseData";

function App() {
  const [expenses,setExpenses]=useState(expenseData);
  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm setExpenses={setExpenses}/>
        <ExpenseTable expenses={expenses}/>
        <div className="context-menu">
          <div>Edit</div>
          <div>Delete</div>
        </div>
      </div>
    </main>
  );
}

export default App;
