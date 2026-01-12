import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

function Portal({ setIsPortalOpen, handleSubmit, setInputValue, inputValue }) {
  const id = useId();
  const inputRef = useRef();
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
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Rename Item</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label 
              htmlFor="rename-input" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              New Name
            </label>
            <input
              type="text"
              name="input"
              id="rename-input"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-gray-800 font-medium"
              placeholder="Enter new name..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              ref={inputRef}
              required
            />
          </div>

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
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.querySelector("#portal")
  );
 
  // return createPortal(
  //   <div
  //     className="flex justify-center items-center h-full fixed inset-0  bg-[#000000b6]"
  //     onClick={() => {
  //       setIsPortalOpen(false);
  //     }}
  //   >
  //     <form
  //       className="bg-white w-full max-w-96 p-4 text-xl rounded-md space-y-2"
  //       onClick={(e) => {
  //         e.stopPropagation();
  //       }}
  //       onSubmit={(e) => {
  //         handleSubmit(e);
  //       }}
  //     >
  //       <label htmlFor="id">
  //         Rename <br />
  //       </label>
  //       <input
  //         type="text"
  //         name="input"
  //         id={id}
  //         className="w-full p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //         placeholder="Rename you file or folder"
  //         value={inputValue}
  //         onChange={(e) => {
  //           setInputValue(e.target.value);
  //         }}
  //         ref={inputRef}
  //       />
  //       <div className="flex justify-end gap-4">
  //         <button
  //           type="reset"
  //           className=" text-white  rounded-lg px-2 py-1 bg-red-600 hover:bg-red-700 "
  //           onClick={() => {
  //             setIsPortalOpen(false);
  //           }}
  //         >
  //           Cancel
  //         </button>
  //         <button
  //           type="submit"
  //           className=" text-white  rounded-lg px-2 py-1 bg-blue-600 hover:bg-blue-700 "
  //           onClick={(e) => {
  //             handleSubmit(e);
  //             setIsPortalOpen(false);
  //           }}
  //         >
  //           Save
  //         </button>
  //       </div>
  //     </form>
  //   </div>,
  //   document.querySelector("#portal")
  // );
}

export default Portal;
