import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTiktok, FaUtensils } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white from-[#f9f4f1] to-[#f0e7e0] text-[#5a3921] border-t border-[#e27340]/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <FaUtensils className="text-[#e27340] text-3xl mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#982b2b] to-[#b0390e] bg-clip-text text-transparent">
                MonPetitPlat
              </span>
            </div>
            <p className="text-center md:text-left text-[#7a5c44]">
              Partager notre passion pour la cuisine artisanale depuis 2024
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-[#982b2b] mb-4">Navigation</h3>
            <nav className="flex flex-col space-y-3 text-center">
              <a href="#" className="hover:text-[#e27340] transition-colors">Accueil</a>
              <a href="#" className="hover:text-[#e27340] transition-colors">Recettes</a>
              <a href="#" className="hover:text-[#e27340] transition-colors">Astuces</a>
              <a href="#" className="hover:text-[#e27340] transition-colors">À propos</a>
            </nav>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-bold text-[#982b2b] mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#982b2b] text-white flex items-center justify-center hover:bg-[#b0390e] transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#982b2b] text-white flex items-center justify-center hover:bg-[#b0390e] transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#982b2b] text-white flex items-center justify-center hover:bg-[#b0390e] transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#982b2b] text-white flex items-center justify-center hover:bg-[#b0390e] transition-colors">
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-[#e27340]/30" />

        {/* Copyright */}
        <div className="text-center text-sm text-[#7a5c44]">
          <p>© 2024 MonPetitPlat - Tous droits réservés</p>
          <div className="flex justify-center space-x-4 mt-2 text-xs">
            <a href="#" className="hover:text-[#e27340]">Mentions légales</a>
            <a href="#" className="hover:text-[#e27340]">Politique de confidentialité</a>
            <a href="#" className="hover:text-[#e27340]">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
}