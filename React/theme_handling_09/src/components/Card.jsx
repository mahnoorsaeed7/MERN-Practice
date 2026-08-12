import React from 'react' 
import forestImg from '../assets/forest.jpg'
// Then use inside the component: src={forestImg}

export default function Card() { 
  return ( 
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden shadow-md transition-colors"> 
      <a href="https://unsplash.com/photos/gray-road-in-between-trees-in-grayscale-photography-WXX_DhjlmD4" target="_blank" rel="noreferrer"> 
        <img 
          className="w-full h-64 object-cover grayscale contrast-125 opacity-80" 
          /* This specific URL pulls the raw image file for the forest road */
          src={forestImg}
          alt="forest" 
        /> 
      </a> 
      <div className="p-5"> 
        <a href="/"> 
          <h5 className="text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 hover:text-blue-600 dark:hover:text-white transition-colors"> 
            FOREST IN GRAYSCALE PHOTOGRAPHY
          </h5> 
        </a> 
        <div className="flex items-center mt-2.5 mb-5 border-t border-b border-zinc-200 dark:border-zinc-800/60 py-2.5"> 
          <div className="flex space-x-0.5 text-yellow-500"> 
            <span>★</span> <span>★</span> <span>★</span> <span>★</span> <span className="text-zinc-300 dark:text-zinc-600">★</span> 
          </div> 
          <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-2xs font-medium ml-3 px-2 py-0.5 rounded-sm"> 
            4.0 
          </span> 
        </div> 
        <div className="flex items-center justify-between"> 
          <div className="flex flex-col"> 
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Value</span> 
            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-200">$5</span> 
          </div> 
          <a href="/" className="text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-medium rounded-sm text-xs px-4 py-2 text-center transition-colors"> 
            Add to cart 
          </a> 
        </div> 
      </div> 
    </div> 
  ); 
}
