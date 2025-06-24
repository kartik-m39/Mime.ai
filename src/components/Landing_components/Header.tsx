"use client";

import React from 'react';
import { Hand, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  return (
    <header className="relative z-50">
      <div className="flex justify-between items-center mb-2 px-4">

        <div className="flex items-center space-x-2 ml-6">
          <Hand className="w-8 h-8 text-blue-400" />
          <span className="text-2xl font-bold text-white">MIME.ai</span>
        </div>


        <div className="hidden md:flex justify-center items-center">
          <nav className="border border-slate-700 px-8 py-2 rounded-2xl bg-black/20 backdrop-blur-sm">
            <div className="flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                How It Works
              </a>
              <a href="#who-its-for" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
                Who It&apos;s For
              </a>
            </div>
          </nav>
        </div>


        <div className="hidden md:flex mr-6">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105" onClick={() => router.push("/upload")}>
            Try Now
          </button>
        </div>


        <button 
          className="md:hidden text-white mr-6"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>


      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-slate-700">
          <nav className="flex flex-col space-y-4 p-6">
            <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
              How It Works
            </a>
            <a href="#who-its-for" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium">
              Who It&apos;s For
            </a>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-medium w-fit">
              Try Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;