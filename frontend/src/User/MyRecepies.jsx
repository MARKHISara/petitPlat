import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import DashboardLayout from "./DashboardLayout"; // <- nouveau layout

const MyRecepies = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authToken) {
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:8000/api/my-recipes", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setRecipes(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des recettes:", error);
        setError("Impossible de récupérer les recettes. Essayez plus tard.");
      });
  }, [authToken, navigate]);

  const handleDeleteClick = (recipeId) => {
    axios
      .delete(`http://localhost:8000/api/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la recette:", error);
        setError("Impossible de supprimer la recette. Essayez plus tard.");
      });
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes Recettes</h1>

      <Link
        to="/ajouter-recette"
        className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 mb-6"
      >
        Ajouter une recette
      </Link>

      {error && <p className="text-red-600 text-lg mb-4">{error}</p>}

      <div className="overflow-x-auto shadow-lg sm:rounded-lg bg-white">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Titre</th>
              <th className="px-6 py-3">Ingrédients</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  {recipe.image_url ? (
                    <img
                      src={recipe.image_url}
                      alt={recipe.title}
                      className="w-20 h-20 object-cover rounded-lg shadow-md"
                    />
                  ) : (
                    <span className="text-gray-400 italic">Pas d’image</span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {recipe.title}
                </td>
                <td className="px-6 py-4">
                  {Array.isArray(recipe.ingredients)
                    ? recipe.ingredients.join(", ")
                    : "Ingrédients non disponibles"}
                </td>
                <td className="px-6 py-4 text-center flex justify-center space-x-4">
                  <Link
                    to={`/modifier-recette/${recipe.id}`}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <FaEdit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(recipe.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default MyRecepies;
