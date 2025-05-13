import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChefHat, Clock, Flame, Users } from "lucide-react";


export default function RecipePage() {
  const [selectedCategory, setSelectedCategory] = useState("TOUT");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, recipesRes] = await Promise.all([
          fetch("http://localhost:8000/api/categories"),
          fetch("http://localhost:8000/api/recipes")
        ]);

        const categoriesData = await categoriesRes.json();
        const recipesData = await recipesRes.json();

        setCategories([{ id: 0, name: "TOUT" }, ...categoriesData.map(cat => ({
          id: cat.id,
          name: cat.name.toUpperCase(),
        }))]);

        setRecipes(recipesData.map(r => ({
          id: r.id,
          title: r.title,
          desc: r.steps.slice(0, 100) + "...",
          time: r.duration + " min",
          difficulty: r.difficulty,
          serves: r.portions + " PORTIONS",
          category: r.category?.name?.toUpperCase() || "AUTRE",
          image: r.image ? `http://localhost:8000/storage/${r.image}` : '/default.jpg'
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRecipes =
    selectedCategory === "TOUT"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  return (
 
      <div className="p-6 bg-[#f9f4f1] min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ChefHat className="text-[#e27340] w-8 h-8" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#982b2b] to-[#b0390e] bg-clip-text text-transparent">
                Nos Recettes
              </h1>
            </div>
            <p className="text-[#7a5c44] max-w-2xl mx-auto">
              Découvrez notre collection variée de recettes pour ravir toutes les papilles.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-gradient-to-r from-[#e27340] to-[#b0390e] text-white shadow-md'
                    : 'bg-white text-[#5a3921] hover:bg-[#f9f4f1] border border-[#f0e0d6]'
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e27340]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-[#f0e0d6]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="font-bold text-white text-lg">{recipe.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-[#7a5c44]">{recipe.desc}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-[#5a3921]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#e27340]" /> {recipe.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-[#e27340]" /> {recipe.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[#e27340]" /> {recipe.serves}
                      </span>
                    </div>
                    <Link to={`/recipes/${recipe.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 w-full bg-gradient-to-r from-[#e27340] to-[#b0390e] text-white py-2 px-4 rounded-lg hover:shadow-md transition-all"
                      >
                        Voir la recette
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-[#b0390e] text-5xl mb-4">🍳</div>
              <h3 className="text-xl font-medium text-[#5a3921] mb-2">Aucune recette trouvée</h3>
              <p className="text-[#7a5c44]">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </div>
   
  );
}