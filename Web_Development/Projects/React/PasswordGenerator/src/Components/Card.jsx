import { useCallback, useEffect, useRef, useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

export default function () {
  const [isCopied, setIsCopied] = useState(false);
  const [passwordLength, setPasswordLength] = useState(5);
  const [showPassword, setShowPassword] = useState("");
  const [isCapital, setIsCapital] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);

  const gPassRef=useRef('')

  console.log(gPassRef.current)

  const generatedPassword = useCallback(() => {
    let passComb = "abcdefghijklmnopqrstuvwxyz";
    if (isCapital) passComb = passComb + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isNumber) passComb = passComb + "1234567890";
    if (isSymbol) passComb = passComb + "!@#$%^&*()_+~{}|:\"<>?`[]\\;,./'";

    let genPass = "";
    for (let index = 0; index < passwordLength; index++)
      genPass = genPass + passComb[Math.floor(Math.random() * passComb.length)];

    return genPass;
  }, [isCapital, isNumber, isSymbol, setPasswordLength]);

  useEffect(() => {
    setShowPassword(generatedPassword());
  }, []);


  return (
    <main className="bg-[#e5e7eb] rounded-xl w-full text-center px-4 py-6 mx-6 max-w-[1024px] ">
      <h1 className="text-2xl text-[#372580] font-semibold">
        Password Generator
      </h1>
      <p className="text-base text-[#4b6ba2] font-semibold">
        Generate strong, unique passwords
      </p>
      <div className="bg-[#f6f7f9] rounded-xl p-4 ">
        <div className="flex border-[1px] border-solid border-[#d1d5db] rounded-xl overflow-hidden">
          <input
            type="text"
            name="password"
            id="password"
            readOnly
            value={showPassword}
            ref={gPassRef}
            className="w-full outline-none bg-inherit text-2xl pl-2"
          />
          <div
            className="flex items-center text-[#6d4aff] font-semibold border-2 border-solid border-[#6d4aff] px-2 py-1 rounded-xl hover:bg-[#6d4aff] hover:text-white cursor-pointer m-[1px]"
            onClick={() => {
              console.log("before=="+isCopied)
              setIsCopied(!isCopied);
              console.log("After==="+isCopied)
              if(isCopied===false)
                  setTimeout(() => {
                    setIsCopied(false)
                  }, 5000);
            }}
          >
            {isCopied === true ? <LuCopyCheck /> : <LuCopy />}
            <span>Copy</span>
          </div>
        </div>
        <button
          onClick={() => {
            setShowPassword(generatedPassword);
          }}
          className="flex items-center mx-auto mt-5 bg-[#6d4aff] hover:bg-[#6d4aaa] ease-in-out text-white font-bold px-3 py-[6px] rounded-xl"
        >
          <LuRefreshCw />
          <span className="ml-1">Regenerate</span>
        </button>
        <div className="mx-4">
          <p>{passwordLength} characters</p>
          <input
            type="range"
            name="passwordLength"
            id="passwordLength"
            value={passwordLength}
            onChange={(e) => {
              setPasswordLength(e.target.value);
            }}
            className="w-4/5 "
            max={12}
            min={5}
          />
          <div className=" flex items-center justify-between align-middle">
            <label htmlFor="capLetter">
              <input
                onChange={(e) => {
                  setIsCapital(e.target.checked);
                }}
                checked={isCapital}
                type="checkbox"
                name="capLetter"
                id="capLetter"
                className="p-3"
              />
              Capital Letters
            </label>
            <label htmlFor="number">
              <input
                onChange={(e) => {
                  setIsNumber(e.target.checked);
                }}
                checked={isNumber}
                type="checkbox"
                name="number"
                id="number"
              />
              Numbers
            </label>
            <label htmlFor="symbol">
              <input
                onChange={(e) => {
                  setIsSymbol(e.target.checked);
                }}
                checked={isSymbol}
                type="checkbox"
                name="symbols"
                id="symbol"
              />
              Symbol
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
