import React from "react";

export default function ContextMenu({
  menuPosition,
  rowId,
  setMenuPosition,
  setExpenses,
  expenses,
  setExpense
}) {
  if (!menuPosition.left) return;

  return (
    <div className="context-menu" style={menuPosition}>
      <div
        onClick={() => {
          const {title,category,amount}=expenses.find((expense)=>expense.id===rowId)
          setExpense({title,category,amount})
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setMenuPosition({});
          setExpenses((prevState) => prevState.filter((expense) =>(expense.id !== rowId)));}}
      >
        Delete
      </div>
    </div>
  );
}
