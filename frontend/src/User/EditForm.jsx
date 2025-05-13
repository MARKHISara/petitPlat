import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "./DashboardLayout";
import { motion } from "framer-motion";
import { ChefHat, Clock, Flame, Users, ListChecks, Upload, Save } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    duration: "",
    difficulty: "",
    portions: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        const recipe = res.data;
        setFormData({
          title: recipe.title,
          ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join("\n") : "",
          steps: recipe.steps,
          duration: recipe.duration,
          difficulty: recipe.difficulty,
          portions: recipe.portions,
          category_id: recipe.category?.id ?? "",
        });
        if (recipe.image_url) {
          setPreviewImage(recipe.image_url);
        }
      })
      .catch(() => setError("Erreur lors du chargement de la recette."));

    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setError("Impossible de charger les catégories."));
  }, [id, authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    if (image) {
      data.append("image", image);
    }

    try {
      await axios.post(`http://localhost:8000/api/recipes/${id}?_method=PUT`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/mes-recettes");
    } catch (err) {
      setError(err.response?.data?.message || "Échec de la mise à jour de la recette.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6 border border-[#f0e0d6]"
      >
        <div className="flex items-center mb-6">
          <ChefHat className="text-[#e27340] w-6 h-6 mr-2" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#982b2b] to-[#b0390e] bg-clip-text text-transparent">
            Modifier la recette
          </h2>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#5a3921]">Titre</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nom de votre recette"
              className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-[#5a3921]">
                <Clock className="w-4 h-4 mr-1 text-[#b0390e]" />
                Durée (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-[#5a3921]">
                <Flame className="w-4 h-4 mr-1 text-[#b0390e]" />
                Difficulté
              </label>
              <input
                type="text"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-[#5a3921]">
                <Users className="w-4 h-4 mr-1 text-[#b0390e]" />
                Portions
              </label>
              <input
                type="number"
                name="portions"
                value={formData.portions}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#5a3921]">Catégorie</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-[#5a3921]">
              <ListChecks className="w-4 h-4 mr-1 text-[#b0390e]" />
              Ingrédients
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Un ingrédient par ligne..."
              rows={4}
              className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-[#5a3921]">
              <ListChecks className="w-4 h-4 mr-1 text-[#b0390e]" />
              Étapes de préparation
            </label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder="Décrivez chaque étape..."
              rows={6}
              className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-[#5a3921]">
              <Upload className="w-4 h-4 mr-1 text-[#b0390e]" />
              Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="px-4 py-2 border-2 border-dashed border-[#e27340] rounded-lg hover:bg-[#f9f4f1] transition-colors text-center">
                  <span className="text-[#5a3921]">Changer l'image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Aperçu"
                  className="w-16 h-16 object-cover rounded-lg border border-[#f0e0d6]"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  className="px-6 py-2 border border-[#f0e0d6] text-[#5a3921] rounded-lg hover:bg-[#f9f4f1] transition-colors"
                >
                  Annuler
                </motion.button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl max-w-md w-[90%] border border-[#f0e0d6]">
                  <AlertDialog.Title className="text-lg font-bold text-[#5a3921] mb-4">
                    Confirmer l'annulation
                  </AlertDialog.Title>
                  <AlertDialog.Description className="text-[#7a5c44] mb-6">
                    Voulez-vous vraiment annuler ? Toutes les modifications seront perdues.
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-4">
                    <AlertDialog.Cancel asChild>
                      <button className="px-4 py-2 text-[#5a3921] rounded-lg hover:bg-[#f9f4f1] transition-colors">
                        Non, continuer
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button
                        onClick={() => navigate("/mes-recettes")}
                        className="px-4 py-2 bg-[#982b2b] text-white rounded-lg hover:bg-[#b0390e] transition-colors"
                      >
                        Oui, annuler
                      </button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-[#e27340] to-[#b0390e] text-white rounded-lg hover:shadow-md transition-all disabled:opacity-70 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </DashboardLayout>
  );
};

export default EditForm;