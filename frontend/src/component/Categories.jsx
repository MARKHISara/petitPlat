import React from "react";
import { FaCoffee, FaHamburger, FaDrumstickBite, FaIceCream, FaPizzaSlice } from "react-icons/fa";

const categories = [
  { name: "Petit-déjeuner", icon: <FaCoffee className="text-orange-500 text-2xl" /> },
  { name: "Déjeuner", icon: <FaHamburger className="text-orange-500 text-2xl" /> },
  { name: "Dîner", icon: <FaDrumstickBite className="text-orange-500 text-2xl" /> },
  { name: "Dessert", icon: <FaIceCream className="text-orange-500 text-2xl" /> },
  { name: "Snacks", icon: <FaPizzaSlice className="text-orange-500 text-2xl" /> },
];

const Categories = () => {
  return (
    <section className="bg-[#d6efff] py-16 px-8 rounded-xl mt-[-40px] mx-6 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Texte à gauche */}
        <div className="md:w-1/2">
          <span className="bg-orange-500 text-white text-sm px-4 py-1 rounded-full mb-3 inline-block uppercase tracking-wide">Explorer</span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Notre Palette Variée</h2>
          <p className="text-gray-700 text-base mb-6 leading-relaxed">
            Du petit-déjeuner aux snacks rapides, une collection de délices savoureux à portée de main.
            Trouvez la recette parfaite pour chaque envie ou humeur.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-orange-500 transition">
            Voir Plus
          </button>
        </div>

        {/* Grille à droite */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full md:w-1/2">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center justify-center hover:bg-orange-100 transition"
            >
              {cat.icon}
              <span className="mt-3 font-semibold text-gray-800">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
