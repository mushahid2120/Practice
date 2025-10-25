import React from "react";

export default function ContextMenu({
  mousePosition,
  setMousePosition,
  selectContextId,
  setSelectContextId,
  expenses,
  setExpenses,
  setExpense,
  setEditingModeOn
}) {
  // if (!menuPosition.left) return;

  return (
    <div
      className="context-menu"
      style={{ left: mousePosition.left, top: mousePosition.top }}
    >
      <div
        onClick={() => {
          const matchedRow = expenses.find(
            (exp) => exp.id === selectContextId
          );
          setExpense(matchedRow)
          setEditingModeOn(true)
          setMousePosition('')
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((exp) => exp.id !== selectContextId)
          );
          setMousePosition("");
          setMousePosition('')
        }}
      >
        Delete
      </div>
    </div>
  );
}
