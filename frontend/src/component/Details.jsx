import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white m-6 rounded-lg shadow-lg overflow-hidden">
      {/* Badge Catégorie */}
      <div className="text-center pt-6">
        <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
          {recipe.category?.name?.toUpperCase()}
        </span>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-center mt-2 text-gray-800">
        {recipe.title}
      </h1>

      {/* Description */}
      <p className="text-center text-sm text-gray-600 mt-2 px-4">
        {recipe.description}
      </p>

      {/* Infos recette */}
      <div className="flex justify-center items-center space-x-6 mt-4 text-gray-600 text-sm">
        <span>🕐 {recipe.duration} minutes</span>
        <span>🔥 {recipe.difficulty}</span>
        <span>👨‍👩‍👧‍👦 {recipe.portions} portions</span>
      </div>

      {/* Image */}
      <div className="mt-6">
        <img
          src={recipe.image_url || "/default.jpg"}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Ingrédients */}
      <div className="mt-6 px-6 pb-6">
        <h2 className="text-red-600 font-semibold text-sm uppercase mb-2">Ingrédients</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          {Array.isArray(recipe.ingredients) ? (
            recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)
          ) : (
            <li>{recipe.ingredients}</li> // fallback
          )}
        </ul>
      </div>

      {/* Étapes de préparation */}
      {recipe.steps && (
        <div className="mt-2 px-6 pb-6">
          <h2 className="text-red-600 font-semibold text-sm uppercase mb-2">Préparation</h2>
          <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
            {recipe.steps.split(/\r?\n/).map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

    </div>
  );
}
