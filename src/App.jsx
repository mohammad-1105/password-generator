import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  // useState Hook
  const [passwordLength, setPasswordLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copiedMsg, setCopiedMsg] = useState(false);

  // useCallback Hook
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_+-={}[];:'<>/?|\"";

    for (let i = 1; i <= passwordLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [passwordLength, numberAllowed, charAllowed, setPassword]);

  // useEffect Hook
  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, numberAllowed, charAllowed, passwordGenerator]);

  // useRef Hook

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    setCopiedMsg(true);
    setTimeout(() => {
      setCopiedMsg(false);
    }, 1500);
  }, [password]);
  return (
    <>
      <main className="bg-gray-700 px-4 py-5 rounded-lg shadow-md my-5 md:mx-auto w-full md:max-w-2xl">
        {copiedMsg ? (
          <h2 className="text-white font-serif duration-150">
            Copied to clipboard
          </h2>
        ) : null}
        <h1 className="text-white font-serif text-2xl text-center">
          Password Generator
        </h1>
        <div className="p-7">
          <div className="relative mb-10">
            <input
              ref={passwordRef}
              type="text"
              className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-4 pr-12 outline-none"
              placeholder="Your Password"
              value={password}
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-0 top-0 bottom-0 bg-blue-500 text-white px-4 py-2 rounded-r focus:outline-none hover:bg-blue-600 active:bg-blue-700"
            >
              Copy
            </button>
          </div>
          <div className="flex md:flex-row flex-col md:justify-between items-center px-5">
            <span className="flex md:inline flex-col items-center gap-1">
              <input
                type="range"
                min={8}
                max={50}
                value={passwordLength}
                onChange={(e) => {
                  setPasswordLength(e.target.value);
                }}
                className="appearance-none bg-gray-200 h-3 rounded-full outline-none mr-2 md:w-32 w-60"
              />
              <label className="text-orange-500 text-xl font-serif mb-5 md:mb-0">
                Length : {passwordLength}
              </label>
            </span>
            <span>
              <input
                type="checkbox"
                id="numberCheckbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                className="mr-1 appearance-none w-4 h-4 border border-gray-300 rounded-md checked:bg-red-500 checked:border-transparent focus:outline-none cursor-pointer"
              />
              <label className="text-orange-500 text-xl font-serif">
                Numbers
              </label>
            </span>
            <span>
              <input
                type="checkbox"
                id="charCheckbox"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                className="mr-1 appearance-none w-4 h-4 border border-gray-300 rounded-md checked:bg-red-500 checked:border-transparent focus:outline-none cursor-pointer"
              />
              <label className="text-orange-500 text-xl font-serif">
                Characters
              </label>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
export default App;
