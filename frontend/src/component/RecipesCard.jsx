import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Composant pour afficher une recette
const RecipeCard = ({ recipe }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl overflow-hidden shadow-md"
  >
    <img 
      src={`http://localhost:8000/storage/${recipe.image}` || '/default-image.jpg'}
      alt={recipe.title} 
      className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105" 
    />
    <div className="p-4">
      <h3 className="font-bold text-lg">{recipe.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {recipe.ingredients.slice(0, 100) + "..." || 'Aucune description disponible.'}
      </p>
      <p className="text-xs text-gray-500 mt-2">
        {recipe.duration} min • 🔥{recipe.difficulty} • {recipe.portions} personnes
      </p>
      <Link to={`/recipes/${recipe.id}`}>
        <button className="mt-4 inline-block px-4 py-1 border border-orange-500 text-orange-600 rounded-full text-sm hover:bg-orange-50">
          Voir la recette
        </button>
      </Link>
    </div>
  </motion.div>
);

// Bouton de filtre sans icône
const FilterButton = ({ label, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors shadow-sm ${
      isActive ? 'bg-orange-500 text-white border-orange-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
    }`}
  >
    {label}
  </motion.button>
);

const RecipesCard = () => {
  const [filters, setFilters] = useState({ category: null, lifestyle: [], mealTime: null });
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  // Récupérer les données depuis l’API Laravel
  useEffect(() => {
    axios.get('http://localhost:8000/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:8000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#fef8f2]">
      <div className="sticky top-0 bg-white z-10 px-6 mt-1 py-4 shadow-sm">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <FilterButton
              key={cat.id}
              label={cat.name}
              isActive={filters.category === cat.id}
              onClick={() =>
                setFilters(prev => ({
                  ...prev,
                  category: prev.category === cat.id ? null : cat.id
                }))
              }
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <aside className="lg:w-64 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FiZap /> Meal Times
            </h3>
            <div className="space-y-2">
              {['breakfast', 'lunch', 'dinner', 'snacks'].map((mealTime) => (
                <button
                  key={mealTime}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    mealTime: prev.mealTime === mealTime ? null : mealTime
                  }))}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    filters.mealTime === mealTime 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {mealTime}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes
              .filter(r => !filters.category || r.category_id === filters.category)
              .filter(r => !filters.mealTime || r.meal_time === filters.mealTime)
              .map((recipe, i) => (
                <RecipeCard key={i} recipe={recipe} />
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecipesCard;
