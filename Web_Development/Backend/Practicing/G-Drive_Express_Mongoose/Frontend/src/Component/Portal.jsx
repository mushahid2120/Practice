import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

function Portal({ setIsPortalOpen, handleSubmit, inputRef, inputValue,children,isPortalOpen }) {
  const id = useId();

  useEffect(() => {
    const node = inputRef.current;
    if (!node) return;
    const index = inputValue.lastIndexOf(".");
    const end = index === -1 ? inputValue.length : index;
    node.setSelectionRange(0, end);
    node.focus();
  }, []);

return createPortal(
    <div
      className="flex justify-center items-center h-full fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
      onClick={() => {
        setIsPortalOpen(false);
      }}
    >
      <form
        className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          setIsPortalOpen(false);
        }}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r from-${isPortalOpen.header.includes('Delete')?"red":"blue"}-500 to-${isPortalOpen.header.includes('Delete')?"red":"blue"}-600 px-4 py-4`}>
          <div className="flex items-center gap-3">
            </div>
            <h2 className="text-xl font-bold text-white">{isPortalOpen.header}</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {isPortalOpen.header.includes('Delete') ?<div className="text-lg">Are you sure want to Delete ?</div>:children }
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-5 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-all duration-200 border-2 border-gray-200"
              onClick={() => {
                setIsPortalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 bg-gradient-to-r from-${isPortalOpen.header.includes('Delete')?"red":"blue"}-500 to-${isPortalOpen.header.includes('Delete')?"red":"blue"}-600 text-white font-medium rounded-xl hover:from-${isPortalOpen.header.includes('Delete')?"red":"blue"}-600 hover:to-${isPortalOpen.header.includes('Delete')?"red":"blue"}-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-${isPortalOpen.header.includes('Delete')?"red":"blue"}-500/40 transition-all duration-200`}
            >
              {isPortalOpen.submitBtn}
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.querySelector("#portal")
  );
}

export default Portal;
