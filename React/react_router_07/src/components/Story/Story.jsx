import React from "react";
import storyBg from "../../assets/stars-router.jpg";

export default function Story() {
  const lines = [
    "This is a story for that single reader.",
    "Three ways to survive in a ruined world.",
    "The genre of my life had changed.",
    "A story doesn't exist without a reader.",
    "If this world is a story, the ending is mine.",
    "The Star Stream is looking at you.",
    "Tell me, you fool, if I stay here, will I see the ending?",
    "Every star has its own tragedy.",
    "I am the only one who knows the epilogue.",
    "The story was written just for me."
  ];

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center px-4 py-12 overflow-hidden">
      

      <div className="absolute inset-0 z-0">
        <img 
          src={storyBg} 
          alt="Story Background" 
          className="w-full h-full object-cover opacity-35 brightness-[0.3] contrast-125 scale-105"
        />
       
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950" />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-neutral-800/80 bg-neutral-950/60 backdrop-blur-xl p-8 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] text-center">
        
       
        <div className="mb-8 space-y-1">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The Omniscient Viewpoint
          </h2>
        </div>

      
        <div className="space-y-4 text-neutral-300 font-medium text-sm sm:text-base md:leading-relaxed">
          {lines.map((line, index) => (
            <p 
              key={index}
              className="hover:text-cyan-300 transition-colors duration-200 cursor-default py-0.5 border-b border-neutral-900/40 last:border-none"
            >
              {line}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}
