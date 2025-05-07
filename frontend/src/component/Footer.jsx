import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#f5e9d3] text-white rounded-t-3xl px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="MonPetitPlat logo" className="w-16 h-16"/>
   
      </div>
    
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 text-gray-700 text-sm font-medium uppercase">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">Recipes</a>
          <a href="#" className="hover:text-gray-400">Cooking Tips</a>
          <a href="#" className="hover:text-gray-400">About Us</a>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-4 text-xl">
          <FaTiktok className="hover:text-gray-400 cursor-pointer" />
          <FaFacebookF className="hover:text-gray-400 cursor-pointer" />
          <FaInstagram className="hover:text-gray-400 cursor-pointer" />
          <FaYoutube className="hover:text-gray-400 cursor-pointer" />
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-700" />

      {/* Copyright */}
      <p className="text-center text-xs text-gray-400">Copyright: © 2024 Cooks Delight.</p>
    </footer>
  );
}
