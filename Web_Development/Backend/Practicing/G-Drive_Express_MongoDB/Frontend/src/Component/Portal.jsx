import {  useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

function Portal({ setIsPortalOpen, handleSubmit,setInputValue,inputValue}) {
  const id = useId();
  const inputRef=useRef()
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
      className="flex justify-center items-center h-full fixed inset-0  bg-[#000000b6]"
      onClick={() => {
        setIsPortalOpen(false);
      }}
    >
      <form
        className="bg-white w-full max-w-96 p-4 text-xl rounded-md space-y-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="id">
          Rename <br />
        </label>
        <input
          type="text"
          name="input"
          id={id}
          className="w-full p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Rename you file or folder"
          value={inputValue}
          onChange={(e)=>{setInputValue(e.target.value)}}
          ref={inputRef}
        />
        <div className="flex justify-end gap-4">
          <button
            type="reset"
            className=" text-white  rounded-lg px-2 py-1 bg-red-600 hover:bg-red-700 "
            onClick={() => {
              setIsPortalOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" text-white  rounded-lg px-2 py-1 bg-blue-600 hover:bg-blue-700 "
            onClick={(e) => {
              handleSubmit(e);
              setIsPortalOpen(false);
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>,
    document.querySelector("#portal")
  );
}

export default Portal;
