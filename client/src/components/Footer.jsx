import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { GiRotaryPhone } from 'react-icons/gi'
import { SlEnvolope } from 'react-icons/sl'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-8">
          <div className="border border-gray-800 rounded-xl p-6 bg-[#00000080]">
            <h3 className="text-[#1E90FF] text-base uppercase mb-4">Connect With Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
              <GiRotaryPhone className='text-yellow-400' />
                <a href="tel:+919567843340" className="text-gray-400 hover:text-[#1E90FF] transition-colors text-sm">
                  +91 9567843340
                </a>
              </div>
              <div className="flex items-center gap-2">
              <SlEnvolope className='text-yellow-400' />
                <a href="mailto:info@deepnetsoft.com" className="text-sm">
                  <span className=" text-gray-400 hover:text-[#1E90FF] transition-colors text-sm">info@deepnetsoft.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border border-gray-800 rounded-xl p-6 bg-[#00000080] flex flex-col items-center justify-center">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                <span className="text-[#1E90FF]">DEEP</span>
                <span className="text-white"> NET </span>
                <span className="text-gray-400">SOFT</span>
              </h2>
            </div>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-gray-600 hover:text-[#1E90FF] transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#1E90FF] transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#1E90FF] transition-colors">
                <FaYoutube size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#1E90FF] transition-colors">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          <div className="border border-gray-800 rounded-xl p-6 bg-[#00000080]">
            <h3 className="text-[#1E90FF] text-base uppercase mb-4">Find Us</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              First floor, Geo infopark,<br />
              Infopark EXPY, Kakkanad
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-[#4A4A4A] text-sm">
              © 2024 Deepnetsoft Solutions. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-[#4A4A4A] hover:text-[#1E90FF] transition-colors">Terms & Conditions</a>
              <a href="#" className="text-[#383b38] hover:text-[#1E90FF] transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 