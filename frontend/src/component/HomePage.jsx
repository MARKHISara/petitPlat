import React from "react";
import Header from "./Header";
import Categories from "./Categories";
import RecipePage from "./RecipePage";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="bg-[#e6f4ff] min-h-screen font-sans">
     

      {/* Section Héros */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1546069901-eacef0df6022"
          alt="Cuisine"
          className="w-full h-[400px] object-cover rounded-b-xl"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LIBÉREZ L'EXCELLENCE CULINAIRE</h1>
          <p className="text-lg max-w-xl mb-6">
            Explorez un monde de saveurs, découvrez des recettes artisanales et ressentez l'arôme de notre passion qui s'élève de votre cuisine.
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
            Explorer les Recettes
          </button>
        </div>
      </section>

      <Categories />
      <RecipePage/>
     
    </div>
  );
};

export default HomePage;
