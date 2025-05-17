import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaUserCircle, FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#f0e0d6]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo et nom */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <FaUtensils className="w-8 h-8 text-[#e27340]" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#982b2b] rounded-full"></span>
          </div>
          <motion.span 
            whileHover={{ scale: 1.02 }}
            className="text-xl font-bold bg-gradient-to-r from-[#982b2b] to-[#b0390e] bg-clip-text text-transparent"
          >
            MonPetitPlat
          </motion.span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="relative px-2 py-1 text-[#5a3921] font-medium group"
          >
            Accueil
            <span className="absolute bottom-0 left-0 h-0.5 bg-[#e27340] transition-all duration-300 w-0 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/recipes" 
            className="relative px-2 py-1 text-[#5a3921] font-medium group"
          >
            Recettes
            <span className="absolute bottom-0 left-0 h-0.5 bg-[#e27340] transition-all duration-300 w-0 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/about" 
            className="relative px-2 py-1 text-[#5a3921] font-medium group"
          >
            À propos
            <span className="absolute bottom-0 left-0 h-0.5 bg-[#e27340] transition-all duration-300 w-0 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Actions utilisateur */}
        {user ? (
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link 
                to="/mes-recettes" 
                className="flex items-center space-x-2 text-[#982b2b] hover:text-[#e27340] transition-colors"
              >
                <FaUserCircle className="text-2xl" />
                <span className="hidden md:inline font-medium">{user.username}</span>
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-4 py-2 bg-[#982b2b] text-white rounded-lg hover:bg-[#b0390e] transition-colors shadow-md hover:shadow-lg"
            >
              Déconnexion
            </motion.button>
          </div>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login">
              <button className="px-4 py-2 bg-gradient-to-r from-[#982b2b] to-[#b0390e] text-white rounded-lg hover:from-[#b0390e] hover:to-[#e27340] transition-all shadow-md hover:shadow-lg">
                Se connecter
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;