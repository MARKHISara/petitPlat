// src/layout/DashboardLayout.js
import React from "react";
import { Link } from "react-router-dom";
import { FaTasks, FaUsers, FaUser, FaClock, FaEdit, FaCog } from "react-icons/fa";

const SidebarLink = ({ to, label, icon }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 p-3 text-gray-700 font-medium rounded-md hover:bg-orange-50 hover:text-orange-500 transition-colors"
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </Link>
);

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6">
        <nav className="space-y-3">
          <SidebarLink to="/profile" label="Mon Profile" icon={<FaUser />} />
          <SidebarLink to="/Myrecepies" label="Mes Recettes" icon={<FaTasks />} />
          <SidebarLink to="/team" label="Manage Team" icon={<FaUsers />} />
          <SidebarLink to="/reports" label="Hours Reports" icon={<FaClock />} />
          <SidebarLink to="/edit-time" label="Edit Time" icon={<FaEdit />} />
          <SidebarLink to="/settings" label="Settings" icon={<FaCog />} />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
