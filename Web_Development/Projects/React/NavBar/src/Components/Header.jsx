import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import Modal from "./Modal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="flex justify-between items-center px-6 py-2 shadow-lg">
      <img className="w-12" src={reactLogo} alt="react Logo" />
      <ul className="flex items-center gap-6 text-xl font-semibold cursor-pointer">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive && "text-blue-400 "}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="about"
            className={({ isActive }) => isActive && "text-blue-400 "}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="contact"
            className={({ isActive }) => isActive && "text-blue-400 "}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <button
            className=" py-1 px-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Sign In
          </button>
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            header={<div className="text-2xl font-semibold">Sign In</div>}
            footer={
              <div className="flex justify-end gap-4 text-lg font-semibold">
                <button
                  className="py-1 px-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="py-1 px-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Sign In
                </button>
              </div>
            }
          >
          <div className='flex flex-wrap gap-2 my-3 font-normal'>
                <input type="text" placeholder='UserName' className=' text-md border-solid border-[1.5px] border-slate-200 rounded-md outline-none p-1 '/>
                <input type="text" placeholder='Password' className=' text-md border-solid border-[1.5px] border-slate-200 rounded-md outline-none p-1'/>
            </div>
            </Modal>
        </li>
      </ul>
    </header>
  );
}
