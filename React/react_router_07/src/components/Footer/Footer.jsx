import React from "react";
import { Link } from "react-router-dom";
import logoimage from "../../assets/orv-logo.png";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 mt-12">
      <div className="mx-auto w-full max-w-7xl p-6 py-8 lg:py-12">
        <div className="md:flex md:justify-between md:items-start gap-8">
          
        
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center group">
              <img 
                src={logoimage} 
                className="mr-4 h-14 w-auto object-contain opacity-80 brightness-125 transition-opacity group-hover:opacity-100" 
                alt="ORV Logo" 
              />
            </Link>
            <p className="mt-3 text-xs text-neutral-500 max-w-xs">
              A responsive interface inspired by the final reader's perspective.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-bold tracking-wider text-neutral-400 uppercase">
                Resources
              </h2>
              <ul className="text-neutral-400 font-medium text-sm space-y-2.5">
                <li>
                  <Link to="/" className="hover:text-white transition-colors duration-200">
                    Home
                  </Link>
                </li>
                
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xs font-bold tracking-wider text-neutral-400 uppercase">
                Follow us
              </h2>
              <ul className="text-neutral-400 font-medium text-sm space-y-2.5">
               
                <li>
                  <Link to="/" className="hover:text-white transition-colors duration-200">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xs font-bold tracking-wider text-neutral-400 uppercase">
                Legal
              </h2>
              <ul className="text-neutral-400 font-medium text-sm space-y-2.5">
                <li>
                  <Link to="#" className="hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors duration-200">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

       
        <hr className="my-8 border-neutral-900" />
        
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-xs text-neutral-500 sm:text-center">
            © 2026{" "}. Modified for ORV layout.
          </span>
        </div>
      </div>
    </footer>
  );
}
