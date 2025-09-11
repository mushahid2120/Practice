import { useState } from "react";
import "./App.css";
import heroImg from "/images/247Img.png"
import MsgWhite from "/images/MessageWhiteIcon.png"
import PhoneImg from "/images/phoneIcon.png"
import MsgBlack from "/images/MessageBlackIcon.png"
import InputField from "./Components/InputField"
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-screen-xl mx-auto px-4 flex justify-center items-center  flex-col ">
      <header>
        <h1 className="font-extrabold text-3xl font-[Poppins]">CONTACT US</h1>
        <p className="font-semibold text-[10px] text-[#5A5959] max-w-4xl">
          LET’S CONNECT: WE’RE HERE TO HELP, AND WE’D LOVE TO HEAR FROM YOU!
          WHETHER YOU HAVE A QUESTION, COMMENT, OR JUST WANT TO CHAT , YOU CAN
          REACH OUT TO US THROUGH THE CONTACT FORM OF THIS PAGE, OR BY PHONE,
          EMAIL, OR SOCIAL MEDIA.{" "}
        </p>
      </header>
      <main className="flex items-center ">
          <div className="">
            <div className="flex gap-4 mt-4">
              <button className="flex gap-2 justify-center items-center bg-black text-white font-semibold text-[10px] h-7 w-48 rounded-md">
                <img src={MsgWhite} alt="" />
                <span>VIA CHAT SUPPORT</span>
              </button>
              <button className="flex gap-2 justify-center items-center bg-black text-white font-semibold text-[10px] h-7 w-48 rounded-md">
                <img src={PhoneImg} alt="" />
                <span>VIA CALL</span>
              </button>
            </div>
            <button className="flex gap-2 justify-center items-center  font-semibold text-[10px] h-7 py-[6px] rounded-md border-solid border-2 border-black w-full mt-3 mb-4">
                <img src={MsgBlack} alt="" />
                <span>VIA EMAIL FORM</span>
              </button>
              <form  className="flex flex-col gap-4 px-2">
                <InputField name="Name"  />
                <InputField name="E-Mail"  />
                <label htmlFor="text" className="relative">
                  <span className="font-semibold text-[12px] absolute white -top-2 left-4 bg-white">Text</span>
                  <textarea name="text" id="text" className="border-[#5A5959]  outline-none border-solid border-[1.5px] rounded-[4px] h-[160px] w-full p-2 text-sm resize-none"></textarea>
                </label>

                <button className="flex gap-2 justify-center items-center bg-black text-white font-semibold text-[10px] h-7 w-48 rounded-md ml-auto">
                <span>SUBMIT</span>
              </button>
              </form>
          </div>
          <div className="h-[400px]"><img src={heroImg} alt="" className="h-full"/></div>
      </main>
    </div>
  );  
}

export default App;
