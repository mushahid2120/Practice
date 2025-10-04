import { useRef, useState } from "react";
import "./App.css";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable";
import expenseData from "./expenseData";
import ContextMenu from "./Components/ContextMenu";

function App() {
  const [expenses, setExpenses] = useState(expenseData);
  const [selectContextId, setSelectContextId] = useState("");
  const [isEditingModeOn,setEditingModeOn]=useState(false)
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          expense={expense}
          setExpense={setExpense}
          setExpenses={setExpenses}
          selectContextId={selectContextId}
          setSelectContextId={setSelectContextId}
          isEditingModeOn={isEditingModeOn}
          setEditingModeOn={setEditingModeOn}
          
        />
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          setExpense={setExpense}
          selectContextId={selectContextId}
          setSelectContextId={setSelectContextId}
          setEditingModeOn={setEditingModeOn}
        />
      </div>
    </main>
  );
}

export default App;
