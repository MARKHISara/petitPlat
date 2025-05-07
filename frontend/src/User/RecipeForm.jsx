import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "./DashboardLayout";
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
      setError("Erreur lors de l'ajout de la recette.");
      setSuccess(null);
    }
  };

  return (
    <DashboardLayout>
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Ajouter une recette</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          name="ingredients"
          placeholder="Ingrédients (un par ligne)"
          value={formData.ingredients}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          name="steps"
          placeholder="Étapes"
          value={formData.steps}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="duration"
          placeholder="Durée (min)"
          value={formData.duration}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="difficulty"
          placeholder="Difficulté"
          value={formData.difficulty}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="portions"
          placeholder="Portions"
          value={formData.portions}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Choisir une catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />

        {previewImage && (
          <img
            src={previewImage}
            alt="Aperçu"
            className="max-w-xs max-h-40 object-cover rounded-lg mt-2"
          />
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4"
        >
          Ajouter
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
};

export default RecipeForm;
