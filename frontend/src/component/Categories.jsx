import React from "react";
import { motion } from "framer-motion";
import { Coffee, Sandwich, Drumstick, IceCream, Pizza } from "lucide-react";

const categories = [
  { name: "PETIT-DÉJEUNER", icon: <Coffee className="w-6 h-6" /> },
  { name: "DÉJEUNER", icon: <Sandwich className="w-6 h-6" /> },
  { name: "DÎNER", icon: <Drumstick className="w-6 h-6" /> },
  { name: "DESSERT", icon: <IceCream className="w-6 h-6" /> },
  { name: "SNACKS", icon: <Pizza className="w-6 h-6" /> },
];

const Categories = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white py-16 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          {/* Texte à gauche */}
          <div className="lg:w-1/2">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-[#e27340] to-[#b0390e] text-white text-xs px-4 py-1 rounded-full mb-4 inline-block uppercase tracking-widest"
            >
              Explorer
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#5a3921]">
              Notre <span className="text-[#982b2b]">Palette</span> Variée
            </h2>
            <p className="text-[#7a5c44] text-base mb-6 leading-relaxed">
              Du petit-déjeuner aux snacks rapides, une collection de délices savoureux à portée de main.
              Trouvez la recette parfaite pour chaque envie ou humeur.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#982b2b] to-[#b0390e] text-white rounded-lg hover:shadow-md transition-all"
            >
              Voir Plus
            </motion.button>
          </div>

          {/* Grille à droite */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full lg:w-1/2">
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg border border-[#f0e0d6] flex flex-col items-center justify-center hover:bg-[#f9f4f1] transition-all"
              >
                <div className="p-3 bg-[#f9f4f1] rounded-full mb-3 text-[#e27340]">
                  {cat.icon}
                </div>
                <span className="font-medium text-[#5a3921] text-sm uppercase tracking-wider">
                  {cat.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Categories;