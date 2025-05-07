import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "./DashboardLayout";

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
  const [error, setError] = useState(null);

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
          ingredients: recipe.ingredients.join("\n"),
          steps: recipe.steps,
          duration: recipe.duration,
          difficulty: recipe.difficulty,
          portions: recipe.portions,
          category_id: recipe.category?.id ?? "",
        });
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
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    if (image) {
      data.append("image", image);
    }

    axios
      .post(`http://localhost:8000/api/recipes/${id}?_method=PUT`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => navigate("/mes-recettes"))
      .catch(() => setError("Échec de la mise à jour de la recette."));
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Modifier la recette</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titre"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Ingrédients (un par ligne)"
            rows={4}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            placeholder="Étapes"
            rows={4}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Durée (en minutes)"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            placeholder="Difficulté"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            name="portions"
            value={formData.portions}
            onChange={handleChange}
            placeholder="Portions"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditForm;
