import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "./DashboardLayout";
import { motion } from "framer-motion";
import { Upload, ChefHat, Clock3, Flame, Users, ListChecks } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const RecipeForm = () => {
  const { authToken } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    duration: "",
    difficulty: "",
    portions: "",
    category_id: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur de chargement des catégories :", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      await axios.post("http://localhost:8000/api/recipes", data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Recette ajoutée avec succès !");
      setError(null);

      // Réinitialiser le formulaire
      setFormData({
        title: "",
        ingredients: "",
        steps: "",
        duration: "",
        difficulty: "",
        portions: "",
        category_id: "",
        image: null,
      });
      setPreviewImage(null);
    } catch (err) {
      console.error("Erreur d'ajout :", err);
      setError(err.response?.data?.message || "Erreur lors de l'ajout de la recette.");
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      ingredients: "",
      steps: "",
      duration: "",
      difficulty: "",
      portions: "",
      category_id: "",
      image: null,
    });
    setPreviewImage(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto my-8 border border-[#f0e0d6]"
      >
        <div className="flex items-center justify-center mb-6">
          <ChefHat className="text-[#e27340] w-8 h-8 mr-2" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#982b2b] to-[#b0390e] bg-clip-text text-transparent">
            Ajouter une recette
          </h2>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg border border-green-100"
          >
            {success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Titre */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#5a3921]">Titre</label>
              <input
                type="text"
                name="title"
                placeholder="Nom de votre recette"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
              />
            </div>

            {/* Catégorie */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#5a3921]">Catégorie</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
              >
                <option value="">Choisir une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ingrédients */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-[#5a3921]">
              <ListChecks className="w-4 h-4 mr-1 text-[#b0390e]" />
              Ingrédients
            </label>
            <textarea
              name="ingredients"
              placeholder="Un ingrédient par ligne..."
              value={formData.ingredients}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent min-h-[100px]"
            />
          </div>

          {/* Étapes */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-[#5a3921]">
              <ListChecks className="w-4 h-4 mr-1 text-[#b0390e]" />
              Étapes de préparation
            </label>
            <textarea
              name="steps"
              placeholder="Décrivez chaque étape..."
              value={formData.steps}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Durée */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-[#5a3921]">
                <Clock3 className="w-4 h-4 mr-1 text-[#b0390e]" />
                Durée (min)
              </label>
              <input
                type="number"
                name="duration"
                placeholder="30"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
              />
            </div>

            {/* Difficulté */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-[#5a3921]">
                <Flame className="w-4 h-4 mr-1 text-[#b0390e]" />
                Difficulté
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
              >
                <option value="">Choisir</option>
                <option value="Facile">Facile</option>
                <option value="Moyen">Moyen</option>
                <option value="Difficile">Difficile</option>
              </select>
            </div>

            {/* Portions */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-[#5a3921]">
                <Users className="w-4 h-4 mr-1 text-[#b0390e]" />
                Portions
              </label>
              <input
                type="number"
                name="portions"
                placeholder="4"
                value={formData.portions}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-[#5a3921]">
              <Upload className="w-4 h-4 mr-1 text-[#b0390e]" />
              Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="px-4 py-2 border-2 border-dashed border-[#e27340] rounded-lg hover:bg-[#f9f4f1] transition-colors text-center">
                  <span className="text-[#5a3921]">Choisir une image</span>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
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
                <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl max-w-md w-[90%] border border-[#f0e0d6]">
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
                        onClick={resetForm}
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
              className="px-6 py-2 bg-gradient-to-r from-[#e27340] to-[#b0390e] text-white rounded-lg hover:shadow-md transition-all disabled:opacity-70"
            >
              {isSubmitting ? "Envoi en cours..." : "Ajouter la recette"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </DashboardLayout>
  );
};

export default RecipeForm;