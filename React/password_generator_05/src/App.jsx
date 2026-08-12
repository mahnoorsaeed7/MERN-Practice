import { useState, useCallback, useEffect ,useRef } from "react";
import React from "react";
import Background from "./Background";

function App() {
  const cardStyle = {
    margin: "100px auto",
    maxWidth: "500px",
    width: "90%",
    padding: "40px 30px",
    borderRadius: "24px",
    boxShadow:
      "0 20px 40px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(255, 255, 255, 0.1) inset",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    fontFamily: "system-ui, sans-serif",
    textAlign: "center",
  };

  const [digitAllowed, setDigit] = useState(false);
  const [characterAllowed, setCharactser] = useState(false);
  const [length, setlength] = useState(7);
  const [password, setpassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let char = "!@#$%^&*()_";
    let digit = "0123456789";

    if (characterAllowed) str += char;
    if (digitAllowed) str += digit;

    for (let i = 1; i <= length; i++) {
      let idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }
    setpassword(pass);
  }, [length, digitAllowed, characterAllowed, setpassword]);

 
const passwordRef = useRef(null)
const passwordtoclipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,7)   // to select spicific length
  window.navigator.clipboard.writeText(password)
},
  [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, digitAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <Background />

      <div style={cardStyle}>
        <h1 style={{ marginTop: 0, marginBottom: "25px", fontSize: "2rem", fontWeight: "bold" }}>
          Password Generator
        </h1>
        
        <div className="flex flex-col gap-y-5 mb-2">
          {/* Main Display Input and Button Row */}
          <div className="flex shadow-md rounded-xl overflow-hidden bg-white/10 border border-white/20">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-3 px-4 bg-transparent text-white font-mono text-lg placeholder-gray-400"
              placeholder="Password will appear here"
              readOnly
              ref = {passwordRef }
            />
            <button className="shrink-0 bg-cyan-600 hover:bg-cyan-700 text-white px-5 font-medium transition-colors" onClick={passwordtoclipboard}>
              Copy
            </button>
          </div>
          
          {/* Control Settings Section */}
          <div className="flex flex-wrap text-sm gap-x-4 gap-y-2 justify-between items-center px-1 mt-2">
            {/* Range Slider Container */}
            <div className="flex items-center gap-x-2">
              <input 
                className="cursor-pointer accent-cyan-500 h-1.5 bg-gray-600 rounded-lg appearance-none w-28"
                type="range"
                min={5} 
                max={80}
                value={length}
                onChange={(e) => setlength(Number(e.target.value))}
              />
              <label className="font-medium text-gray-200 min-w-[75px] text-left">Length: {length}</label>
            </div>

            {/* Checkboxes Wrapper */}
            <div className="flex items-center gap-x-4">
              {/* Numbers Checkbox */}
              <div className="flex items-center gap-x-1.5">
                <input
                  type="checkbox" 
                  defaultChecked={digitAllowed}
                  id="numberInput"
                  className="w-4 h-4 cursor-pointer accent-cyan-500"
                  onChange={() => setDigit((prev) => !prev)} 
                />
                <label htmlFor="numberInput" className="cursor-pointer text-gray-200 select-none">Numbers</label>
              </div>

              {/* Characters Checkbox */}
              <div className="flex items-center gap-x-1.5">
                <input
                  type="checkbox" 
                  defaultChecked={characterAllowed}
                  id="charInput"
                  className="w-4 h-4 cursor-pointer accent-cyan-500"
                  onChange={() => setCharactser((prev) => !prev)} 
                />
                <label htmlFor="charInput" className="cursor-pointer text-gray-200 select-none">Characters</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
