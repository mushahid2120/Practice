import React from "react";
import Portal from "./Portal";

function ContextMenu({
  isOpen,
  handleDelete,
  id,
  setIsContextMenu,
  setIsPortalOpen,
  name,
  setInputValue,
  listType,
  setRenameId
}) {
  return (
    isOpen && (
      <div className="absolute right-4 top-[70%] z-10 text-xl text-[#6B7280] font-normal bg-blue-200">
        <div
          className="hover:bg-slate-500 hover:text-white px-1"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await handleDelete(id);
            setIsContextMenu({ index: -1, listType: null });
          }}
        >
          Delete
        </div>
        <div
          className="hover:bg-slate-500 hover:text-white px-1"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setInputValue(name)
           setRenameId(id)
            setIsPortalOpen(listType)
            setIsContextMenu({ index: -1, listType: null })
            }}
        >
          Rename
        </div>
      </div>
    )
  );
}

export default ContextMenu;
