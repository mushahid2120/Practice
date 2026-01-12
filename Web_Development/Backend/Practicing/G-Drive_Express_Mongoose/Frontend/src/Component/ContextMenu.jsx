// import React from "react";
// import Portal from "./Portal";

// function ContextMenu({
//   isOpen,
//   handleDelete,
//   id,
//   setIsContextMenu,
//   setIsPortalOpen,
//   name,
//   setInputValue,
//   listType,
//   setRenameId
// }) {
//   return (
//     isOpen && (
//       <div className="cursor-pointer absolute right-4 top-[70%] z-10 text-xl text-[#6B7280] font-normal bg-blue-200">
//         <div
//           className="hover:bg-slate-500 hover:text-white px-1"
//           onClick={async (e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             await handleDelete(id);
//             setIsContextMenu({ index: -1, listType: null });
//           }}
//         >
//           Delete
//         </div>
//         <div
//           className="hover:bg-slate-500 hover:text-white px-1"
//           onClick={(e) => {
//             e.preventDefault()
//             e.stopPropagation()
//             setInputValue(name)
//            setRenameId(id)
//             setIsPortalOpen(listType)
//             setIsContextMenu({ index: -1, listType: null })
//             }}
//         >
//           Rename
//         </div>
//       </div>
//     )
//   );
// }

// export default ContextMenu;

import React from "react";

function ContextMenu({
  isOpen,
  handleDelete,
  id,
  setIsContextMenu,
  setIsPortalOpen,
  name,
  setInputValue,
  listType,
  setRenameId,
}) {
  return (
    isOpen && (
      <div
        className="absolute right-2 top-14 z-50 w-44 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {/* Rename Option */}
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-all duration-150 group"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setInputValue(name);
            setRenameId(id);
            setIsPortalOpen(listType);
            setIsContextMenu({ index: -1, listType: null });
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <span className="font-medium text-sm">Rename</span>
        </button>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Delete Option */}
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 transition-all duration-150 group"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await handleDelete(id);
            setIsContextMenu({ index: -1, listType: null });
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <span className="font-medium text-sm">Delete</span>
        </button>
      </div>
    )
  );
}

export default ContextMenu;
