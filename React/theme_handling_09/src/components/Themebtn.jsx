import React from "react"; 
import useTheme from "../context/theme"; 

export default function Themebtn(){ 
  const {thememode, darkmode, lightmode} = useTheme() 
  
  const onChange = (e) => { 
    const isChecked = e.currentTarget.checked 
   
    if (isChecked) { 
      darkmode() 
    } else { 
      lightmode() 
    } 
  } 

  return (
    <label className="relative inline-flex items-center cursor-pointer select-none"> 
      <input 
        type="checkbox" 
        className="sr-only peer" 
        onChange={onChange} 
        checked={thememode === "dark"} 
      /> 
      <div className="w-9 h-5 bg-zinc-800 border border-zinc-700 rounded-sm peer peer-focus:outline-none peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-zinc-400 after:rounded-xs after:h-3 after:w-3 after:transition-all peer-checked:bg-zinc-900 peer-checked:border-zinc-600 peer-checked:after:bg-zinc-100"></div> 
      <span className="ml-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">Toggle Theme</span> 
    </label> 
  ); 
}
