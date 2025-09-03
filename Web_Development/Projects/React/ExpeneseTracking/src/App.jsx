import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable";
import expenseData from "./expenseData";

function App() {
  const [expenses,setExpenses]=useState(expenseData);
  const [editingRowId,setEditingRowId]=useState('')
  const [expense, setExpense] = useState({
      title: "",
      category: "",
      amount: "",
    });


  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm setExpenses={setExpenses} expense={expense} setExpense={setExpense} setEditingRowId={setEditingRowId} editingRowId={editingRowId}/>
        <ExpenseTable expenses={expenses} setExpenses={setExpenses} setEditingRowId={setEditingRowId} setExpense={setExpense}/>
      </div>
    </main>
  );
}

export default App;
