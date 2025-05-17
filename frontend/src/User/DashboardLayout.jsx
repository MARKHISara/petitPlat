import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Utensils, Users, User, PlusCircle, BookOpen, LayoutGrid, Heart } from "lucide-react";
import { motion } from "framer-motion";

const SidebarLink = ({ to, label, icon, isActive }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }} 
    whileTap={{ scale: 0.98 }}
    className="relative"
  >
    <Link
      to={to}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-[#982b2b]/10 text-[#982b2b] font-semibold"
          : "text-[#5a3921] hover:bg-[#982b2b]/5 hover:text-[#982b2b]"
      }`}
    >
      <span className={`w-5 h-5 ${isActive ? "text-[#982b2b]" : "text-[#5a3921]"}`}>
        {icon}
      </span>
      <span>{label}</span>
      {isActive && (
        <motion.div 
          layoutId="sidebar-active-indicator"
          className="absolute left-0 w-1 h-6 bg-[#982b2b] rounded-r-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  </motion.div>
);

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { to: "/profile", label: "Mon Profil", icon: <User size={20} /> },
    { to: "/mes-recettes", label: "Mes Recettes", icon: <Utensils size={20} /> },
    { to: "/ajouter-recette", label: "Ajouter Recette", icon: <PlusCircle size={20} /> },
    { to: "/favoris", label: "J'aimes", icon: <Heart size={20} /> },
    { to: "/comment", label: "Commentaires", icon: <BookOpen size={20} /> },
    { to: "/category", label: "Catégories", icon: <LayoutGrid size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f5] text-[#5a3921] flex">
      {/* Sidebar fixe avec ombre plus prononcée */}
      <aside className="w-64 bg-white p-6 fixed h-full border-r border-[#f0e0d6] shadow-lg z-10">
        {/* Logo/Titre avec la couleur bordeaux */}
        <div className="mb-8 pl-2">
          <h1 className="text-2xl font-bold">
            <span className="text-[#982b2b]">m</span>
            <span>esRecettes</span>
          </h1>
          <p className="text-sm text-[#5a3921]/60">Votre carnet culinaire</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <SidebarLink
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>

        {/* Section bas de sidebar */}
        <div className="absolute bottom-6 left-6 right-6">
          <SidebarLink
            to="/settings"
            label="Paramètres"
            icon={<Users size={20} />}
            isActive={location.pathname === "/settings"}
          />
        </div>
      </aside>

      {/* Main content avec padding pour compenser le sidebar fixe */}
      <main className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-[#f0e0d6]"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;