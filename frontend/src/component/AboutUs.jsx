import React from 'react';

const AboutUs = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-[#f9fafb] to-[#f0fdf4] text-gray-800">
      {/* Hero Section */}
<section className="relative text-center py-16 md:py-24 overflow-hidden" style={{ backgroundImage: 'url("./bg2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="absolute inset-0 bg-[#f0fdf4] opacity-20 z-0"></div>
  <div className="relative z-10 max-w-4xl mx-auto px-4">
    <div className="relative ">
      <h1 className="text-4xl md:text-5xl font-bold text-[#982b2b] mb-6">À propos de Nous</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Découvrez une communauté passionnée de cuisine où partager, apprendre et s'inspirer
      </p>
    </div>
  </div>
</section>


      {/* Notre Mission */}
      <section className="grid md:grid-cols-2 gap-8 items-center px-6 md:px-16 lg:px-24 py-16 bg-white">
        {/* Image */}
        <div className="order-2 md:order-1">
          <img
            src="./about.jpg"
            alt="Personnes cuisinant ensemble"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Text */}
        <div className="order-1 md:order-2">
          <div className="bg-white p-6 md:p-8 rounded-xl">
            <span className="text-[#982b2b] font-semibold">Notre Mission</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Créer des liens à travers la cuisine</h2>
            <p className="mb-4 text-gray-600">
              Notre plateforme a été créée pour rassembler les passionnés de cuisine du monde entier. 
              Que vous soyez un chef expérimenté ou un amateur enthousiaste, vous trouverez ici une communauté 
              accueillante pour partager vos recettes et vos astuces culinaires.
            </p>
            <p className="text-gray-600">
              Nous croyons que la cuisine est bien plus qu'une simple activité - c'est une façon de créer 
              des souvenirs, de préserver des traditions et de tisser des liens.
            </p>
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-16 bg-[#f9f4f1]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">Ce que nous offrons</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-[#982b2b] text-3xl mb-4">
                <i className="fas fa-book-open"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Bibliothèque de recettes</h3>
              <p className="text-gray-600">
                Accédez à des milliers de recettes partagées par notre communauté, 
                avec des filtres pour trouver exactement ce que vous cherchez.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-[#982b2b] text-3xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Communauté bienveillante</h3>
              <p className="text-gray-600">
                Interagissez avec d'autres passionnés, posez des questions, 
                partagez vos adaptations de recettes et recevez des feedbacks.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-[#982b2b] text-3xl mb-4">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Contenu de qualité</h3>
              <p className="text-gray-600">
                Nos recettes sont vérifiées et notées par la communauté, 
                pour vous garantir des résultats délicieux à chaque fois.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}

    </div>
  );
};

export default AboutUs;