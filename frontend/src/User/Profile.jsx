import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { FaHome, FaTasks, FaUsers,FaUser, FaClock, FaEdit, FaCog } from "react-icons/fa";

class Profile extends Component {
  render() {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800">
        

        <div className="flex">
          <aside className="w-64 bg-white p-6 mt-1 " >
            <nav className="space-y-3">
              <SidebarLink to="/profile" label="Mon Profile" icon={<FaUser />} />
              <SidebarLink to="/Myrecepies" label="Mes Recettes" icon={<FaTasks />} />
              <SidebarLink to="/team" label="Manage Team" icon={<FaUsers />} />
              <SidebarLink to="/reports" label="Hours Reports" icon={<FaClock />} />
              <SidebarLink to="/edit-time" label="Edit Time" icon={<FaEdit />} />
              <SidebarLink to="/settings" label="Settings" icon={<FaCog />} />
            </nav>
          </aside>

       
        </div>
      
      </div>
    );
  }
}

class SidebarLink extends Component {
  render() {
    const { to, label, icon } = this.props;
    return (
      <Link 
        to={to}
        className="flex items-center space-x-3 p-3 text-gray-700 font-medium rounded-md hover:bg-orange-50 hover:text-orange-500 transition-colors"
      >
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </Link>
    );
  }
}

class InputField extends Component {
  render() {
    const { label, placeholder, full } = this.props;
    return (
      <div className={full ? "md:col-span-2" : ""}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-200"
        />
      </div>
    );
  }
}

export default Profile;