import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.png'; 
 
const Navbar = () => { 
  const [isOpen, setIsOpen] = useState(false); 
 
  const toggleMenu = () => { 
    setIsOpen(!isOpen); 
  }; 
 
  return ( 
    <div className="relative">
      <nav className="bg-[#1a1f22] shadow-lg"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="flex justify-between h-20"> 
            <div className="flex items-center relative z-10">
              <div className="absolute bottom-0 translate-y-1/2 flex items-center"> 
                <Link to="/" className="flex items-center"> 
                  <img src={logo} alt="logo" className="h-16 w-16" /> 
                  <div className="ml-4"> 
                    <div className="flex items-center">
                        <span className="text-[#00A3FF] font-semibold text-2xl me-2">DEEP </span>
                        <span className="text-[#00A3FF] font-semibold text-2xl">NET</span>
                    </div>
                   
                    <div className="text-gray-400 font-semibold text-2xl -mt-1">SOFT</div> 
                  </div> 
                </Link> 
              </div>
              <div className="w-28"></div>
            </div> 
 
            <div className="hidden md:flex items-end pb-2 me-10"> 
              <div className="flex space-x-8"> 
                <Link to="/" className="text-white hover:text-[#00A3FF] text-sm uppercase font-medium"> 
                  Home 
                </Link> 
                <Link to="/menu" className="text-white hover:text-[#00A3FF] text-sm uppercase font-medium"> 
                  Menu 
                </Link> 
                <Link to="/reservation" className="text-white hover:text-[#00A3FF] text-sm uppercase font-medium"> 
                  Make a Reservation 
                </Link> 
                <Link to="/contact" className="text-white hover:text-[#00A3FF] text-sm uppercase font-medium"> 
                  Contact Us 
                </Link> 
              </div> 
            </div> 
 
            <div className="md:hidden flex items-center"> 
              <button 
                onClick={toggleMenu} 
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#00A3FF] focus:outline-none" 
              > 
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                > 
                  {isOpen ? ( 
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> 
                  ) : ( 
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> 
                  )} 
                </svg> 
              </button> 
            </div> 
          </div> 
        </div> 
 
        {isOpen && ( 
          <div className="md:hidden bg-[#1a1f22] border-t border-gray-800"> 
            <div className="px-2 pt-2 pb-3 space-y-1 ml-20"> 
              <Link to="/" className="text-white hover:text-[#00A3FF] block px-3 py-2 text-base font-medium"> 
                Home 
              </Link> 
              <Link to="/menu" className="text-white hover:text-[#00A3FF] block px-3 py-2 text-base font-medium"> 
                Menu 
              </Link> 
              <Link to="/reservation" className="text-white hover:text-[#00A3FF] block px-3 py-2 text-base font-medium"> 
                Make a Reservation 
              </Link> 
              <Link to="/contact" className="text-white hover:text-[#00A3FF] block px-3 py-2 text-base font-medium"> 
                Contact Us 
              </Link> 
            </div> 
          </div> 
        )} 
      </nav>
    </div>
  ); 
}; 
 
export default Navbar;