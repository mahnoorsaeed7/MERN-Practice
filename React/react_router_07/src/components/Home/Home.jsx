import React from "react";
import { Link } from "react-router-dom";
import bgimage from "../../assets/subway.jpg";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">

      <h1 className="text-center text-3xl sm:text-6xl font-bold tracking-wider py-8 bg-gradient-to-r from-neutral-200 via-white to-neutral-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        Omniscient Reader's Viewpoint
      </h1>


      <aside className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] group">
        
        <div className="w-full h-[450px] sm:h-[550px] overflow-hidden">
          <img 
            src={bgimage} 
            alt="Subway" 
            className="w-full h-full object-cover opacity-75 brightness-50 contrast-125 saturate-[0.85] transition-transform duration-1000 ease-out group-hover:scale-105" 
          />
        </div>

        
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80 pointer-events-none" />
        
     
        <div className="absolute inset-0 z-10 flex items-end justify-center sm:justify-start px-6 pb-12 sm:p-16">
          <div className="max-w-xl space-y-6 text-center sm:text-left backdrop-blur-sm sm:backdrop-blur-none bg-neutral-950/50 sm:bg-transparent p-6 sm:p-0 rounded-xl border border-white/5 sm:border-none shadow-xl sm:shadow-none">
            
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                Scenario #01 Beginning
              </span>
              <h2 className="text-3xl font-extrabold sm:text-5xl text-white tracking-tight leading-tight">
                Read the Story.
                <span className="block text-xl sm:text-2xl mt-2 font-medium text-neutral-400">
                  Change the Epilogue.
                </span>
              </h2>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed max-w-md hidden sm:block">
              There are three ways to survive the apocalypse. Now, the story has become reality, and the final solo reader knows the ending.
            </p>

            <div>
              <Link
                className="inline-flex items-center px-6 py-3.5 font-semibold text-neutral-950 bg-white rounded-lg shadow-lg hover:bg-neutral-200 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 group/btn"
                to="/story"
              >
                <svg
                  className="fill-neutral-950 mr-2.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                </svg>
                Start Reading
              </Link>
            </div>

          </div>
        </div>
      </aside>
    </div>
  );
}
