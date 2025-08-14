import React from 'react'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full bg-[#222] text-white py-4 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        
        {/* Left - Credits */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold">Chronotrex</h3>
          <p className="text-xs text-gray-300">
            Designed & Developed under{" "}
            <span className="font-bold text-indigo-400">Siretrex Works</span>.
          </p>
        </div>

        {/* Right - Contact Info */}
        <div className="flex flex-col items-center sm:items-end gap-1 text-xs">
          <p>
            Email:{" "}
            <a
              href="mailto:siretrexritik@gmail.com"
              className="hover:underline text-indigo-300"
            >
              siretrexritik@gmail.com
            </a>
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/ritik-kaliyar-92203229b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-400"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://instagram.com/your-handle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-pink-400"
            >
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-[10px] mt-2 text-gray-400">
        © {new Date().getFullYear()} Chronotrex by Siretrex Works. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
