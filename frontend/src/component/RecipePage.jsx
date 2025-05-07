import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RecipePage() {
  const [selectedCategory, setSelectedCategory] = useState("TOUT");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Charger les catégories
    fetch("http://localhost:8000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((cat) => ({
          id: cat.id,
          name: cat.name.toUpperCase(),
        }));
        setCategories([{ id: 0, name: "TOUT" }, ...formatted]);
      });

    // Charger les recettes
    fetch("http://localhost:8000/api/recipes")
    .then((res) => res.json())
    .then((data) => {
      const formatted = data.map((r) => ({
        id: r.id,
        title: r.title,
        desc: r.steps.slice(0, 100) + "...",
        time: r.duration + " min",
        difficulty: r.difficulty,
        serves: r.portions + " PORTIONS",
        category: r.category.name.toUpperCase(),
        image: r.image ? `http://localhost:8000/storage/${r.image}` : '/default.jpg'
      }));
      setRecipes(formatted);
    });
  
  }, []);

  const filteredRecipes =
    selectedCategory === "TOUT"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  return (
    <div className="bg-[#f5f2ec] min-h-screen p-8">
      <div className="text-center mb-8">
        <p className="text-red-600 uppercase font-semibold text-sm">Recettes</p>
        <h1 className="text-3xl font-extrabold mt-2">Partez en Voyage</h1>
        <p className="text-gray-600 mt-2">
          Grâce à notre collection variée de recettes, nous avons de quoi ravir toutes les papilles.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-1 rounded-full border ${
              selectedCategory === cat.name
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-green-100"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe, index) => (
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
            <img src={recipe.image} alt={recipe.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{recipe.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{recipe.desc}</p>
              <p className="text-xs text-gray-500 mt-2">
                {recipe.time} • {recipe.difficulty} • {recipe.serves} 
              </p>
              <Link to={`/recipes/${recipe.id}`}>
               <button className="mt-4 inline-block px-4 py-1 border rounded-full text-sm hover:bg-gray-100">
                 Voir la recette
               </button>
             </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
