import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash2, PlusCircle, ChefHat } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import { motion } from "framer-motion";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const MyRecipes = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!authToken) {
      navigate("/");
      return;
    }

    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/my-recipes", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setRecipes(response.data);
        setError(null);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error);
        setError("Impossible de récupérer les recettes. Essayez plus tard.");
      }
    };

    fetchRecipes();
  }, [authToken, navigate]);

  const handleDelete = async (recipeId) => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:8000/api/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la recette:", error);
      setError("Impossible de supprimer la recette. Essayez plus tard.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-7xl mx-auto"
      >
        <div className="flex items-center mb-8">
          <ChefHat className="text-[#e27340] w-8 h-8 mr-3" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#982b2b] to-[#b0390e] bg-clip-text text-transparent">
            Mes Recettes
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link
              to="/ajouter-recette"
              className="flex items-center gap-2 bg-gradient-to-r from-[#e27340] to-[#b0390e] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Ajouter une recette</span>
            </Link>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-100"
            >
              {error}
            </motion.div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#f0e0d6]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9f4f1]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5a3921]">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5a3921]">
                    Titre
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5a3921]">
                    Ingrédients
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-[#5a3921]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0e0d6]">
                {recipes.map((recipe) => (
                  <motion.tr
                    key={recipe.id}
                    whileHover={{ backgroundColor: "#f9f4f1" }}
                    className="hover:bg-[#f9f4f1] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {recipe.image_url ? (
                        <img
                          src={recipe.image_url}
                          alt={recipe.title}
                          className="w-16 h-16 object-cover rounded-lg border border-[#f0e0d6]"
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-[#f9f4f1] rounded-lg border border-[#f0e0d6] text-[#a78b75]">
                          Pas d'image
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#5a3921]">
                      {recipe.title}
                    </td>
                    <td className="px-6 py-4 text-[#7a5c44]">
                      {Array.isArray(recipe.ingredients)
                        ? recipe.ingredients.slice(0, 3).join(", ") + 
                          (recipe.ingredients.length > 3 ? "..." : "")
                        : "Ingrédients non disponibles"}
                    </td>
                    <td className="px-6 py-4 flex justify-center space-x-3">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Link
                          to={`/modifier-recette/${recipe.id}`}
                          className="p-2 text-[#e27340] hover:text-[#b0390e] rounded-full hover:bg-[#f9f4f1]"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                      </motion.div>

                      <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-[#982b2b] hover:text-[#b0390e] rounded-full hover:bg-[#f9f4f1]"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                          <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl max-w-md w-[90%] border border-[#f0e0d6]">
                            <AlertDialog.Title className="text-lg font-bold text-[#5a3921] mb-4">
                              Confirmer la suppression
                            </AlertDialog.Title>
                            <AlertDialog.Description className="text-[#7a5c44] mb-6">
                              Êtes-vous sûr de vouloir supprimer la recette "{recipe.title}" ? Cette action est irréversible.
                            </AlertDialog.Description>
                            <div className="flex justify-end gap-4">
                              <AlertDialog.Cancel asChild>
                                <button className="px-4 py-2 text-[#5a3921] rounded-lg hover:bg-[#f9f4f1] transition-colors">
                                  Annuler
                                </button>
                              </AlertDialog.Cancel>
                              <AlertDialog.Action asChild>
                                <button
                                  onClick={() => handleDelete(recipe.id)}
                                  disabled={isDeleting}
                                  className="px-4 py-2 bg-[#982b2b] text-white rounded-lg hover:bg-[#b0390e] transition-colors disabled:opacity-70"
                                >
                                  {isDeleting ? "Suppression..." : "Confirmer"}
                                </button>
                              </AlertDialog.Action>
                            </div>
                          </AlertDialog.Content>
                        </AlertDialog.Portal>
                      </AlertDialog.Root>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {recipes.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-[#b0390e] text-5xl mb-4">🍳</div>
              <h3 className="text-xl font-medium text-[#5a3921] mb-2">
                Aucune recette trouvée
              </h3>
              <p className="text-[#7a5c44]">
                Commencez par ajouter votre première recette
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default MyRecipes;