import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Flame, Users, ChevronRight, Heart, Share2, Bookmark } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Tooltip } from "react-tooltip";

export default function Details() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Simuler plusieurs images pour le carrousel
  const images = [
    recipe.image_url || "/default.jpg",

  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-gradient-to-br from-white to-orange-50 my-8 rounded-2xl shadow-xl overflow-hidden border border-orange-100"
    >
      {/* Header avec image et actions */}
      <div className="relative">
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={5000}
          className="rounded-t-2xl"
        >
          {images.map((img, index) => (
            <div key={index} className="h-96">
              <img
                src={img}
                alt={`${recipe.title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>

        {/* Actions flottantes */}
        <div className="absolute top-4 right-4 flex flex-col space-y-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-50 transition-colors"
            data-tooltip-id="favorite-tooltip"
            data-tooltip-content={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-orange-500 text-orange-500" : "text-gray-600"}`}
            />
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-50 transition-colors"
            data-tooltip-id="save-tooltip"
            data-tooltip-content={isSaved ? "Retirer de ma liste" : "Sauvegarder"}
          >
            <Bookmark
              className={`w-5 h-5 ${isSaved ? "fill-orange-500 text-orange-500" : "text-gray-600"}`}
            />
          </button>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-50 transition-colors"
            data-tooltip-id="share-tooltip"
            data-tooltip-content="Partager"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <Tooltip id="favorite-tooltip" />
        <Tooltip id="save-tooltip" />
        <Tooltip id="share-tooltip" />
      </div>

      {/* Contenu principal */}
      <div className="px-8 py-6">
        {/* Catégorie et titre */}
        <div className="flex justify-between items-start">
          <div>
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-3"
            >
              {recipe.category?.name?.toUpperCase() || "RECETTE"}
            </motion.span>
            <h1 className="text-3xl font-bold text-gray-800 font-serif">{recipe.title}</h1>
          </div>
          <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400 mr-1" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-3 leading-relaxed">{recipe.description}</p>

        {/* Métadonnées */}
        <div className="grid grid-cols-3 gap-4 mt-6 bg-orange-50 p-4 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="flex items-center text-orange-600 mb-1">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">Temps</span>
            </div>
            <span className="text-gray-700">{recipe.duration} min</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center text-orange-600 mb-1">
              <Flame className="w-5 h-5 mr-2" />
              <span className="font-medium">Difficulté</span>
            </div>
            <span className="text-gray-700 capitalize">{recipe.difficulty}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center text-orange-600 mb-1">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-medium">Portions</span>
            </div>
            <span className="text-gray-700">{recipe.portions}</span>
          </div>
        </div>

        {/* Ingrédients */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <ChevronRight className="w-5 h-5 text-orange-500 mr-2" />
            Ingrédients
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.isArray(recipe.ingredients) ? (
              recipe.ingredients.map((ing, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  className="flex items-center bg-white p-3 rounded-lg shadow-sm border-l-4 border-orange-300"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  {ing}
                </motion.li>
              ))
            ) : (
              <motion.li className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-orange-300">
                {recipe.ingredients}
              </motion.li>
            )}
          </ul>
        </motion.div>

        {/* Étapes de préparation */}
        {recipe.steps && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <ChevronRight className="w-5 h-5 text-orange-500 mr-2" />
              Préparation
            </h2>
            <ol className="space-y-4">
              {recipe.steps.split(/\r?\n/).map((step, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  className="flex bg-white p-4 rounded-lg shadow-sm"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mr-3 font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-700">{step}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        )}

        {/* Notes optionnelles */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-orange-50 p-4 rounded-xl"
        >
          <h3 className="font-bold text-orange-600 mb-2">Astuces du chef</h3>
          <p className="text-gray-700">
            Pour une version encore plus savoureuse, essayez d'ajouter une pincée de cannelle ou
            de noix de muscade selon vos préférences.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}