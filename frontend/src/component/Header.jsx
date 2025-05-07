import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa'; // Icône utilisateur

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className=" flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="MonPetitPlat logo" className="w-16 h-16" />
      </div>

      <nav className="space-x-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-orange-500">Accueil</Link>
        <Link to="/recipes" className="hover:text-orange-500">Recettes</Link>
        <Link to="/about" className="hover:text-orange-500">À propos</Link>
      </nav>

      {user ? (
        <div className="flex items-center space-x-4">
          {/* Icône utilisateur */}
          <Link to="/profile" className="text-gray-700 hover:text-orange-500 text-2xl">
            <FaUserCircle />
          </Link>

          {/* Bouton déconnexion */}
          <button
            onClick={logout}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-orange-500"
          >
            Déconnexion
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-orange-500">
            Se connecter
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
