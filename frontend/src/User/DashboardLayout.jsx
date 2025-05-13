import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Utensils, Users, Clock, Settings, User, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

const SidebarLink = ({ to, label, icon, isActive }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <Link
      to={to}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
        isActive
          ? "bg-[#f9f4f1] text-[#982b2b] font-medium border-l-4 border-[#e27340]"
          : "text-[#5a3921] hover:bg-[#f9f4f1] hover:text-[#b0390e]"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  </motion.div>
);

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { to: "/profile", label: "Mon Profil", icon: <User className="w-5 h-5" /> },
    { to: "/mes-recettes", label: "Mes Recettes", icon: <Utensils className="w-5 h-5" /> },
    { to: "/ajouter-recette", label: "Ajouter Recette", icon: <PlusCircle className="w-5 h-5" /> },
    { to: "/equipe", label: "Mon Équipe", icon: <Users className="w-5 h-5" /> },
    { to: "/historique", label: "Historique", icon: <Clock className="w-5 h-5" /> },
    { to: "/parametres", label: "Paramètres", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f9f4f1] text-[#5a3921] flex">
      {/* Sidebar fixe */}
      <aside className="w-64 bg-white p-6 fixed h-full border-r border-[#f0e0d6] shadow-sm">
  

        <nav className="space-y-2">
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
      </aside>

      {/* Main content avec padding pour compenser le sidebar fixe */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;