// import React from 'react'
// 

// function Characters() {
//     const { nameid } = useParams();
//   return (
//     <div>
//       Name:{nameid}
      
//     </div>
//   )
// }

// export default Characters

import React from "react";
import kdjImg from "../../assets/kdokja.jpg"; 
import yjhImg from "../../assets/yjh.jpg";
import hsyImg from "../../assets/hsy.jpg"; 
import { useParams  } from 'react-router-dom'
export default function Characters() {
    const {nameid} = useParams();
  const characters = [
    { name: "Kim Dokja", role: "The Sole Reader", img: kdjImg, color: "group-hover:border-cyan-500" },
    { name: "Yoo Joonghyuk", role: "The Regressor", img: yjhImg, color: "group-hover:border-blue-600" },
    { name: "Han Sooyoung", role: "The Author", img: hsyImg, color: "group-hover:border-purple-500" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 text-white bg-transparent">
      
      {/* Page Title  - also using id here*/}
      <div className="text-center mb-16 space-y-2">
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Name : {nameid}
        </h1>
      </div>

      {/* Three Circle Frames Flex Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto place-items-center">
        {characters.map((char, index) => (
          <div key={index} className="flex flex-col items-center space-y-4 text-center group">
            
            {/* Symmetrical Circle Frame with Glow Effect */}
            <div className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-neutral-800 bg-neutral-900 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] ${char.color}`}>
              <img 
                src={char.img} 
                alt={char.name} 
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
              />
            </div>

            {/* Profile Label */}
            <div>
              <h3 className="text-xl font-bold tracking-wide group-hover:text-neutral-200 transition-colors">
                {char.name}
              </h3>
              <p className="text-xs font-semibold text-neutral-500 font-mono mt-0.5 uppercase tracking-wider">
                {char.role}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
